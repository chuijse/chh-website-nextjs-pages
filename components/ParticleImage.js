import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const PARTICLES_DESKTOP = 1200;
const PARTICLES_MOBILE = 620;
const MASK_SAMPLE_SIZE = 220;
const MASKS = {
  printer: "/static/images/particle-masks/digital-fabrication-printer.svg",
};

function createRandom(seed) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function sampleImageMask(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve([]);
      return;
    }

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });

      canvas.width = MASK_SAMPLE_SIZE;
      canvas.height = MASK_SAMPLE_SIZE;
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const points = [];

      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const offset = (y * canvas.width + x) * 4;
          const alpha = pixels[offset + 3] / 255;
          const luminance =
            pixels[offset] * 0.2126 +
            pixels[offset + 1] * 0.7152 +
            pixels[offset + 2] * 0.0722;

          if (alpha > 0.35 && luminance > 110) {
            points.push([
              x / canvas.width - 0.5,
              0.5 - y / canvas.height,
              0,
            ]);
          }
        }
      }

      resolve(points);
    };

    image.onerror = () => resolve([]);
    image.src = src;
  });
}

function getMaskPoint(maskPoints, index, total) {
  if (!maskPoints.length) return [0, 0, 0];

  return maskPoints[
    Math.floor((index / Math.max(total - 1, 1)) * (maskPoints.length - 1))
  ];
}

function getExpandedMaskPoint(point, index, scale, random) {
  const baseX = point[0] * scale;
  const baseY = point[1] * scale;
  const length = Math.hypot(baseX, baseY) || 1;
  const angle = Math.atan2(baseY, baseX) + (random() - 0.5) * 0.38;
  const spread = scale * (0.26 + (index % 7) * 0.018 + random() * 0.08);

  return [
    baseX + Math.cos(angle) * spread * (0.72 + Math.abs(baseX / length) * 0.18),
    baseY + Math.sin(angle) * spread * (0.72 + Math.abs(baseY / length) * 0.18),
    (random() - 0.5) * 0.18,
  ];
}

function ParticleField({ active, shape }) {
  const points = useRef();
  const material = useRef();
  const targetPositions = useRef();
  const particleState = useRef();
  const previousActive = useRef(false);
  const transitionStart = useRef(0);
  const visibleOpacity = useRef(0);
  const [maskPoints, setMaskPoints] = useState([]);
  const { viewport, size } = useThree();
  const particleCount = size.width < 768 ? PARTICLES_MOBILE : PARTICLES_DESKTOP;

  const { positions, colors } = useMemo(() => {
    const random = createRandom(140);
    const positionArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;

      positionArray[offset] = (random() - 0.5) * viewport.width;
      positionArray[offset + 1] = (random() - 0.5) * viewport.height;
      positionArray[offset + 2] = (random() - 0.5) * 0.4;

      color.set(index % 5 === 0 ? "#ff7f2a" : "#111111");
      colorArray[offset] = color.r;
      colorArray[offset + 1] = color.g;
      colorArray[offset + 2] = color.b;
    }

    return { positions: positionArray, colors: colorArray };
  }, [particleCount, viewport.height, viewport.width]);

  useEffect(() => {
    let isMounted = true;

    sampleImageMask(MASKS[shape]).then((pointsFromMask) => {
      if (isMounted) setMaskPoints(pointsFromMask);
    });

    return () => {
      isMounted = false;
    };
  }, [shape]);

  useEffect(() => {
    const random = createRandom(521);
    const state = {
      ease: new Float32Array(particleCount),
      wander: new Float32Array(particleCount),
    };

    for (let index = 0; index < particleCount; index += 1) {
      state.ease[index] = 0.032 + random() * 0.028;
      state.wander[index] = random() * Math.PI * 2;
    }

    particleState.current = state;
  }, [particleCount]);

  useEffect(() => {
    const spreadRandom = createRandom(812);
    const nextTargets = new Float32Array(particleCount * 3);
    const scale = Math.min(viewport.width * 1.28, viewport.height * 1.28);
    const currentPositions = points.current?.geometry.attributes.position.array;
    const isEntering = active && !previousActive.current;
    const isLeaving = !active && previousActive.current;

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      const point = getMaskPoint(maskPoints, index, particleCount);
      const expandedPoint = getExpandedMaskPoint(
        point,
        index,
        scale,
        spreadRandom
      );

      nextTargets[offset] = active ? point[0] * scale : expandedPoint[0];
      nextTargets[offset + 1] = active ? point[1] * scale : expandedPoint[1];
      nextTargets[offset + 2] = active ? point[2] : expandedPoint[2];

      if (isEntering && currentPositions) {
        currentPositions[offset] = expandedPoint[0];
        currentPositions[offset + 1] = expandedPoint[1];
        currentPositions[offset + 2] = expandedPoint[2];
      }
    }

    targetPositions.current = nextTargets;
    previousActive.current = active;
    transitionStart.current = performance.now();

    if (isEntering) {
      visibleOpacity.current = 0;
      if (material.current) material.current.opacity = 0;
      if (points.current) points.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [active, maskPoints, particleCount, viewport]);

  useFrame(({ clock }, delta) => {
    if (!points.current || !targetPositions.current || !particleState.current) return;

    const elapsed = clock.elapsedTime;
    const state = particleState.current;
    const currentPositions = points.current.geometry.attributes.position.array;
    const targets = targetPositions.current;
    const motionScale = Math.min(delta * 60, 1.6);
    const transitionProgress = Math.min(
      (performance.now() - transitionStart.current) / (active ? 680 : 460),
      1
    );
    const transitionCurve = 0.32 + transitionProgress * transitionProgress * 1.35;

    visibleOpacity.current +=
      ((active ? 0.9 : 0) - visibleOpacity.current) *
      (active ? 0.02 + transitionProgress * 0.045 : 0.044 + transitionProgress * 0.07);

    if (material.current) material.current.opacity = visibleOpacity.current;

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      const wander =
        Math.sin(elapsed * 0.9 + state.wander[index]) * 0.0018 +
        Math.cos(elapsed * 0.54 + index * 0.021) * 0.0014;
      const easing =
        state.ease[index] *
        (active ? 1 : 0.78) *
        transitionCurve *
        motionScale;

      currentPositions[offset] +=
        (targets[offset] + wander - currentPositions[offset]) * easing;
      currentPositions[offset + 1] +=
        (targets[offset + 1] + wander * 0.6 - currentPositions[offset + 1]) *
        easing;
      currentPositions[offset + 2] +=
        (targets[offset + 2] - currentPositions[offset + 2]) * easing;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        size={size.width < 768 ? 0.044 : 0.036}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleImage({ active, shape }) {
  return (
    <div className="aptitude-particle-image" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 48 }} dpr={[1, 1.5]}>
        <ParticleField active={active} shape={shape} />
      </Canvas>
    </div>
  );
}
