import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (food: any) => void;
}

const AddFoodModal = ({ isOpen, onClose, onSubmit }: AddFoodModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    location: '',
    timeLeft: '',
    dietaryInfo: [] as string[]
  });

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        dietaryInfo: [...prev.dietaryInfo, dietary]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dietaryInfo: prev.dietaryInfo.filter(item => item !== dietary)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      cafeteria: 'Student Union Cafeteria',
      distance: '0.2 miles',
      claimed: false
    });
    setFormData({
      title: '',
      description: '',
      quantity: '',
      location: '',
      timeLeft: '',
      dietaryInfo: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Add Available Food</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Food Item</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Fresh Sandwiches"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the food"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="quantity">Quantity Available</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="e.g., 15 servings"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Pickup Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Main Counter"
                required
              />
            </div>

            <div>
              <Label htmlFor="timeLeft">Available Until</Label>
              <Input
                id="timeLeft"
                value={formData.timeLeft}
                onChange={(e) => setFormData(prev => ({ ...prev, timeLeft: e.target.value }))}
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            <div>
              <Label className="text-base font-medium">Dietary Information</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {dietaryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.dietaryInfo.includes(option)}
                      onCheckedChange={(checked) => handleDietaryChange(option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="text-sm">{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-sustainable-500 hover:bg-sustainable-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Food
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFoodModal;