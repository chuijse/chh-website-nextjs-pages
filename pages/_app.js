import "@/styles/global.scss";
import Nav from "@/components/Nav";
import Transition from "@/components/Transition";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export default function App({ Component, pageProps, router }) {
  const [isFirstTime, setFirstTime] = useState(true);
  const [isTransition, setTransition] = useState(false);
  return (
    <div>
      <Nav isTransition={isTransition} />
      <AnimatePresence mode="wait">
        <Transition
          setTransition={setTransition}
          key={router.route}
          isFirstTime={isFirstTime}
          setFirstTime={setFirstTime}
          isTransition={isTransition}
        >
          <Component {...pageProps} />
        </Transition>
      </AnimatePresence>
    </div>
  );
}
