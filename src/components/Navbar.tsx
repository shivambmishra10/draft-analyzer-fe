import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

const Navbar = () => {

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        Policy Analyzer
      </Link>
      <div className="space-x-4">
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
