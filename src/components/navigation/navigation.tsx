import { useEffect, useState, forwardRef } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Accordion from "@radix-ui/react-accordion";
import {
  CaretDownIcon,
  Link2Icon,
  HamburgerMenuIcon,
  ChevronDownIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import Button from "../vibesbutton/vibesbutton";
import "./navanimate.css";
import clsx from "clsx";

type InnerMenuItem = {
  title: string;
  content: string;
  href: string;
};

type SubMenuItem = {
  title?: string;
  content?: string;
  innerMenuItems?: InnerMenuItem[];
};

type imageContainer = {
  title: string;
  description: string;
  img: string;
  alt: string;
};

type MenuItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  subMenuItems: SubMenuItem[];
  img?: imageContainer[];
};

const Navigation = ({ mainMenuItems }: { mainMenuItems: MenuItem[] }) => {
  const [innerItems, setInnerItems] = useState<InnerMenuItem[]>([]);
  const [activeTitle, setActiveTitle] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add a click handler for the hamburger icon to toggle the mobile menu
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (menuItem: MenuItem) => {
    setActiveTitle(menuItem.subMenuItems[0].title || "");
    setInnerItems(menuItem.subMenuItems[0].innerMenuItems || []);
  };

  const handleClick = (title: string) => {
    setActiveTitle(title);
    const selectedMenuItem = mainMenuItems.find((item) =>
      item.subMenuItems.some((subItem) => subItem.title === title)
    );
    if (selectedMenuItem) {
      const selectedSubMenu = selectedMenuItem.subMenuItems.find(
        (subItem) => subItem.title === title
      );
      if (selectedSubMenu) {
        setInnerItems(selectedSubMenu.innerMenuItems || []);
      }
    }
  };

  return (
    <>
      <NavigationMenu.Root className="relative z-[1] bg-[#394150]/50 max-w-6xl mx-auto rounded-3xl lg:rounded-full flex items-center justify-between flex-wrap w-full">
        <div className="flex items-center justify-between w-full p-2">
          <div className="flex items-center gap-5 shrink-0">
            <img src="/nav-logo.png" alt="nav-logo" />
          </div>
          <NavigationMenu.List className="hidden shadow-blackA4 lg:flex h-fit w-full list-none rounded-[6px]">
            {mainMenuItems.map((menuItem, index) => (
              <NavigationMenu.Item value={menuItem.id} key={index}>
                {menuItem.href ? (
                  <NavigationMenu.Trigger className="group">
                    <a
                      className="text-white/70 hover:text-white group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-normal leading-none outline-none focus:shadow-[0_0_0_2px]"
                      href={menuItem.href}
                    >
                      {menuItem.title}
                      <Link2Icon className="text-white -translate-x-[1px] opacity-0 group-hover:translate-x-[1px] group-hover:opacity-100 transition-transform duration-[100] ease-out" />
                    </a>
                  </NavigationMenu.Trigger>
                ) : (
                  <NavigationMenu.Trigger
                    onMouseEnter={() => handleMouseEnter(menuItem)}
                    className={`text-white/70 hover:text-white group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-normal leading-none outline-none focus:shadow-[0_0_0_2px] ${menuItem.id}`}
                  >
                    {menuItem.title}
                    <CaretDownIcon
                      className="text-white relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                      aria-hidden
                    />
                  </NavigationMenu.Trigger>
                )}

                {menuItem.subMenuItems.length > 0 && (
                  <NavigationMenu.Content
                    className="data-[motion=from-start]:animate-enterFromRight bg-[#394150]/50 rounded-2xl data-[motion=from-end]:animate-enterFromLeft data-[motion=to-start]:animate-exitToRight data-[motion=to-end]:animate-exitToLeft absolute top-0 left-0 w-full sm:w-auto"
                    style={{ pointerEvents: "auto" }}
                  >
                    <div
                      className={`grid list-none content-container border border-[#394150]/50 rounded-2xl ${
                        menuItem.subMenuItems[0].title && menuItem.img
                          ? "grid-cols-[250px_1fr_300px]"
                          : menuItem.subMenuItems[0].title
                          ? "grid-cols-[250px_1fr]"
                          : menuItem.img
                          ? "grid-cols-[1fr_300px]"
                          : "grid-cols-[1fr]"
                      }`}
                    >
                      <div
                        className={`${
                          menuItem.subMenuItems[0].title ? "" : "hidden"
                        } h-full bg-[#13171E] backdrop-blur-xl z-10 rounded-l-2xl`}
                      >
                        <ul className="w-full list grid gap-2 list-none p-3.5 m-0">
                          {menuItem.subMenuItems.map(
                            (subMenuItem, subIndex) => (
                              <ListItem
                                key={subIndex}
                                title={subMenuItem.title || ""}
                                content={subMenuItem.content || ""}
                                href="#"
                                isActive={activeTitle === subMenuItem.title}
                                onClick={() =>
                                  handleClick(subMenuItem.title || "")
                                }
                              />
                            )
                          )}
                        </ul>
                      </div>
                      <ul
                        className={`list grid ${
                          innerItems.length < 4 ? "grid-cols-1" : "grid-cols-2"
                        } gap-2 items-start justify-between w-full h-full list-none p-4 m-0 min-w-[480px]`}
                      >
                        {innerItems.map((item, innerIndex) => (
                          <ListItem
                            key={innerIndex}
                            title={item.title}
                            content={item.content}
                            href={item.href}
                            isActive={false}
                            onClick={() => {}}
                          />
                        ))}
                      </ul>
                      {menuItem.img && menuItem.img.length > 0 && (
                        <div className="bg-[#5F49F4]/25 p-3.5 m-2 ml-0 min-h-[200px] max-h-[250px] rounded-lg overflow-hidden relative">
                          <div className="absolute top-32 left-1/2 right-1/2 w-full h-full opacity-70 bg-[#5F49F4] rounded-full blur-[120px]" />
                          <p className="text-white">{menuItem.img[0].title}</p>
                          <p className="text-white/50">
                            {menuItem.img[0].description}
                          </p>
                          <img
                            className="absolute top-32 left-20"
                            src={menuItem.img[0].img}
                            alt={menuItem.img[0].alt}
                          />
                        </div>
                      )}
                    </div>
                  </NavigationMenu.Content>
                )}
              </NavigationMenu.Item>
            ))}

            <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center transition-[width,transform_250ms_ease]">
              <div className="relative top-[50%] -left-2 h-[1px] w-full rounded-tl-[2px] bg-gradient-to-r from-[#EA3BA7]/0 via-[#EA3BA7] to-[#EA3BA7]/0 mix-blend-overlay" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="hidden lg:flex items-center gap-5">
            <button className="text-white">Log In</button>
            <Button variant="primary" size="default">
              Book a Demo
            </Button>
          </div>

          <div className="lg:hidden pr-4">
            {isMobileMenuOpen ? (
              <Cross1Icon
                className="text-white h-5 w-5 cursor-pointer"
                onClick={handleMobileMenuToggle}
              />
            ) : (
              <HamburgerMenuIcon
                className="text-white h-5 w-5 cursor-pointer"
                onClick={handleMobileMenuToggle}
              />
            )}
          </div>
        </div>

        <div
          className={`w-full lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[700px]" : "max-h-0"
          }`}
        >
          <div
            className={`${
              isMobileMenuOpen ? "border-t border-white/10" : "border-none"
            }`}
          >
            <AccordionDemo mainMenuItems={mainMenuItems} />
          </div>
        </div>

        <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
          <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenu.Root>
    </>
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
        ?.closest(".listitem")
        ?.querySelector(".listitemcontainer") as HTMLElement | null;
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
        isActive ? "bg-[#394150]/50 rounded-lg" : "rounded-lg"
      }`}
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
          <span className="indicator absolute top-[40%] -right-[22px] w-4 h-4 rotate-45 border-r border-t border-white/20 bg-[#13171E] backdrop-blur-md"></span>
        )}
      </a>
    </li>
  );
};

const AccordionItem = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; value: string }
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={clsx(
      "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={clsx(
        "group flex h-[45px] text-white flex-1 cursor-pointer items-center justify-between px-5 py-2 text-[15px] leading-none outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-white ml-5 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(
      "text-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5 flex flex-col gap-y-2.5">{children}</div>
  </Accordion.Content>
));

const AccordionDemo = ({ mainMenuItems }: { mainMenuItems: MenuItem[] }) => (
  <Accordion.Root
    className="w-full p-2"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    {mainMenuItems.map((menuItem, index) => (
      <AccordionItem value={menuItem.id} key={index}>
        {menuItem.href ? (
          <a
            className="group flex h-[45px] text-white flex-1 cursor-pointer items-center justify-between px-5 py-2 text-[15px] leading-none outline-none"
            href={menuItem.href}
          >
            {menuItem.title}
          </a>
        ) : (
          <AccordionTrigger>{menuItem.title}</AccordionTrigger>
        )}
        <AccordionContent>
          {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
            <div key={subIndex}>
              {subMenuItem.innerMenuItems && (
                <ul className="flex flex-col gap-y-3.5">
                  {subMenuItem.innerMenuItems.map((innerItem, innerIndex) => (
                    <li key={innerIndex} className="flex flex-col gap-y-0.5">
                      <a className="text-sm text-white" href={innerItem.href}>
                        {innerItem.title}
                      </a>
                      <p className="text-xs text-white/50 font-normal">
                        {innerItem.content}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion.Root>
);

export default Navigation;