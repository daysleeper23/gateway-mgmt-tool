import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router";
import { z } from "zod";

const HeaderBar = () => {
  const location = useLocation();

  return (
    <header className="flex h-18 shrink-0 items-center gap-2 border-b border-primary-200 dark:border-primary-700">
      <div className="flex items-center gap-2 px-4 w-full h-full">
        <SidebarTrigger data-testid="sidebar-trigger" />
        <Separator orientation="vertical" className="mr-2 max-h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {z.string().uuid().safeParse(location.pathname.split("/")[1])
              .success ? (
              <>
                <BreadcrumbLink href="/">Gateways</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="w-64 truncate md:w-auto">
                    {location.pathname.split("/").reverse()[0]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : location.pathname === "/" ? (
              <BreadcrumbPage>Gateways</BreadcrumbPage>
            ) : (
              <BreadcrumbPage className="capitalize">
                {location.pathname.split("/")[1]}
              </BreadcrumbPage>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
export default HeaderBar;
