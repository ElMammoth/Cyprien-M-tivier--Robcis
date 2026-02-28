import { creativeProjects } from "@/data/creative-projects";
import CreativeDetailClient from "./CreativeDetailClient";

export function generateStaticParams() {
  return creativeProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default function CreativeDetailPage() {
  return <CreativeDetailClient />;
}
