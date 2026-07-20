import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Gift } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "Giveaways",
    "Winners",
    "About",
    "Contact",
    "My Applications",
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-green-900/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
<Link to="/" className="flex items-center gap-3">
  <div className="bg-yellow-400 p-2 rounded-xl shadow-lg flex items-center justify-center">
    <Gift size={22} className="text-green-900" />
  </div>

  <div>
    <h1 className="text-white font-bold text-base sm:text-lg lg:text-xl leading-tight">
      Mohammed Bin Salman
    </h1>

    <p className="text-green-100 text-xs">
      Giveaways
    </p>
  </div>
</Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-8 items-center">

          <Link to="/" className="text-white hover:text-yellow-300">
            Home
          </Link>

          <Link to="/giveaways" className="text-white hover:text-yellow-300">
            Giveaways
          </Link>

          <Link to="/winners" className="text-white hover:text-yellow-300">
            Winners
          </Link>

          <Link to="/about" className="text-white hover:text-yellow-300">
            About
          </Link>

          <Link to="/contact" className="text-white hover:text-yellow-300">
            Contact
          </Link>

          <Link to="/my-applications" className="text-white hover:text-yellow-300">
            My Applications
          </Link>

          <Link
            to="/login"
            className="text-white hover:text-yellow-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-yellow-400 text-green-900 px-5 py-2 rounded-xl font-bold"
          >
            Register
          </Link>
        </nav>

        {/* Apply Button */}
        <Link
          to="/apply"
          className="hidden lg:block bg-yellow-400 hover:bg-yellow-300 transition px-6 py-3 rounded-xl font-semibold text-green-900 shadow-lg"
        >
          Apply Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-green-950 px-6 pb-6">

<Link
  to="/"
  onClick={() => setMenuOpen(false)}
  className="block text-white py-3 border-b border-green-800"
>
            Home
          </Link>

          <Link to="/giveaways" className="block text-white py-3 border-b border-green-800">
            Giveaways
          </Link>

          <Link to="/winners" className="block text-white py-3 border-b border-green-800">
            Winners
          </Link>

          <Link to="/about" className="block text-white py-3 border-b border-green-800">
            About
          </Link>

          <Link to="/contact" className="block text-white py-3 border-b border-green-800">
            Contact
          </Link>

          <Link to="/my-applications" className="block text-white py-3 border-b border-green-800">
            My Applications
          </Link>

          <Link
            to="/login"
            className="block text-white py-3 border-b border-green-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block text-center bg-yellow-400 text-green-900 py-3 mt-4 rounded-xl font-bold"
          >
            Register
          </Link>

          <Link
            to="/giveaways"
            className="block text-center mt-4 bg-yellow-400 text-green-900 py-3 rounded-xl font-bold"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;