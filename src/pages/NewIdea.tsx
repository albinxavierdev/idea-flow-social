
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContentIdea, ContentType, CreativeStatus, ProductionStage } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Loader2 } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  type: z.enum(["short-form", "long-form"]),
  creativeStatus: z.enum(["ideation", "scripting", "editing", "published"]),
  productionStage: z.enum([
    "not started",
    "shoot pending",
    "shoot done",
    "editing",
    "posted",
  ]),
});

export default function NewIdea() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "short-form",
      creativeStatus: "ideation",
      productionStage: "not started",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // This would be replaced with actual Supabase client call
      // const { data, error } = await supabaseClient.from("ideas").insert([newIdea]);
      
      // Create new idea object
      const newIdea: ContentIdea = {
        id: uuidv4(),
        title: values.title,
        type: values.type,
        creativeStatus: values.creativeStatus,
        productionStage: values.productionStage,
        referenceLinks: [],
        deploymentLinks: [],
        shootFileLinks: [],
        editFileLinks: [],
        script: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real app, we would add the idea to Supabase here
      
      toast({
        title: "Idea created!",
        description: "Your content idea has been created successfully.",
      });

      // Navigate to edit page for the new idea
      navigate(`/edit/${newIdea.id}`);
    } catch (error) {
      toast({
        title: "Error creating idea",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1 text-gray-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">New Content Idea</h1>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter content title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give your content a descriptive title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="short-form">Short-form</SelectItem>
                            <SelectItem value="long-form">Long-form</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Is this short-form (TikTok, Reels) or long-form (YouTube)?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="creativeStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Creative Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select creative status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ideation">Ideation</SelectItem>
                            <SelectItem value="scripting">Scripting</SelectItem>
                            <SelectItem value="editing">Editing</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productionStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Production Stage</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select production stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="not started">Not Started</SelectItem>
                            <SelectItem value="shoot pending">Shoot Pending</SelectItem>
                            <SelectItem value="shoot done">Shoot Done</SelectItem>
                            <SelectItem value="editing">Editing</SelectItem>
                            <SelectItem value="posted">Posted</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create & Continue"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
