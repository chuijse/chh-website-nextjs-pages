import { useState } from "react";
//import "./_nav.scss";
import Link from "next/link";
import { withRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

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
          transition={{ duration: 0.5 }}
        >
          Cristian
          <br />
          Huijse
          <br />
          heise
        </motion.h1>
        {isContact ? (
          <button onClick={() => setContact(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="m21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => null(/*setContact(true)*/)}>About</button>
        )}
      </div>
      <div className="layout-div">
        <AnimatePresence>
          {pathname === "/contact" ? (
            <motion.button
              initial={{ opacity: 0, color: "rgb(255,255,255)" }}
              animate={{ opacity: 1, color: "rgb(255,255,255)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Link href="/">Back_</Link>
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, color: "rgb(0,0,0)" }}
              animate={{ opacity: 1, color: "rgb(0,0,0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/contact">Contact</Link>
            </motion.button>
          )}
        </AnimatePresence>
        <motion.div
          animate={{ borderColor: isContact ? "white" : "black" }}
          className="scrolling-bar"
        />
      </div>
    </section>
  );
}

export default withRouter(Nav);
