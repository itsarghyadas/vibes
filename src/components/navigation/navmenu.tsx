import { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

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
    <NavigationMenu.Root className="relative z-[1] p-4 flex justify-center">
      <NavigationMenu.List className="shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white shadow-[0_2px_10px]">
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
            /*    forceMount */
            className="content-container data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight border data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight w-[100ch] flex h-full gap-x-5 rounded-lg "
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative border-r h-full min-w-[220px]">
              <ul className="w-full list grid gap-2 list-none p-2 m-0 ">
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
              } gap-2 items-start justify-center h-full list-none p-2 m-0 min-w-[400px]`}
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
            <div className="w-full bg-[#5F49F4] p-4 m-2 relative overflow-hidden rounded-lg">
              <img
                className="w-full h-full absolute p-4 object-contain aspect-auto top-20 -right-10"
                src="/react-icon-png.png"
                alt=""
              />
            </div>
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
      className={`listitem list-none cursor-pointer z-10 h-full transition-colors duration-300 ${
        isActive ? "bg-neutral-200/50 rounded-lg" : ""
      }`}
      data-item-anchor={`--${title.toLowerCase()}`}
    >
      <div>
        <a
          href={href}
          onClick={onClick}
          className="listitemcontainer animate-text h-full flex flex-col gap-y-0.5 p-4 relative"
        >
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-sm text-neutral-500">{content}</p>
        </a>
      </div>
    </li>
  );
};

export default NavMenu;
