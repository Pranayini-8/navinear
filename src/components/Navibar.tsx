import { Link } from "react-router-dom";

const Navibar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">UToledo Navigation</h1>
      <div>
        <Link className="mx-2 hover:text-yellow-400" to="/">
          Home
        </Link>
        <Link className="mx-2 hover:text-yellow-400" to="/maps">
          Maps
        </Link>
        <Link className="mx-2 hover:text-yellow-400" to="/officehours">
          Office Hours
        </Link>
      </div>
    </nav>
  );
};

export default Navibar;
