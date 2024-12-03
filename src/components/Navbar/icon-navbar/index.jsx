import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useNavigate } from '@tanstack/react-router';

export function NavbarIcon({ Content, ImageLink, Redirect }) {
  const navigate = useNavigate();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => navigate({ to: Redirect })}>
            {' '}
            <Link to={'/'}>
              <img src={ImageLink} alt="list" className="w-6 h-6 cursor-pointer" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{Content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
