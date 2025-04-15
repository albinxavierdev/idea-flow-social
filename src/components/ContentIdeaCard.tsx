
import { ContentIdea } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContentStatusBadge } from "@/components/ContentStatusBadge";
import { useNavigate } from "react-router-dom";

interface ContentIdeaCardProps {
  idea: ContentIdea;
}

export function ContentIdeaCard({ idea }: ContentIdeaCardProps) {
  const navigate = useNavigate();
  const formattedDate = new Date(idea.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  return (
    <Card 
      className="h-full cursor-pointer hover:border-gray-400 transition-all"
      onClick={() => navigate(`/edit/${idea.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{idea.title}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <ContentStatusBadge status={idea.creativeStatus} type="creative" />
          <ContentStatusBadge status={idea.productionStage} type="production" />
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {idea.type}
          </span>
        </div>
        {idea.script && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">
            {idea.script.substring(0, 100)}...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
