
import { CreativeStatus, ProductionStage } from "@/types";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: CreativeStatus | ProductionStage;
  type: "creative" | "production";
}

export function ContentStatusBadge({ status, type }: StatusBadgeProps) {
  const getStatusColor = () => {
    // Creative status colors
    if (type === "creative") {
      switch (status) {
        case "ideation":
          return "bg-gray-200 text-gray-800";
        case "scripting":
          return "bg-gray-300 text-gray-800";
        case "editing":
          return "bg-gray-400 text-gray-800";
        case "published":
          return "bg-gray-700 text-white";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    
    // Production stage colors
    else {
      switch (status) {
        case "not started":
          return "bg-gray-200 text-gray-800";
        case "shoot pending":
          return "bg-gray-300 text-gray-800";
        case "shoot done":
          return "bg-gray-400 text-gray-800";
        case "editing":
          return "bg-gray-500 text-gray-100";
        case "posted":
          return "bg-gray-700 text-white";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  return (
    <Badge className={`${getStatusColor()} font-normal`} variant="outline">
      {status}
    </Badge>
  );
}
