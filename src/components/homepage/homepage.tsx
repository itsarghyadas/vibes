import { Link } from "react-router-dom";

const links = [
  {
    to: "/splitflap",
    text: "Splitflap (JS)",
    image: "/vestaboard-card-image.png",
  },
  {
    to: "/carousel",
    text: "Carousel",
    image: "/carousel-card-image.png",
  },
  {
    to: "/vestaboard",
    text: "Vestabord (React)",
    image: "/vestaboard-card-image.png",
  },

  {
    to: "/embla-carousel",
    text: "Embla Carousel",
    image: "/embla-carousel-card-image.png",
  },
  { to: "/navmenu", text: "Nav Menu", image: "/navbar-card-image.png" },
  { to: "/particle", text: "Particle", image: "/particle-card-image.png" },
];

export default function Homepage() {
  return (
    <div className="bg-neutral-800 py-10 px-5 font-spline min-h-screen flex flex-col gap-y-10 items-center justify-center w-full">
      <div className="text-white">
        <h1 className="text-xl md:text-2xl text-center lg:text-4xl font-bold text-white">
          All vibes will be listed here
        </h1>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center justify-center container mx-auto">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className="flex flex-col gap-y-2 border border-neutral-700 rounded-xl w-full mx-auto p-2 hover:bg-neutral-700 transition-all duration-100 ease-out active:bg-neutral-600"
            >
              <img
                src={link.image}
                alt={link.text}
                className="w-full h-auto mx-auto rounded-md"
              />
              <div className="bg-white text-black mx-auto w-full p-2 font-bold tracking-wide rounded-md text-center">
                {link.text}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
