import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  return (
    <div className="flex flex-row justify-center items-center h-[100vh] w-[100vw]">
      <div className="sideImage w-[50%] h-full bg-black">
        <img src="/side-picture.svg" alt="sideImage" className="object-cover w-full h-full" />
      </div>
      <div className="formAuth w-[50%] h-full"></div>
    </div>
  );
}
