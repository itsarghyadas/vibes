import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="bg-neutral-800 min-h-screen flex flex-col gap-y-10 items-center justify-center w-full">
      <div className="text-white">
        <h1 className="text-4xl font-bold text-white">
          Hello, this is the homepage
        </h1>
      </div>
      <ul className="flex flex-wrap max-w-3xl mx-auto gap-10 gap-x-5">
        <li>
          <Link className="text-white bg-black p-2 rounded-md" to="/vestaboard">
            Vestabord
          </Link>
        </li>
        <li>
          <Link className="text-white bg-black p-2 rounded-md" to="/carousel">
            Carousel
          </Link>
        </li>
        <li>
          <Link
            className="text-white bg-black p-2 rounded-md"
            to="/embla-carousel"
          >
            Embla Carousel
          </Link>
        </li>
      </ul>
    </div>
  );
}
