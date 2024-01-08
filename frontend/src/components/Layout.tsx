import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

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
      <footer>
        <p className="footerText">Built and styled by: TessDevon</p>
      </footer>
    </>
  );
}