import { MapPin, User, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userRole: 'student' | 'cafeteria';
  onRoleChange: (role: 'student' | 'cafeteria') => void;
  onAddFood: () => void;
}

const Header = ({ userRole, onRoleChange, onAddFood }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sustainable-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍃</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">FoodShare</h1>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Campus Center</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Role Toggle */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onRoleChange('student')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  userRole === 'student'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => onRoleChange('cafeteria')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  userRole === 'cafeteria'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cafeteria
              </button>
            </div>

            {/* Add Food Button (Cafeteria only) */}
            {userRole === 'cafeteria' && (
              <Button 
                onClick={onAddFood}
                className="bg-sustainable-500 hover:bg-sustainable-600 text-white hidden sm:flex"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Food
              </Button>
            )}

            {/* Profile */}
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;