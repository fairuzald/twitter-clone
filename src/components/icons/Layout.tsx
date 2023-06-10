interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="h-screen"></div>;
};
export default Layout;
