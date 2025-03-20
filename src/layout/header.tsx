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

const HeaderBar = () => {
  const location = useLocation();

  return (
    <header className="flex h-18 shrink-0 items-center gap-2 border-b border-primary-200 dark:border-primary-700">
      <div className="flex items-center gap-2 px-4 w-full h-full">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 max-h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              {location.pathname === "/" ? (
                <BreadcrumbPage>Gateways</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="/">Gateways</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {location.pathname !== "/" && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {location.pathname.split("/").reverse()[0]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
export default HeaderBar;
