import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from '@tanstack/react-router';

export function NavbarIcon({ Content, Icon, Redirect }) {
  const location = useLocation();

  // Function to check if the current path matches the redirect path
  const isActive = location.pathname === Redirect;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            to={Redirect}
            className={`${isActive ? 'text-[#7126B5] font-bold' : 'text-black'}`} // Apply active class conditionally
          >
            <Icon className="w-6 h-6 cursor-pointer" /> {/* Gunakan komponen ikon */}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{Content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
