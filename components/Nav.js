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
        {pathname === "/contact" ? (
          <motion.button
            //whileHover={{ color: ""}}
            onClick={() => setContact(false)}
          >
            <Link href="/">
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
            </Link>
          </motion.button>
        ) : (
          <button onClick={() => null(/*setContact(true)*/)}>About</button>
        )}
      </div>
      <div className="layout-div">
        <AnimatePresence mode="wait">
          {pathname === "/contact" && (
            <motion.button
              {...anim(button)}
              className="white-button"
              key={"back-button"}
            >
              <Link href="/">Back_</Link>
            </motion.button>
          )}

          {pathname !== "/contact" && (
            <motion.button {...anim(button)} key={"contact-button"}>
              <Link href="/contact">Contact</Link>
            </motion.button>
          )}
        </AnimatePresence>
        <motion.div
          className="scrolling-bar"
          animate={{
            borderColor:
              pathname === "/contact" ? "rgb(255,255,255)" : "rgb(0,0,0)",
            transition: { delay: 0.4 },
          }}
        />
      </div>
    </section>
  );
}

const button = {
  initial: {
    clipPath: "inset(0% 100% 100% 0%)",
    y: "100%",
  },
  enter: {
    clipPath: "inset(0% 0% 0% 0%)",
    y: "0%",
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
    transition: {
      duration: 0.5,
      delay: 0.05,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default withRouter(Nav);
