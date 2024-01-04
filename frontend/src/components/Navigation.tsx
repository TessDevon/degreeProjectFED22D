import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="headerLink">
            <Link className="Link" to="/">
                Inspiration
            </Link>
          </li>
          <li className="headerLink">
            <Link className="Link" to="/Selling">
                Köp och sälj
            </Link>
          </li>
          <li className="headerLink">
            <Link className="Link" to="/About">
                Om oss
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};