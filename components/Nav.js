import { withRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const btnVariants = {
  initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 10 },
  animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", y: 0 },
  exit:    { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 10 },
};

const btnTransition = { duration: 0.35, ease: [0.33, 1, 0.68, 1], delay: 0.5 };

function Nav({ router, isTransition, onNavigate, onBack }) {
  const pathname = router.pathname;
  const isHome    = pathname === "/";
  const isContact = pathname === "/contact";
  const isAbout   = pathname === "/about";

  return (
    <section className="layout-root">
      <div className="layout-div">
        <motion.h1
          animate={{ color: isContact ? "rgb(255,255,255)" : "rgb(0,0,0)" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Cristian
          <br />
          Huijse
          <br />
          heise
        </motion.h1>

        <div className="top-buttons-root right">
          <AnimatePresence mode="wait">
            {isHome ? (
              <motion.button
                key="about"
                type="button"
                aria-label="About button"
                className={isTransition ? "disabled" : ""}
                variants={btnVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={btnTransition}
                onClick={() => onNavigate("/about")}
              >
                About
              </motion.button>
            ) : (
              <motion.button
                key="home"
                type="button"
                aria-label="Home button"
                className={`${isContact ? "white-button" : ""} ${isTransition ? "disabled" : ""}`}
                variants={btnVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={btnTransition}
                onClick={() => onNavigate("/")}
              >
                Home
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="layout-div">
        <div className="top-buttons-root left">
          <AnimatePresence mode="wait">
            {isContact ? (
              <motion.button
                key="back"
                type="button"
                aria-label="Back button"
                className={`white-button ${isTransition ? "disabled" : ""}`}
                variants={btnVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={btnTransition}
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
              </motion.button>
            ) : (
              <motion.button
                key="contact"
                type="button"
                aria-label="Contact button"
                className={isTransition ? "disabled" : ""}
                variants={btnVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={btnTransition}
                onClick={() => onNavigate("/contact")}
              >
                Contact
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className={isContact ? "scrolling-bar white" : "scrolling-bar"} />
      </div>
    </section>
  );
}

export default withRouter(Nav);
