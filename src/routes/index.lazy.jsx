import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center h-[100vh] w-[100vw]">
      <div className="sideImage w-[50%] h-full bg-black">
        <img src="/side-picture.svg" alt="sideImage" className="object-cover w-full h-full" />
      </div>
      <div className="formAuth w-[50%] h-full flex flex-col gap-4 justify-center items-center">
        <p>Welcome To Tiketku</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate({ to: '/auth/login' });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
