import { createLazyFileRoute } from '@tanstack/react-router';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { setToken } from '@/redux/slices/auth';
import Navbar from '@/components/Navbar';
import FlightSearch from '@/components/Home/search';
import Favorite from '@/components/Home/favorite';
// import SearchDestination from '@/components/Home/SearchDestination';
// import FavoriteDestination from '@/components/Home/favorite';

export const Route = createLazyFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (event) => {
    event.preventDefault();

    dispatch(setToken(null));

    navigate({ to: '/auth/login' });
  };

  return (
    <>
      <Navbar isAuth={true} searchBar={true} />
      <main className="flex flex-col justify-start w-screen items-center">
        {/* Hero */}
        <div className="mt-[3rem] w-full">
          <img src="/hero.svg" alt="hero" className="w-full object-cover" />
        </div>
        {/* Search Form */}
        <div className="">
          <FlightSearch />
        </div>

        {/* <FavoriteDestination /> */}
        <div>
          {/* <SearchDestination /> */}
          <Favorite />
        </div>
      </main>
    </>
  );
}
