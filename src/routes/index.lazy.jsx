import { createLazyFileRoute } from '@tanstack/react-router';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { setToken } from '@/redux/slices/auth';

export const Route = createLazyFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (event) => {
    event.preventDefault();

    dispatch(setToken(null));

    navigate({ to: "/auth/login" });
  };

  return (
    <div className="flex flex-col justify-start h-[100vh] w-[100vw]">
      {/* Hero */}
      <div className="hero flex-1 pt-20 mt-5">
        <img src="/hero.svg" alt="hero" />
      </div>
      {/* Harusnya di halaman profile */}
      <div className="flex justify-center mb-10">
        <Button onClick={logout} className="rounded-xl bg-red-500 text-white px-6 py-2 hover:bg-red-600">
          Keluar
        </Button>
      </div>
    </div>
  );
}
