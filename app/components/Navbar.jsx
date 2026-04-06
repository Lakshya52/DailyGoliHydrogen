import { useState, useEffect, Suspense } from "react";
import { Link, Await } from "react-router";
import { ArrowUpRight, ShoppingCart } from "lucide-react";

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
  { text: "Reviews", href: "/#reviews", rotate: "hover:rotate-3" },
  { text: "FAQs", href: "/#faqs", rotate: "hover:rotate-3" },
];

const Navbar = ({ cart }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

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
        className={`fixed w-full z-[9999] flex items-center justify-between ${scrolledPastHero ? "h-[10dvh] bg-(--color-primary)/20" : "h-[15dvh]"
          }  px-[100px] backdrop-blur-2xl  transition-all duration-400 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        {/* social media links */}
        <div className="flex items-center justify-center w-fit gap-1">
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

        {/* navigation links */}
        <ul className="flex gap-1 items-end">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex hover:-translate-y-4 ${item.rotate} transition-all duration-400 cursor-pointer group`}
              >
                <span className="h-10 w-fit px-4 text-(--white) rounded-full bg-(--color-primary) flex items-center justify-center font-lex-reg group-hover:text-(--color-primary) group-hover:bg-(--white) group-hover:border border-(--color-primary) transition-all duration-400">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons: Cart & Buy Now */}
        <div className="flex items-center gap-4">
          {/* Cart Icon with Badge */}
          {/* <Link to="/cart" className="relative h-12 w-12 rounded-full bg-(--white) text-(--color-primary) flex items-center justify-center border border-(--color-primary) hover:bg-(--color-primary) hover:text-(--white) transition-all"> */}
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

          {/* Buy Now CTA */}
          <Link to="/#product" className="flex items-center justify-center w-fit group cursor-pointer no-underline">
            <div className="h-10 w-10 rounded-full bg-(--white) group-hover:bg-(--color-primary) group-hover:text-(--white) text-(--color-primary) flex items-center justify-center transition-transform duration-[400ms] group-hover:translate-x-[90px]">
              <ArrowUpRight />
            </div>
            <span className="h-10 w-fit flex items-center justify-center px-4 rounded-full bg-(--white) group-hover:bg-(--color-primary) group-hover:text-(--white) text-(--color-primary) font-lex-reg transition-all duration-[400ms] group-hover:-translate-x-[50px] group-hover:-rotate-6">
              Buy Now
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
