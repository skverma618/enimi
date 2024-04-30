import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import SearchModal from "./search-modal";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";
import SignedOut from "../auth/signed-out";
import SignedIn from "../auth/signed-in";
import UserButton from "../auth/user-button";

const Navbar = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="max-w-screen-2xl flex items-center h-16 justify-between w-full mx-auto px-4">
      <Link to="/home" className="flex items-center">
        <span className="h-8 w-8">
          <img
            src="/logo.gif"
            alt="enimi logo"
            className="h-full w-full object-cover"
          />
        </span>
        <p className="font-medium text-2xl ml-2 text-pretty text-primary">
          enimi
        </p>
      </Link>

      <div className="flex items-center w-fit gap-x-3">
        {/* Search button */}
        <SearchModal />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="relative flex-shrink-0"
        >
          <Sun className="h-4 w-4 absolute dark:opacity-100 opacity-0 dark:-rotate-90 rotate-0 transition-all duration-300" />
          <Moon className="h-4 w-4 absolute dark:opacity-0 opacity-100 dark:rotate-0 -rotate-90 transition-all duration-300" />
        </Button>

        <SignedOut>
          <div className="min-w-[13rem] hidden sm:block w-full">
            <Link
              to="/login"
              className={cn(buttonVariants({ className: "w-full" }))}
            >
              Login
            </Link>
          </div>
        </SignedOut>

        <SignedIn className="flex items-center justify-center">
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Navbar;
