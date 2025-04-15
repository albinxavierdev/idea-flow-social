
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentIdea, ContentType, CreativeStatus, ProductionStage } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { LinkList } from "@/components/LinkList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data - would be replaced with Supabase data
const MOCK_IDEAS: Record<string, ContentIdea> = {
  "1": {
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
  "2": {
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
  "3": {
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
};

export default function EditIdea() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [idea, setIdea] = useState<ContentIdea | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("script");
  
  // Fetch the idea data
  useEffect(() => {
    if (!id) return;

    const fetchIdea = async () => {
      try {
        // This would be replaced with actual Supabase client call
        // const { data, error } = await supabaseClient.from("ideas").select("*").eq("id", id).single();
        
        // Simulating API call with mock data
        await new Promise(resolve => setTimeout(resolve, 400));
        
        if (MOCK_IDEAS[id]) {
          setIdea(MOCK_IDEAS[id]);
        } else {
          toast({
            title: "Idea not found",
            description: "The content idea you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        toast({
          title: "Error fetching idea",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id, navigate, toast]);

  // Update the idea
  const handleUpdate = async (updates: Partial<ContentIdea>) => {
    if (!idea) return;

    setSaving(true);

    try {
      // Create updated idea object with new timestamp
      const updatedIdea = {
        ...idea,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      // This would be replaced with actual Supabase client call
      // const { data, error } = await supabaseClient.from("ideas").update(updatedIdea).eq("id", id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setIdea(updatedIdea);
      
      toast({
        title: "Changes saved",
        description: "Your content idea has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle auto-save for script
  const handleScriptChange = (newScript: string) => {
    handleUpdate({ script: newScript });
  };

  // Handle title change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdea(prev => prev ? { ...prev, title: event.target.value } : null);
  };
  
  // Save title when input loses focus
  const handleTitleBlur = () => {
    if (!idea) return;
    handleUpdate({ title: idea.title });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this content idea?")) return;

    try {
      // This would be replaced with actual Supabase client call
      // const { data, error } = await supabaseClient.from("ideas").delete().eq("id", id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      
      toast({
        title: "Idea deleted",
        description: "Your content idea has been deleted.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error deleting idea",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Idea not found</h2>
          <p className="text-gray-500 mb-6">This content idea doesn't exist or has been deleted.</p>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-gray-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleDelete}
              className="flex items-center gap-1 text-gray-600"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Input
            value={idea.title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="text-2xl font-bold border-none bg-transparent focus:ring-0 px-0 text-gray-900"
          />
          <div className="flex gap-4 mt-2">
            <Select
              value={idea.type}
              onValueChange={(value: ContentType) => handleUpdate({ type: value })}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short-form">Short-form</SelectItem>
                <SelectItem value="long-form">Long-form</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={idea.creativeStatus}
              onValueChange={(value: CreativeStatus) => handleUpdate({ creativeStatus: value })}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Creative Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ideation">Ideation</SelectItem>
                <SelectItem value="scripting">Scripting</SelectItem>
                <SelectItem value="editing">Editing</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={idea.productionStage}
              onValueChange={(value: ProductionStage) => handleUpdate({ productionStage: value })}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Production Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not started">Not Started</SelectItem>
                <SelectItem value="shoot pending">Shoot Pending</SelectItem>
                <SelectItem value="shoot done">Shoot Done</SelectItem>
                <SelectItem value="editing">Editing</SelectItem>
                <SelectItem value="posted">Posted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs
          defaultValue="script"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
            <TabsTrigger value="script">Script</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>
          
          <TabsContent value="script" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Script</CardTitle>
                <CardDescription>Write and edit your content script using markdown</CardDescription>
              </CardHeader>
              <CardContent>
                <MarkdownEditor 
                  value={idea.script} 
                  onChange={handleScriptChange}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reference Resources</CardTitle>
                <CardDescription>External links for research and inspiration</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkList 
                  title="Reference Links"
                  links={idea.referenceLinks}
                  onChange={(links) => handleUpdate({ referenceLinks: links })}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="links" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment Links</CardTitle>
                  <CardDescription>Where the content has been published</CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkList 
                    title="Published Content Links"
                    links={idea.deploymentLinks}
                    onChange={(links) => handleUpdate({ deploymentLinks: links })}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Shoot Files</CardTitle>
                  <CardDescription>Raw footage and assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkList 
                    title="Shoot File Links"
                    links={idea.shootFileLinks}
                    onChange={(links) => handleUpdate({ shootFileLinks: links })}
                  />
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Edit Files</CardTitle>
                  <CardDescription>Links to project files for editing</CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkList 
                    title="Edit File Links"
                    links={idea.editFileLinks}
                    onChange={(links) => handleUpdate({ editFileLinks: links })}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {saving && (
          <div className="fixed bottom-4 right-4 bg-black text-white text-sm py-2 px-4 rounded-md flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving changes...
          </div>
        )}
      </div>
    </div>
  );
}
