
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { ContentIdeaCard } from "@/components/ContentIdeaCard";
import { ContentIdea } from "@/types";
import { PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This is temporary mock data until Supabase is connected
const MOCK_IDEAS: ContentIdea[] = [
  {
    id: "1",
    title: "Instagram Reel about UI Design",
    type: "short-form",
    creativeStatus: "ideation",
    productionStage: "not started",
    referenceLinks: ["https://instagram.com/design"],
    deploymentLinks: [],
    shootFileLinks: [],
    editFileLinks: [],
    script: "# Instagram Reel: UI Design Tips\n\n## Intro\n- Start with showing a before/after of a UI redesign\n- \"Want to level up your UI design skills? Let's go!\"\n\n## Tips\n1. Use consistent spacing\n2. Limit your color palette\n3. Pay attention to alignment",
    createdAt: "2023-04-01T12:00:00Z",
    updatedAt: "2023-04-01T14:30:00Z",
  },
  {
    id: "2",
    title: "YouTube Tutorial: Building a Portfolio Website",
    type: "long-form",
    creativeStatus: "scripting",
    productionStage: "not started",
    referenceLinks: ["https://youtube.com/webdev"],
    deploymentLinks: [],
    shootFileLinks: [],
    editFileLinks: [],
    script: "# Building a Portfolio Website Tutorial\n\n## Introduction\n- Welcome viewers\n- Explain the importance of a portfolio\n\n## Planning Phase\n- Discuss content organization\n- Wireframes and mockups",
    createdAt: "2023-04-02T10:00:00Z",
    updatedAt: "2023-04-03T09:15:00Z",
  },
  {
    id: "3",
    title: "TikTok: 10 VS Code Shortcuts",
    type: "short-form",
    creativeStatus: "editing",
    productionStage: "shoot done",
    referenceLinks: ["https://code.visualstudio.com/docs/getstarted/tips-and-tricks"],
    deploymentLinks: [],
    shootFileLinks: ["https://drive.google.com/file/shortcuts-raw"],
    editFileLinks: [],
    script: "# 10 VS Code Shortcuts Every Developer Should Know\n\n1. **Ctrl+P** - Quick Open\n2. **Alt+Up/Down** - Move line up/down\n3. **Ctrl+/** - Toggle comment",
    createdAt: "2023-03-28T15:20:00Z",
    updatedAt: "2023-04-05T11:45:00Z",
  },
];

export default function Dashboard() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulating data fetch from Supabase
    const fetchIdeas = async () => {
      try {
        // This would be replaced with actual Supabase client call
        // const { data, error } = await supabaseClient.from("ideas").select("*");
        setTimeout(() => {
          setIdeas(MOCK_IDEAS);
          setLoading(false);
        }, 800);
      } catch (error) {
        toast({
          title: "Error fetching ideas",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Content Ideas</h2>
          <Button 
            onClick={() => navigate('/new')}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Idea</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <ContentIdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content ideas yet</h3>
            <p className="text-gray-500 mb-6">Create your first content idea to get started</p>
            <Button 
              onClick={() => navigate('/new')}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Idea</span>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
