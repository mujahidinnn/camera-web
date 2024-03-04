import Menu from "./Menu";

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Menu />
      <div style={{ width: "100%", padding: "24px" }}>{children}</div>
    </div>
  );
};

export default AppLayout;
