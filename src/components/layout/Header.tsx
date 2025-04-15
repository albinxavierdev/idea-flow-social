
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Socialgram</h1>
          <p className="text-sm text-gray-500">Content Ideation & Production</p>
        </div>
        <Button 
          onClick={() => navigate('/new')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Idea</span>
        </Button>
      </div>
    </header>
  );
}
