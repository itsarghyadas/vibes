import { Link } from "react-router-dom";

const links = [
  { to: "/splitflap", text: "Splitflap" },
  { to: "/vestaboard", text: "Vestabord" },
  { to: "/carousel", text: "Carousel" },
  { to: "/embla-carousel", text: "Embla Carousel" },
  { to: "/navmenu", text: "Nav Menu" },
  { to: "/particle", text: "Particle" },
];

export default function Homepage() {
  return (
    <div className="bg-neutral-800 px-5 font-spline min-h-screen flex flex-col gap-y-10 items-center justify-center w-full">
      <div className="text-white">
        <h1 className="text-4xl font-bold text-white">
          All vibes will be listed here
        </h1>
      </div>
      <ul className="flex flex-wrap max-w-3xl mx-auto gap-5">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              className="text-white bg-black p-2 font-normal tracking-wide hover:bg-gray-700 transition-all duration-100 ease-out active:bg-gray-600 rounded-md"
              to={link.to}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
