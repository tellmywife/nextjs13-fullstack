import Image from "next/image";
import Card from "./Card";
import SidebarLink from "./SidebarLink";
import logo from "~public/next.svg";
import LINKS from './LINKS';

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {LINKS.map((link) => (
        <SidebarLink link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;