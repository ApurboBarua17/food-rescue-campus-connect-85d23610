import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Users, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import FoodCard from "@/components/FoodCard";
import AddFoodModal from "@/components/AddFoodModal";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const { toast } = useToast();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'student' | 'cafeteria'>('student');
  const [showAddModal, setShowAddModal] = useState(false);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(0);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Fetch food items from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchFoodItems = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('food_items')
          .select(`
            *,
            profiles:created_by (
              full_name
            )
          `)
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFoodItems(data || []);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [user, realTimeUpdates]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('food_items_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'food_items'
        },
        () => {
          setRealTimeUpdates(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Set user role based on profile
  useEffect(() => {
    if (profile?.role === 'cafeteria_staff') {
      setUserRole('cafeteria');
    } else {
      setUserRole('student');
    }
  }, [profile]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-sustainable-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">🍃</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleClaimFood = async (id: string) => {
    try {
      // Update in database
      const { error } = await (supabase as any)
        .from('orders')
        .insert({
          food_item_id: id,
          student_id: profile?.id,
          pickup_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
          status: 'pending'
        });

      if (error) throw error;

      // Update food item status
      await (supabase as any)
        .from('food_items')
        .update({ status: 'claimed' })
        .eq('id', id);

      toast({
        title: "Food Claimed Successfully!",
        description: "Check your email for pickup details.",
      });
    } catch (error) {
      console.error('Error claiming food:', error);
      toast({
        title: "Error",
        description: "Failed to claim food. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddFood = async (newFood: any) => {
    try {
      const { error } = await (supabase as any)
        .from('food_items')
        .insert({
          title: newFood.title,
          description: newFood.description,
          quantity: parseInt(newFood.quantity.split(' ')[0]) || 1,
          location: newFood.location,
          dietary_restrictions: newFood.dietaryInfo,
          expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
          created_by: profile?.id,
          status: 'available'
        });

      if (error) throw error;

      toast({
        title: "Food Added Successfully!",
        description: "Students can now see your available food.",
      });
    } catch (error) {
      console.error('Error adding food:', error);
      toast({
        title: "Error",
        description: "Failed to add food. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Transform Supabase data to match component interface
  const displayFoodItems = foodItems.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description || '',
    quantity: `${item.quantity} servings`,
    location: item.location || 'Campus',
    timeLeft: item.expires_at ? 
      Math.max(0, Math.floor((new Date(item.expires_at).getTime() - Date.now()) / (1000 * 60 * 60))) + ' hours' : 
      '2 hours',
    dietaryInfo: item.dietary_restrictions || [],
    cafeteria: item.profiles?.full_name || 'Campus Cafeteria',
    distance: '0.2 miles',
    claimed: item.status === 'claimed'
  }));

  const stats = [
    {
      title: "Available Today",
      value: displayFoodItems.filter(item => !item.claimed).length,
      icon: <Utensils className="w-6 h-6" />,
      trend: "+3 from yesterday"
    },
    {
      title: "Students Helped",
      value: "247",
      icon: <Users className="w-6 h-6" />,
      trend: "+12 this week"
    },
    {
      title: "Food Saved",
      value: "892 lbs",
      icon: <TrendingUp className="w-6 h-6" />,
      trend: "This semester"
    },
    {
      title: "Response Time",
      value: "< 30 min",
      icon: <Clock className="w-6 h-6" />,
      trend: "Average pickup"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userRole={userRole} 
        onRoleChange={setUserRole}
        onAddFood={() => setShowAddModal(true)}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {userRole === 'student' ? 'Find Free Food on Campus' : 'Share Your Extra Food'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {userRole === 'student' 
              ? 'Discover fresh, free food from campus cafeterias and help reduce waste.'
              : 'Post leftover food to help students and reduce waste on campus.'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Content Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">
            {userRole === 'student' ? 'Available Food' : 'Your Posted Food'}
          </h2>
          {userRole === 'cafeteria' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto bg-sustainable-500 hover:bg-sustainable-600 text-white px-6 py-2 rounded-lg flex items-center justify-center sm:hidden"
            >
              <span className="text-lg mr-2">+</span>
              Add Food
            </button>
          )}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayFoodItems.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onClaim={handleClaimFood}
              userRole={userRole}
            />
          ))}
        </div>

        {/* Empty State */}
        {displayFoodItems.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No food available</h3>
            <p className="text-gray-600">
              {userRole === 'student' 
                ? 'Check back later for new food posts.'
                : 'Start by adding your first food item.'
              }
            </p>
          </div>
        )}
      </main>

      <AddFoodModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddFood}
      />
    </div>
  );
};

export default Index;
