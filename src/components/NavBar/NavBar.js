import NavBarRegister from "./NavBarRoutes.js/NavBarRegister";
import NavBarLogin from "./NavBarRoutes.js/NavBarLogin";
import NavBarSearchBar from "./NavBarRoutes.js/NavBarSearchBar";
import NavBarLogo from "./NavBarRoutes.js/NavBarLogo";
import NavBarHomePage from "./NavBarRoutes.js/NavBarHomePage";

function NavBar() {
  return (
    <div className="container">
      <nav
        className="navbar navbar-dark bg-primary mt-2"
        style={{ borderRadius: "22px" }}
      >
        <NavBarLogo />
        <NavBarHomePage />
        <NavBarSearchBar />
        <NavBarLogin />
        <NavBarRegister />
      </nav>
    </div>
  );
}

export default NavBar;
