import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link to="/" className="text-white text-md ">
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/leads" className="text-white text-md">
            Leads
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
