import { useEffect } from "react";
import "./navanimate.css";

const items = [
  {
    title: "Preview.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima alias fuga et ab magnam aliquam commodi ratione vel fugit nesciunt voluptatibus.",
  },
  {
    title: "Preview.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima alias fuga et ab magnam aliquam commodi ratione vel fugit nesciunt voluptatibus.",
  },
  {
    title: "Preview.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima alias fuga et ab magnam aliquam commodi ratione vel fugit nesciunt voluptatibus.",
  },
  {
    title: "Preview.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima alias fuga et ab magnam aliquam commodi ratione vel fugit nesciunt voluptatibus.",
  },
];

const NavAnimate = () => {
  useEffect(() => {
    if (!CSS.supports("anchor-name: --anchor")) {
      const LIST = document.querySelector(".list") as HTMLElement;
      LIST.dataset.enhanced = "true";
      let current: HTMLElement | null = null;
      const sync = () => {
        if (current) {
          const BOUNDS = current.getBoundingClientRect();
          LIST.style.setProperty("--top", `${BOUNDS.top}px`);
          LIST.style.setProperty("--right", `${BOUNDS.right}px`);
          LIST.style.setProperty("--bottom", `${BOUNDS.bottom}px`);
          LIST.style.setProperty("--left", `${BOUNDS.left}px`);
          LIST.style.setProperty("--height", `${BOUNDS.height}px`);
          LIST.style.setProperty("--width", `${BOUNDS.width}px`);
          console.log(BOUNDS);
        }
      };
      // measure on mount
      const UPDATE = ({ x, y }: { x: number; y: number }) => {
        const ARTICLE = document
          .elementFromPoint(x, y)
          ?.closest(".listitem")
          ?.querySelector(".listitemcontainer") as HTMLElement | null;
        if (ARTICLE !== current) {
          current = ARTICLE;
          sync();
        }
      };
      LIST.addEventListener("pointermove", UPDATE);
      window.addEventListener("resize", sync);
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto flex items-center justify-center h-screen">
      <ul className="list grid grid-cols-2 list-none p-0 m-0">
        {items.map((item, index) => (
          <li key={index} className="listitem list-none cursor-pointer z-10">
            <div className="listitemcontainer">
              <a href="#">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default NavAnimate;
