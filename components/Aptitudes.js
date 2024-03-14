import React, { useState, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { strengths } from "./Strengths";
import Divider from "../components/Divider";

export default function Aptitudes() {
  return (
    <section className="aptitudes-root">
      <div className="aptitudes-strengths">
        {strengths.map((strength) => (
          <div key={`Aptitud-${strength.main}`}>
            <Item
              main={strength.main}
              categories={strength.categories}
              baseVelocity={strength.baseVelocity}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Item({ main, categories, baseVelocity = -5, key }) {
  const [isActive, setActive] = useState(false);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 10000);
    moveBy += directionFactor.current * moveBy;
    if (baseX.get() >= -33.333) {
      baseX.set(baseX.get() + moveBy);
    } else {
      baseX.set(0);
    }
  });

  return (
    <motion.div
      className="aptitudes-item-root"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      initial={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
      animate={{
        marginTop: isActive ? "30px" : "10px",
        dmarginBottom: isActive ? "30px" : "10px",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="aptitude-divider">
        <motion.h3
          className={isActive ? "primary" : null}
          animate={{
            scale: isActive ? 1.4 : 1,
          }}
          transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
        >
          {main}
        </motion.h3>
      </div>
      <div className="aptitude-divider">
        <Divider size="light" />
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.p
            style={{ x }}
            initial={{
              clipPath: "inset(100% 0% 0% 0%)",
              y: "-20px",
              height: "0px",
              margin: "0px",
            }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              y: "0",
              height: "25px",
              margin: "10px",
            }}
            exit={{
              clipPath: "inset(100% 0% 0% 0%)",
              y: "-20px",
              height: "0px",
              margin: "0px",
            }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          >
            <span>
              {categories.map((categorie, i) =>
                i !== categories.length - 1
                  ? `${categorie} - `
                  : `${categorie} - `
              )}
              {categories.map((categorie, i) =>
                i !== categories.length - 1
                  ? `${categorie} - `
                  : `${categorie} - `
              )}
              {categories.map((categorie, i) =>
                i !== categories.length - 1
                  ? `${categorie} - `
                  : `${categorie} - `
              )}
            </span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
