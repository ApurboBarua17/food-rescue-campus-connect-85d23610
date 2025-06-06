import { useState } from "react";
import { Utensils, Users, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import FoodCard from "@/components/FoodCard";
import AddFoodModal from "@/components/AddFoodModal";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<'student' | 'cafeteria'>('student');
  const [showAddModal, setShowAddModal] = useState(false);
  const [foodItems, setFoodItems] = useState([
    {
      id: '1',
      title: 'Fresh Garden Salads',
      description: 'Mixed greens with seasonal vegetables and dressing options',
      quantity: '12 servings',
      location: 'Main Counter',
      timeLeft: '2 hours',
      dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      cafeteria: 'Student Union Cafeteria',
      distance: '0.2 miles',
      claimed: false
    },
    {
      id: '2',
      title: 'Chicken Wraps',
      description: 'Grilled chicken with fresh vegetables in whole wheat wraps',
      quantity: '8 servings',
      location: 'Grab & Go Station',
      timeLeft: '1.5 hours',
      dietaryInfo: ['Dairy-Free'],
      cafeteria: 'Engineering Building Café',
      distance: '0.4 miles',
      claimed: false
    },
    {
      id: '3',
      title: 'Veggie Pizza Slices',
      description: 'Fresh pizza with bell peppers, mushrooms, and olives',
      quantity: '15 slices',
      location: 'Pizza Station',
      timeLeft: '3 hours',
      dietaryInfo: ['Vegetarian'],
      cafeteria: 'Library Food Court',
      distance: '0.1 miles',
      claimed: true
    },
    {
      id: '4',
      title: 'Fresh Fruit Bowls',
      description: 'Seasonal fruit mix with yogurt on the side',
      quantity: '10 bowls',
      location: 'Healthy Corner',
      timeLeft: '4 hours',
      dietaryInfo: ['Vegetarian', 'Gluten-Free'],
      cafeteria: 'Student Union Cafeteria',
      distance: '0.2 miles',
      claimed: false
    }
  ]);

  const handleClaimFood = (id: string) => {
    setFoodItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, claimed: true } : item
      )
    );
    toast({
      title: "Food Claimed Successfully!",
      description: "Check your email for pickup details.",
    });
  };

  const handleAddFood = (newFood: any) => {
    setFoodItems(prev => [newFood, ...prev]);
    toast({
      title: "Food Added Successfully!",
      description: "Students can now see your available food.",
    });
  };

  const stats = [
    {
      title: "Available Today",
      value: foodItems.filter(item => !item.claimed).length,
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
          {foodItems.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onClaim={handleClaimFood}
              userRole={userRole}
            />
          ))}
        </div>

        {/* Empty State */}
        {foodItems.length === 0 && (
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
