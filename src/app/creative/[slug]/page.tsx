import { creativeProjects } from "@/data/creative-projects";
import CreativeDetailClient from "./CreativeDetailClient";

// Slugs that have dedicated pages under /creative/ — exclude from dynamic route
const dedicatedPages = new Set([
  "caribbean-islands-comparison",
  "maldives-mauritius-comparison",
]);

export function generateStaticParams() {
  return creativeProjects
    .filter((project) => !dedicatedPages.has(project.slug))
    .map((project) => ({
      slug: project.slug,
    }));
}

export default function CreativeDetailPage() {
  return <CreativeDetailClient />;
}
