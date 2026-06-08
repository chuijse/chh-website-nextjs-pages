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

const ParticleImage = dynamic(() => import("./ParticleImage"), {
  ssr: false,
});

const shapeByStrength = {
  Diseñador: "design",
  "Desarrollador de Software": "code",
  "Fabricación Digital": "printer",
  Docencia: "teaching",
};

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
              shape={shapeByStrength[strength.main]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Item({
  main,
  categories,
  baseVelocity = -5,
  shape,
}) {
  const [isHovered, setHovered] = useState(false);
  const [isParticleActive, setParticleActive] = useState(false);
  const isActive = isHovered;
  const pendingShapeActivation = useRef(false);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(1);

  const activateCurrentShape = () => {
    pendingShapeActivation.current = true;
  };

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 10000);
    moveBy += directionFactor.current * moveBy;
    if (baseX.get() >= -33.333) {
      baseX.set(baseX.get() + moveBy);
    } else {
      baseX.set(0);
    }
  });

  React.useEffect(
    () => () => {
      pendingShapeActivation.current = false;
    },
    []
  );

  return (
    <div
      className={
        isActive ? "aptitudes-item-root expand" : "aptitudes-item-root"
      }
      onMouseEnter={() => {
        setHovered(true);
        activateCurrentShape();
      }}
      onMouseLeave={() => {
        pendingShapeActivation.current = false;
        setHovered(false);
        setParticleActive(false);
      }}
      onClick={() => {
        if (isParticleActive) {
          pendingShapeActivation.current = false;
          setHovered(false);
          setParticleActive(false);
          return;
        }

        setHovered(true);
        activateCurrentShape();
      }}
    >
      <div className="aptitude-header aptitude-shape-slot">
        <h2
          className={isActive ? "primary scaled" : null}
          onTransitionEnd={(event) => {
            if (event.propertyName !== "font-size") return;
            if (!pendingShapeActivation.current) return;

            pendingShapeActivation.current = false;
            setParticleActive(true);
          }}
        >
          {main}
        </h2>
        {shape === "printer" && (
          <ParticleImage active={isParticleActive} shape={shape} />
        )}
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
