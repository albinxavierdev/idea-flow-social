
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface LinkListProps {
  title: string;
  links: string[];
  onChange: (links: string[]) => void;
}

export function LinkList({ title, links, onChange }: LinkListProps) {
  const [newLink, setNewLink] = useState("");

  const handleAddLink = () => {
    if (newLink.trim()) {
      const updatedLinks = [...links, newLink.trim()];
      onChange(updatedLinks);
      setNewLink("");
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    const updatedLinks = links.filter((_, index) => index !== indexToRemove);
    onChange(updatedLinks);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input 
              value={link} 
              readOnly 
              className="flex-1 bg-gray-50"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleRemoveLink(index)}
            >
              <Trash2 className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add new link..."
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="flex-1"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleAddLink}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
