import { supabase } from "../lib/supabase";

interface Job {
  slug: string;
  title: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Casual";
  description: string;
  requirements: string[];
}

export const getJobs = async (): Promise<Job[]> => {
  const { data: jobs, error } = await supabase
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return jobs as Job[];
};

export const getJobBySlug = async (slug: string): Promise<Job | null> => {
  const { data: job, error } = await supabase
    .from("careers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching job with slug ${slug}:`, error);
    return null;
  }

  return job as Job;
};
