import { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import "./navanimate.css";

type InnerItem = {
  title: string;
  content: string;
  href: string;
};

type MenuItem = {
  title: string;
  description: string;
  subMenuItems: SubMenuItem[];
};

type SubMenuItem = {
  title: string;
  content: string;
  href: string;
};

const NavMenu = ({ mainMenuItems }: { mainMenuItems: MenuItem[] }) => {
  const [innerItems, setInnerItems] = useState<InnerItem[]>([]);
  const [activeTitle, setActiveTitle] = useState<string>(
    mainMenuItems[0]?.title || ""
  );

  useEffect(() => {
    if (mainMenuItems.length > 0) {
      setInnerItems(mainMenuItems[0].subMenuItems);
    }
  }, [mainMenuItems]);

  const handleClick = (title: string) => {
    setActiveTitle(title);
    const selectedMenuItem = mainMenuItems.find((item) => item.title === title);
    if (selectedMenuItem) {
      setInnerItems(selectedMenuItem.subMenuItems);
    }
  };

  return (
    <NavigationMenu.Root className="relative z-[1] bg-[#394150]/50 p-2 max-w-6xl mx-auto rounded-full flex items-center justify-between w-full">
      <div className="flex items-center gap-5">
        <img src="/nav-logo.png" alt="nav-logo" />
      </div>
      <NavigationMenu.List className=" shadow-blackA4 flex h-fit w-full list-none rounded-[6px]">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-neutral-300 hover:text-white group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            Learn{" "}
            <CaretDownIcon
              className="text-white relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content
            className="data-[motion=from-start]:animate-enterFromRight bg-[#394150]/50 rounded-2xl data-[motion=from-end]:animate-enterFromLeft data-[motion=to-start]:animate-exitToRight data-[motion=to-end]:animate-exitToLeft absolute top-0 left-0 w-full sm:w-auto"
            style={{ pointerEvents: "auto" }}
          >
            <div className="grid list-none content-container grid-cols-[250px_1fr_250px] border border-[#394150]/50 rounded-2xl">
              <div className="border-r border-white/20 h-full bg-[#13171E] backdrop-blur-xl z-10 rounded-l-2xl">
                <ul className="w-full list grid gap-2 list-none p-3.5 m-0">
                  {mainMenuItems.map((menuItem, index) => (
                    <ListItem
                      key={index}
                      title={menuItem.title}
                      content={menuItem.description}
                      href="#"
                      isActive={activeTitle === menuItem.title}
                      onClick={() => handleClick(menuItem.title)}
                    />
                  ))}
                </ul>
              </div>
              <ul
                className={`list grid ${
                  innerItems.length < 4 ? "grid-cols-1" : "grid-cols-2"
                } gap-2 items-start justify-between w-full h-full list-none p-4 m-0 min-w-[480px]`}
              >
                {innerItems.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    href={item.href}
                    isActive={false}
                    onClick={() => {}}
                  />
                ))}
              </ul>
              <div className="bg-[#5F49F4] p-0 m-2 ml-0 h-fit rounded-lg">
                <img
                  className="h-fit w-fit"
                  src="/react-icon-png.png"
                  alt="react icon"
                />
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-neutral-300 hover:text-white group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            Report
            <CaretDownIcon
              className="text-white relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content
            className="data-[motion=from-start]:animate-enterFromRight bg-[#394150]/50 rounded-2xl data-[motion=from-end]:animate-enterFromLeft data-[motion=to-start]:animate-exitToRight data-[motion=to-end]:animate-exitToLeft absolute top-0 left-0 w-full sm:w-auto"
            style={{ pointerEvents: "auto" }}
          >
            <div className="grid list-none content-container grid-cols-[250px_1fr] border border-[#394150]/50 rounded-2xl">
              <div className="border-r border-white/20 h-full bg-[#13171E] backdrop-blur-xl z-10 rounded-l-2xl">
                <ul className="w-full list grid gap-2 list-none p-3.5 m-0 ">
                  {mainMenuItems.map((menuItem, index) => (
                    <ListItem
                      key={index}
                      title={menuItem.title}
                      content={menuItem.description}
                      href="#"
                      isActive={activeTitle === menuItem.title}
                      onClick={() => handleClick(menuItem.title)}
                    />
                  ))}
                </ul>
              </div>
              <ul
                className={`list grid ${
                  innerItems.length < 4 ? "grid-cols-1" : "grid-cols-2"
                } gap-2 items-center justify-between w-full h-full list-none p-4 m-0 min-w-[400px]`}
              >
                {innerItems.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    href={item.href}
                    isActive={false}
                    onClick={() => {}}
                  />
                ))}
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-neutral-300 hover:text-white group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            Service
            <CaretDownIcon
              className="text-white relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content
            className="data-[motion=from-start]:animate-enterFromRight bg-[#394150]/50 rounded-2xl data-[motion=from-end]:animate-enterFromLeft data-[motion=to-start]:animate-exitToRight data-[motion=to-end]:animate-exitToLeft absolute top-0 left-0 w-full sm:w-auto"
            style={{ pointerEvents: "auto" }}
          >
            <div className="grid list-none content-container grid-cols-[1fr] border border-[#394150]/50 rounded-2xl">
              <ul
                className={`list grid ${
                  innerItems.length < 4 ? "grid-cols-1" : "grid-cols-2"
                } gap-2 items-center justify-between w-full h-full rounded-2xl list-none p-2 m-0 min-w-[400px]`}
              >
                {innerItems.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    href={item.href}
                    isActive={false}
                    onClick={() => {}}
                  />
                ))}
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="flex items-center gap-5">
        <button className="text-white">Log In</button>
        <button className="bg-[#5F49F4] p-2 rounded-full">
          <img src="/nav-logo.png" alt="nav-logo" />
        </button>
      </div>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = ({
  title,
  content,
  href,
  isActive,
  onClick,
}: {
  title: string;
  content: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  useEffect(() => {
    const LIST = document.querySelectorAll(".list") as NodeListOf<HTMLElement>;
    LIST.forEach((list) => {
      list.dataset.enhanced = "true";
    });
    let current: HTMLElement | null = null;
    const sync = () => {
      if (current) {
        const parents = document.querySelectorAll(".content-container");
        parents.forEach((parent) => {
          const parentBounds = parent.getBoundingClientRect();
          if (current) {
            const currentBounds = current.getBoundingClientRect();

            const relativeTop = currentBounds.top - parentBounds.top;
            const relativeLeft = currentBounds.left - parentBounds.left;
            const relativeRight = parentBounds.right - currentBounds.right;
            const relativeBottom = parentBounds.bottom - currentBounds.bottom;

            const relativeHeight = currentBounds.height;
            const relativeWidth = currentBounds.width;

            LIST.forEach((list) => {
              list.dataset.enhanced = "true";
              list.style.setProperty("--top", `${relativeTop}px`);
              list.style.setProperty("--right", `${relativeRight}px`);
              list.style.setProperty("--bottom", `${relativeBottom}px`);
              list.style.setProperty("--left", `${relativeLeft}px`);
              list.style.setProperty("--height", `${relativeHeight}px`);
              list.style.setProperty("--width", `${relativeWidth}px`);
            });
          }
        });
      }
    };
    const UPDATE = ({ x, y }: { x: number; y: number }) => {
      const ARTICLE = document
        .elementFromPoint(x, y)
        ?.closest(".listitem") as HTMLElement | null;
      if (ARTICLE !== current) {
        current = ARTICLE;
        sync();
      }
    };
    LIST.forEach((list) => {
      list.addEventListener("pointermove", UPDATE);
    });
    window.addEventListener("resize", sync);
  }, []);

  return (
    <li
      className={`listitem list-none cursor-pointer h-full z-10 transition-colors duration-300 relative ${
        isActive ? "bg-[#394150]/50 rounded-lg" : ""
      }`}
      data-item-anchor={`--${title.toLowerCase()}`}
      key={title}
    >
      <a
        href={href}
        onClick={onClick}
        className="listitemcontainer animate-text flex flex-col gap-y-0.5 p-4 relative"
      >
        <h3 className="text-sm text-white">{title}</h3>
        <p className="text-xs text-white/50 font-normal">{content}</p>
        {isActive && (
          <span className="indicator absolute top-[50%] -right-[22px] w-4 h-4 rotate-45 border-r border-t border-white/20 bg-[#13171E] backdrop-blur-md"></span>
        )}
      </a>
    </li>
  );
};

export default NavMenu;
