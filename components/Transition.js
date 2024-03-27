import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const routes = {
  "/": "Incio",
  "/about": "About",
  "/contact": "Contacto",
};

const anim = (variants, custom = null) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  };
};

export default function Transition({
  children,
  isFirstTime,
  setFirstTime,
  setTransition,
  isTransition,
}) {
  const router = useRouter();
  const [transitionName, setTransitionName] = useState("Bienvenido");

  return (
    <motion.div
      className={`${isTransition && "disabled"} stairs`}
      //style={{ pointerEvents: isTransition ? "none" : "auto" }}
    >
      {/*<h1>{isFirstTime ? "true" : " false"}</h1>*/}
      <motion.div
        {...anim(isFirstTime ? opacity : opacity)}
        //{...anim(opacity)}
        className="transition-background"
        onAnimationComplete={() => {
          setFirstTime(false);
        }}
      />
      <motion.div
        {...anim(expandT)}
        className="transition-container"
        onAnimationStart={() => setTransition(true)}
        onAnimationComplete={() => setTransition(false)}
      />
      <motion.p
        className="route"
        {...anim(text)}
        onAnimationStart={() =>
          isFirstTime
            ? setTransitionName("Bienvenido")
            : setTransitionName(routes[router.route])
        }
      >
        {transitionName}
      </motion.p>
      {children}
    </motion.div>
  );
}

export const expandT = {
  initial: {
    //top: 0,
    clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
  },
  enter: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    transition: {
      duration: 0.7,
      delay: 0.05,
      ease: [0.76, 0, 0.24, 1],
    },
    transitionEnd: {
      //height: "0",
      //top: "0"
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    },
  },
  exit: {
    //height: "100vh",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    transition: {
      duration: 0.5,
      delay: 0.05,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const expand = {
  initial: {
    top: 0,
  },
  enter: {
    top: "100vh",
    transition: {
      duration: 0.5,
      delay: 0.05,
      ease: [0.76, 0, 0.24, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  },
  exit: {
    height: "100vh",
    transition: {
      duration: 0.5,
      delay: 0.05,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    //top: -100,
    transition: { duration: 0.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
    //transitionEnd: { top: "-47.5%" },
  },
  exit: {
    opacity: 1,
    //top: "-40%",
    transition: { duration: 0.2, delay: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacity = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};

const opacity1 = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};
