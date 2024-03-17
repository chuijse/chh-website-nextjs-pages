import { useState } from "react";
//import "./_nav.scss";
import Link from "next/link";
import { withRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const anim = (variants, custom = null) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  };
};

function Nav({ router }) {
  const pathname = router.pathname;

  const [isContact, setContact] = useState(false);

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
            aria-label="Close button"
            className={`${pathname === "/contact" && "white-button"} ${
              pathname === "/contact" || pathname === "/about"
                ? "show"
                : "hidden"
            }`}
            //whileHover={{ color: ""}}
            //onClick={() => setContact(false)}
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="m21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
              />
            </svg>
          </button>
          <button
            className={`${
              pathname === "/contact" || pathname === "/about"
                ? "hidden"
                : "show"
            }`}
          >
            <Link href="/about">About</Link>
          </button>
        </div>
      </div>
      <div className="layout-div">
        <div className="top-buttons-root left">
          <button
            aria-label="back button"
            className={`${pathname === "/contact" ? "white-button" : null} ${
              pathname === "/contact" || pathname === "/about"
                ? "show"
                : "hidden"
            } `}
          >
            <Link href="/">Back_</Link>
          </button>
          <button
            className={`${
              pathname === "/contact" || pathname === "/about"
                ? "hidden"
                : "show"
            }`}
          >
            <Link href="/contact">Contact</Link>
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
