import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { strengths } from "./Strengths";
import Divider from "../components/Divider";

const ParticleMorphScene = dynamic(() => import("./ParticleMorphScene"), {
  ssr: false,
});

export default function Aptitudes() {
  const [activeAptitude, setActiveAptitude] = useState(strengths[0].main);

  return (
    <section className="aptitudes-root">
      <ParticleMorphScene activeAptitude={activeAptitude} />
      <div className="aptitudes-strengths">
        {strengths.map((strength) => (
          <div key={`Aptitud-${strength.main}`}>
            <Item
              main={strength.main}
              categories={strength.categories}
              baseVelocity={strength.baseVelocity}
              isActive={activeAptitude === strength.main}
              onActivate={() => setActiveAptitude(strength.main)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Item({ main, categories, baseVelocity = -5, isActive, onActivate }) {
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
      onMouseEnter={onActivate}
      onClick={onActivate}
      onFocus={onActivate}
      tabIndex={0}
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
