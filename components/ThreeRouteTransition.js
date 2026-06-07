import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const COVER_DURATION = 0.95;
const REVEAL_DURATION = 0.95;
const INTRO_DURATION = 1.05;
const ROWS = 6;
const WAVE_SPREAD = 0.42;
const BAR_DURATION = 0.42;
const BAR_OVERLAP = 0.04;

const matrix = new THREE.Matrix4();
const color = new THREE.Color("#ff7f2a");

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInCubic(value) {
  return value * value * value;
}

function clamp01(value) {
  return Math.min(Math.max(value, 0), 1);
}

function getBarProgress(globalProgress, bar, revealMode) {
  const localProgress = clamp01((globalProgress - bar.delay) / BAR_DURATION);
  return revealMode
    ? 1 - easeInCubic(localProgress)
    : easeOutCubic(localProgress);
}

function StripeCurtain({ phase, onPhaseComplete }) {
  const bars = useRef();
  const progress = useRef(0);
  const hasCompleted = useRef(false);
  const animation = useRef({
    elapsed: 0,
    duration: COVER_DURATION,
  });
  const { viewport } = useThree();

  const barData = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, row) => ({
        row,
        delay: (row / Math.max(ROWS - 1, 1)) * WAVE_SPREAD,
      })),
    []
  );

  useEffect(() => {
    hasCompleted.current = false;

    if (phase === "idle") {
      progress.current = 0;
      hasCompleted.current = true;
      if (bars.current) bars.current.visible = false;
      return;
    }

    progress.current = 0;
    animation.current = {
      elapsed: 0,
      duration:
        phase === "cover"
          ? COVER_DURATION
          : phase === "intro"
            ? INTRO_DURATION
            : REVEAL_DURATION,
    };
  }, [phase]);

  useFrame((_, delta) => {
    if (!bars.current) return;

    if (phase === "idle") {
      bars.current.visible = false;
      return;
    }

    bars.current.visible = true;

    const currentAnimation = animation.current;
    currentAnimation.elapsed = Math.min(
      currentAnimation.elapsed + delta,
      currentAnimation.duration
    );

    progress.current = currentAnimation.elapsed / currentAnimation.duration;

    const revealMode = phase === "reveal";
    const barHeight = viewport.height / ROWS;
    const fullBarHeight = barHeight * (1 + BAR_OVERLAP);

    for (let index = 0; index < barData.length; index += 1) {
      const bar = barData[index];
      const barProgress = getBarProgress(progress.current, bar, revealMode);
      const y = viewport.height / 2 - barHeight * (bar.row + 0.5);
      const width = Math.max(barProgress, 0.001) * viewport.width;
      const x = revealMode
        ? viewport.width / 2 - width / 2
        : -viewport.width / 2 + width / 2;

      matrix.compose(
        new THREE.Vector3(x, y, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(width, fullBarHeight, 1)
      );

      bars.current.setMatrixAt(index, matrix);
    }

    bars.current.instanceMatrix.needsUpdate = true;

    if (
      currentAnimation.elapsed >= currentAnimation.duration &&
      !hasCompleted.current
    ) {
      hasCompleted.current = true;
      onPhaseComplete?.(phase);
    }
  });

  return (
    <instancedMesh ref={bars} args={[null, null, ROWS]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

export default function ThreeRouteTransition({ phase, label, onPhaseComplete }) {
  const isVisible = phase !== "idle";

  return (
    <div
      className={`three-route-transition ${phase} ${
        isVisible ? "visible" : "hidden"
      }`}
      aria-hidden={!isVisible}
    >
      <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <StripeCurtain phase={phase} onPhaseComplete={onPhaseComplete} />
      </Canvas>
      <p className={`three-route-label ${phase}`}>{label}</p>
    </div>
  );
}
