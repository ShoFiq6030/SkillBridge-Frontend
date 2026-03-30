import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  title: string;
  href?: string;
  isActive?: boolean;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  // Split pathname by "/" and filter out empty segments
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumbs from path segments
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Home",
      href: "/",
      isActive: pathSegments.length === 0,
    },
  ];

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += "/" + segment;
    const isActive = index === pathSegments.length - 1;

    // Convert kebab-case to Title Case
    const title = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      title,
      href: isActive ? undefined : currentPath,
      isActive,
    });
  });

  return breadcrumbs;
}
