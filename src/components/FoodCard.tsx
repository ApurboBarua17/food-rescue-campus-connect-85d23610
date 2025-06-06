import { Clock, MapPin, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface FoodItem {
  id: string;
  title: string;
  description: string;
  quantity: string;
  location: string;
  timeLeft: string;
  dietaryInfo: string[];
  cafeteria: string;
  distance: string;
  claimed: boolean;
}

interface FoodCardProps {
  food: FoodItem;
  onClaim: (id: string) => void;
  userRole: 'student' | 'cafeteria';
}

const FoodCard = ({ food, onClaim, userRole }: FoodCardProps) => {
  const getDietaryBadgeColor = (dietary: string) => {
    switch (dietary.toLowerCase()) {
      case 'vegetarian':
        return 'bg-sustainable-100 text-sustainable-700';
      case 'vegan':
        return 'bg-sustainable-200 text-sustainable-800';
      case 'gluten-free':
        return 'bg-earth-100 text-earth-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{food.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{food.description}</p>
            <p className="text-gray-800 font-medium">{food.cafeteria}</p>
          </div>
          {food.claimed && (
            <Badge className="bg-sustainable-100 text-sustainable-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Claimed
            </Badge>
          )}
        </div>

        {/* Dietary Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {food.dietaryInfo.map((dietary, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={getDietaryBadgeColor(dietary)}
            >
              {dietary}
            </Badge>
          ))}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span>{food.quantity}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{food.timeLeft}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{food.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="text-gray-400">📍</span>
            <span className="ml-2">{food.distance}</span>
          </div>
        </div>

        {/* Action Button */}
        {userRole === 'student' && !food.claimed && (
          <Button 
            onClick={() => onClaim(food.id)}
            className="w-full bg-sustainable-500 hover:bg-sustainable-600 text-white"
          >
            Claim Food
          </Button>
        )}
        
        {userRole === 'student' && food.claimed && (
          <Button variant="outline" disabled className="w-full">
            Already Claimed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodCard;