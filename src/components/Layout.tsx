import Followbar from "./Followbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-black">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-1 flex-col border-x-[1px] border-twitter-border ">
        {children}
      </div>
      <Followbar />
    </div>
  );
};
export default Layout;
