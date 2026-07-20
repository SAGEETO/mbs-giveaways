import { Link } from "react-router-dom";
import {
  Gift,
  Mail,
  Globe,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Gift className="text-yellow-400" size={30} />
            <h2 className="text-2xl font-bold">
              MBS Giveaways
            </h2>
          </div>

          <p className="text-green-100 leading-7">
            Join thousands of participants worldwide for exciting giveaways,
            cash rewards, luxury vehicles, smartphones and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-5">
            Quick Links
          </h3>

          <div className="space-y-3">

            <Link to="/" className="block hover:text-yellow-400">
              Home
            </Link>

            <Link to="/giveaways" className="block hover:text-yellow-400">
              Giveaways
            </Link>

            <Link to="/winners" className="block hover:text-yellow-400">
              Winners
            </Link>

            <Link to="/about" className="block hover:text-yellow-400">
              About
            </Link>

            <Link to="/contact" className="block hover:text-yellow-400">
              Contact
            </Link>

          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold mb-5">
            Support
          </h3>

          <div className="space-y-3">

            <Link to="/privacy" className="block hover:text-yellow-400">
              Privacy Policy
            </Link>

            <Link to="/terms" className="block hover:text-yellow-400">
              Terms & Conditions
            </Link>

            <Link to="/faq" className="block hover:text-yellow-400">
              FAQ
            </Link>

          </div>
        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <p className="flex items-center gap-2">
              <Mail size={18} />
              support@mbsgiveaways.com
            </p>

        <div className="flex gap-4 mt-6">
  <Globe className="cursor-pointer hover:text-yellow-400" />
  <Phone className="cursor-pointer hover:text-yellow-400" />
  <MapPin className="cursor-pointer hover:text-yellow-400" />
</div>

          </div>

        </div>

      </div>

      <div className="border-t border-green-800 text-center py-5 text-green-200">

        © {new Date().getFullYear()} Mohammed Bin Salman Giveaways.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;