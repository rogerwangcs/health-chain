// import { SideNav, Nav } from "react-sidenav";

const Navigation = () => (
  <SideNav defaultSelectedPath="1">
    <Nav id="1">
      <Icon icon={item1} />
      Item 1
    </Nav>
    <Nav id="2">
      <Icon icon={item2} />
      Item 2
    </Nav>
    <Nav id="3">
      <Icon icon={item2} />
      Item 3
    </Nav>
  </SideNav>
);

export default Navigation;