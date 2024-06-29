import NavMenu from "./navmenu";

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

const mainMenuItems: MenuItem[] = [
  {
    title: "First Menu",
    description: "First Description",
    subMenuItems: [
      {
        title: "First Submenu",
        content: "First Submenu Content",
        href: "/first-submenu",
      },
      {
        title: "Second Submenu",
        content: "Second Submenu Content",
        href: "/second-submenu",
      },
      {
        title: "Second Submenu",
        content: "Second Submenu Content",
        href: "/second-submenu",
      },
      {
        title: "Second Submenu",
        content: "Second Submenu Content",
        href: "/second-submenu",
      },
      {
        title: "Second Submenu",
        content: "Second Submenu Content",
        href: "/second-submenu",
      },
      {
        title: "Second Submenu",
        content: "Second Submenu Content",
        href: "/second-submenu",
      },
      {
        title: "Second Submenu",
        content: "Second Submenu Content",
        href: "/second-submenu",
      },
    ],
  },
  {
    title: "Second Menu",
    description: "Second Description",
    subMenuItems: [
      {
        title: "Third Submenu",
        content: "Third Submenu Content",
        href: "/third-submenu",
      },
      {
        title: "Fourth Submenu",
        content: "Fourth Submenu Content",
        href: "/fourth-submenu",
      },
      {
        title: "Fourth Submenu",
        content: "Fourth Submenu Content",
        href: "/fourth-submenu",
      },
    ],
  },
  {
    title: "Second Menu",
    description: "Second Description",
    subMenuItems: [
      {
        title: "Third Submenu",
        content: "Third Submenu Content",
        href: "/third-submenu",
      },
      {
        title: "Fourth Submenu",
        content: "Fourth Submenu Content",
        href: "/fourth-submenu",
      },
      {
        title: "Fourth Submenu",
        content: "Fourth Submenu Content",
        href: "/fourth-submenu",
      },
    ],
  },
  {
    title: "Second Menu",
    description: "Second Description",
    subMenuItems: [
      {
        title: "Third Submenu",
        content: "Third Submenu Content",
        href: "/third-submenu",
      },
      {
        title: "Fourth Submenu",
        content: "Fourth Submenu Content",
        href: "/fourth-submenu",
      },
      {
        title: "Fourth Submenu",
        content: "Fourth Submenu Content",
        href: "/fourth-submenu",
      },
    ],
  },
];

export default function NavMenuShow() {
  return (
    <section className="w-full bg-[#07090D] h-screen p-10 relative">
      <NavMenu mainMenuItems={mainMenuItems} />
    </section>
  );
}
