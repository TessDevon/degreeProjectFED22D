import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import LoginModal from "./LoginModal";

export const Layout = () => {
  return (
    <>
      <header>
        <h1>Våra minivärldar</h1>
        <Navigation></Navigation>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <LoginModal></LoginModal>
      <footer>
        <p className="footerText">Built and styled by: TessDevon</p>
      </footer>
    </>
  );
};