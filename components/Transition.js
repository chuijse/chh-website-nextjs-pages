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

export default function Transition({ children }) {
  const router = useRouter();
  return (
    <motion.div className="stairs">
      <motion.div {...anim(opacity)} className="transition-background" />
      <motion.div {...anim(expand)} className="transition-container" />
      <motion.p className="route" {...anim(text)}>
        {routes[router.route]}
      </motion.p>
      {children}
    </motion.div>
  );
}

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
