import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router";
import { Link, Await } from "react-router";
import { ArrowUpRight, ShoppingCart, Menu, X } from "lucide-react";


const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialLinks = [
  { icon: <InstagramIcon />, href: "#" },
  { icon: <LinkedinIcon />, href: "#" },
  { icon: <TwitterIcon />, href: "#" },
];

const navLinks = [
  { text: "Ingredients", href: "/#ingredients", rotate: "hover:-rotate-3" },
  { text: "Benefits", href: "/#benefits", rotate: "hover:-rotate-3" },
  { text: "Blogs", href: "/blogs", rotate: "hover:-rotate-3" },
  { text: "Reviews", href: "/#reviews", rotate: "hover:rotate-3" },
  { text: "FAQs", href: "/#faqs", rotate: "hover:rotate-3" },
];

const Navbar = ({ cart }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");

    // ensure scroll happens after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.5) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY && currentScroll > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed w-full z-9999 flex items-center justify-between ${scrolledPastHero ? "h-[15dvh] bg-(--color-primary)/20" : "h-[15dvh]"
          }  px-7 md:px-25 backdrop-blur-2xl  transition-all duration-400 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <div className="flex items-center gap-2 md:gap-4 lg:gap-1">
          <img onClick={handleLogoClick} src="/Logo.svg" alt="Daily Goli Logo" className="cursor-pointer h-10  lg:mr-2 " />

          {/* Social Media Links - hidden before lg */}
          <div className="hidden lg:flex items-center justify-center w-fit gap-1">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="h-10 w-10 rounded-full bg-(--white) flex items-center justify-center hover:-translate-y-4 hover:-rotate-3 transition-all duration-400 cursor-pointer hover:bg-(--color-primary) group"
              >
                <div className="text-(--color-primary) transition-colors group-hover:text-(--white)">
                  {item.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links - hidden before lg */}
        <ul className="hidden lg:flex gap-1 items-end">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex hover:-translate-y-4 ${item.rotate} transition-all duration-400 cursor-pointer group`}
              >
                <span className="h-10 w-fit px-4 text-(--white) rounded-full bg-(--color-primary) flex items-center justify-center font-lex-reg group-hover:text-(--color-primary) group-hover:bg-(--white) group-hover:border border-(--color-primary) transition-all duration-400 text-sm md:text-base">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons: Cart & Buy Now */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/cart" className="h-10 w-10 rounded-full bg-(--white) flex items-center justify-center hover:-translate-y-4 hover:-rotate-3 transition-all duration-400 cursor-pointer hover:bg-(--color-primary) group relative">
            <ShoppingCart size={20} className="text-(--color-primary) transition-colors group-hover:text-(--white)" />
            <Suspense fallback={null}>
              <Await resolve={cart}>
                {(cart) => {
                  if (!cart || cart.totalQuantity === 0) return null;
                  return (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center group-hover:text-(--color-primary) animate-bounce">
                      {cart.totalQuantity}
                    </span>
                  );
                }}
              </Await>
            </Suspense>
          </Link>

          <Link to="/buy-now" className="flex items-center justify-center w-fit group cursor-pointer no-underline">
            <div className="h-10 w-10 rounded-full bg-(--white) group-hover:bg-(--color-primary) group-hover:text-(--white) text-(--color-primary) flex items-center justify-center transition-transform duration-400 group-hover:translate-x-22.5">
              <ArrowUpRight />
            </div>
            <span className="h-10 w-fit flex items-center justify-center px-4 rounded-full bg-(--white) group-hover:bg-(--color-primary) group-hover:text-(--white) text-(--color-primary) font-lex-reg transition-all duration-400 group-hover:-translate-x-12.5 group-hover:-rotate-6">
              Buy Now
            </span>
          </Link>

          {/* Mobile Menu Button - visible only before lg */}
          <button
            className="lg:hidden h-10 w-10 min-w-10 flex items-center justify-center bg-(--color-primary) text-(--white) rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-(--white) z-[10000] flex flex-col items-center justify-center transition-all duration-500 origin-top transform ${isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}>
        <button
          className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center bg-(--color-primary) text-(--white) rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col items-center gap-8 mt-10">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-(--color-primary) text-3xl font-lex-reg hover:opacity-80 transition-opacity"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mt-16">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="h-14 w-14 rounded-full bg-(--color-primary) text-(--white) flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
