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
    <div
      className={
        isActive ? "aptitudes-item-root expand" : "aptitudes-item-root"
      }
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="aptitude-header">
        <h2 className={isActive ? "primary scaled" : null}>{main}</h2>
      </div>
      <div className="aptitude-divider">
        <Divider thick="light" />
      </div>
      <div
        className={
          isActive ? "categories-container open" : "categories-container close"
        }
      >
        <motion.p style={{ x }}>
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
      </div>
    </div>
  );
}
