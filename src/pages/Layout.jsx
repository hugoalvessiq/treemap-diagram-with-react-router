import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Video Game Data Set</Link> |
          </li>
          <li>
            <Link to="/movies">&nbsp;Movies Data Set </Link> |
          </li>
          <li>
            <Link to="/kickstarter">&nbsp; Kickstarter Data Set</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
export default Layout;
