import { withRouter } from "next/router";
import { motion } from "framer-motion";

function Nav({ router, isTransition, onNavigate, onBack }) {
  const pathname = router.pathname;

  return (
    <section className="layout-root">
      <div className="layout-div">
        <motion.h1
          animate={{
            color: pathname === "/contact" ? "rgb(255,255,255)" : "rgb(0,0,0)",
          }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Cristian
          <br />
          Huijse
          <br />
          heise
        </motion.h1>
        <div className="top-buttons-root right">
          <button
            type="button"
            aria-label="Home button"
            className={`${pathname === "/contact" ? "white-button" : null} ${
              pathname === "/contact" || pathname === "/about"
                ? "show"
                : "hidden"
            } ${isTransition && "disabled"} `}
            onClick={() => onNavigate("/")}
          >
            Home
          </button>
          <button
            type="button"
            aria-label="About button"
            className={`${
              pathname === "/contact" || pathname === "/about"
                ? "hidden"
                : "show"
            } ${isTransition && "disabled"}`}
            onClick={() => onNavigate("/about")}
          >
            About
          </button>
        </div>
      </div>
      <div className="layout-div">
        <div className="top-buttons-root left">
          <button
            type="button"
            aria-label="back button"
            className={`${pathname === "/contact" && "white-button"} ${
              pathname === "/contact" ? "show" : "hidden"
            } ${isTransition && "disabled"}`}
            onClick={onBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6em"
              height="6em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6.921 12.5l5.792 5.792L12 19l-7-7l7-7l.713.708L6.921 11.5H19v1z"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Contact button"
            className={`${pathname === "/contact" ? "hidden" : "show"} ${
              isTransition && "disabled"
            }`}
            onClick={() => onNavigate("/contact")}
          >
            Contact
          </button>
        </div>
        <div
          className={`${
            pathname === "/contact" ? " scrolling-bar white" : "scrolling-bar"
          }`}
        />
      </div>
    </section>
  );
}

export default withRouter(Nav);
