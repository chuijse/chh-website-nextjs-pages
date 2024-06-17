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

function Nav({ router, isTransition }) {
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
            aria-label="Home button"
            className={`${pathname === "/contact" ? "white-button" : null} ${
              pathname === "/contact" || pathname === "/about"
                ? "show"
                : "hidden"
            } ${isTransition && "disabled"} `}
          >
            <Link href="/">Home</Link>
          </button>
          <button
            aria-label="About button"
            className={`${
              pathname === "/contact" || pathname === "/about"
                ? "hidden"
                : "show"
            } ${isTransition && "disabled"}`}
          >
            <Link href="/about">About</Link>
          </button>
        </div>
      </div>
      <div className="layout-div">
        <div className="top-buttons-root left">
          <button
            aria-label="back button"
            className={`${pathname === "/contact" && "white-button"} ${
              pathname === "/contact" ? "show" : "hidden"
            } ${isTransition && "disabled"}`}
            //whileHover={{ color: ""}}
            //onClick={() => setContact(false)}
            onClick={() => router.back()}
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
            aria-label="Contact button"
            className={`${pathname === "/contact" ? "hidden" : "show"} ${
              isTransition && "disabled"
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
