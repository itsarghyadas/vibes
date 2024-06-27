import { useEffect } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

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

const NavMenu = () => {
  return (
    <NavigationMenu.Root className="relative z-[1] p-4 flex w-screen justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            data-state="open"
            className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          >
            Learn{" "}
            <CaretDownIcon
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            data-state="open"
            className="content-container data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight border data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-[800px]"
            style={{ pointerEvents: "auto" }}
          >
            <ListItem />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = () => {
  useEffect(() => {
    if (!CSS.supports("anchor-name: --anchor")) {
      console.log("supports");
      const LIST = document.querySelector(".list") as HTMLElement;
      console.log(LIST);
      LIST.dataset.enhanced = "true";
      let current: HTMLElement | null = null;
      const sync = () => {
        if (current) {
          const parent = document.querySelector(".content-container");
          if (parent) {
            const parentBounds = parent.getBoundingClientRect();
            const currentBounds = current.getBoundingClientRect();

            const relativeTop = currentBounds.top - parentBounds.top;
            const relativeLeft = currentBounds.left - parentBounds.left;
            const relativeRight = parentBounds.right - currentBounds.right;
            const relativeBottom = parentBounds.bottom - currentBounds.bottom;

            const relativeHeight = currentBounds.height;
            const relativeWidth = currentBounds.width;

            LIST.style.setProperty("--top", `${relativeTop}px`);
            LIST.style.setProperty("--right", `${relativeRight}px`);
            LIST.style.setProperty("--bottom", `${relativeBottom}px`);
            LIST.style.setProperty("--left", `${relativeLeft}px`);
            LIST.style.setProperty("--height", `${relativeHeight}px`);
            LIST.style.setProperty("--width", `${relativeWidth}px`);
          }
        }
      };
      const UPDATE = ({ x, y }: { x: number; y: number }) => {
        console.log({ x, y });
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
  );
};

export default NavMenu;
