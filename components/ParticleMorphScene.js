import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const POINT_COUNT = 5200;
const SHAPE_BY_APTITUDE = {
  "Diseñador": "sphere",
  "Desarrollador": "pyramid",
  "Fabricación Digital": "cube",
  "Docencia": "torus",
};

function randomFromIndex(index, salt = 0) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function sampleSphere(index, count) {
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * increment;

  return [
    Math.cos(angle) * radius * 1.35,
    y * 1.35,
    Math.sin(angle) * radius * 1.35,
  ];
}

function sampleBox(index) {
  const width = 2.25;
  const height = 1.72;
  const depth = 1.45;
  const face = Math.floor(randomFromIndex(index, 1) * 6);
  const u = randomFromIndex(index, 2) - 0.5;
  const v = randomFromIndex(index, 3) - 0.5;

  if (face === 0) return [width / 2, u * height, v * depth];
  if (face === 1) return [-width / 2, u * height, v * depth];
  if (face === 2) return [u * width, height / 2, v * depth];
  if (face === 3) return [u * width, -height / 2, v * depth];
  if (face === 4) return [u * width, v * height, depth / 2];
  return [u * width, v * height, -depth / 2];
}

function sampleCube(index) {
  const size = 2;
  const face = Math.floor(randomFromIndex(index, 13) * 6);
  const u = randomFromIndex(index, 14) - 0.5;
  const v = randomFromIndex(index, 15) - 0.5;

  if (face === 0) return [size / 2, u * size, v * size];
  if (face === 1) return [-size / 2, u * size, v * size];
  if (face === 2) return [u * size, size / 2, v * size];
  if (face === 3) return [u * size, -size / 2, v * size];
  if (face === 4) return [u * size, v * size, size / 2];
  return [u * size, v * size, -size / 2];
}

function samplePyramid(index) {
  const base = 2.35;
  const height = 1.95;
  const half = base / 2;
  const apex = [0, height / 2, 0];
  const corners = [
    [-half, -height / 2, -half],
    [half, -height / 2, -half],
    [half, -height / 2, half],
    [-half, -height / 2, half],
  ];
  const face = Math.floor(randomFromIndex(index, 4) * 5);
  const r1 = Math.sqrt(randomFromIndex(index, 5));
  const r2 = randomFromIndex(index, 6);

  if (face === 4) {
    return [
      (randomFromIndex(index, 7) - 0.5) * base,
      -height / 2,
      (randomFromIndex(index, 8) - 0.5) * base,
    ];
  }

  const a = apex;
  const b = corners[face];
  const c = corners[(face + 1) % corners.length];
  const oneMinusR1 = 1 - r1;

  return [
    oneMinusR1 * a[0] + r1 * (1 - r2) * b[0] + r1 * r2 * c[0],
    oneMinusR1 * a[1] + r1 * (1 - r2) * b[1] + r1 * r2 * c[1],
    oneMinusR1 * a[2] + r1 * (1 - r2) * b[2] + r1 * r2 * c[2],
  ];
}

function sampleTorus(index) {
  const majorRadius = 0.9;
  const minorRadius = 0.38;
  const u = randomFromIndex(index, 16) * Math.PI * 2;
  const v = randomFromIndex(index, 17) * Math.PI * 2;
  const tube = majorRadius + minorRadius * Math.cos(v);
  const tilt = Math.PI * 0.11;
  const x = tube * Math.cos(u);
  const y = tube * Math.sin(u);
  const z = minorRadius * Math.sin(v);

  return [
    x,
    y * Math.cos(tilt) - z * Math.sin(tilt),
    y * Math.sin(tilt) + z * Math.cos(tilt),
  ];
}

function buildShape(sample) {
  const positions = new Float32Array(POINT_COUNT * 3);

  for (let index = 0; index < POINT_COUNT; index += 1) {
    const [x, y, z] = sample(index, POINT_COUNT);
    const stride = index * 3;

    positions[stride] = x;
    positions[stride + 1] = y;
    positions[stride + 2] = z;
  }

  return positions;
}

function buildColors() {
  const colors = new Float32Array(POINT_COUNT * 3);
  const gray = new THREE.Color("#5f6159");
  const accent = new THREE.Color("#ff7f2a");

  for (let index = 0; index < POINT_COUNT; index += 1) {
    const color = randomFromIndex(index, 12) > 0.82 ? accent : gray;
    const stride = index * 3;

    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
  }

  return colors;
}

function ParticleMorphPoints({ activeAptitude }) {
  const points = useRef();
  const geometry = useRef();
  const currentPositions = useRef();
  const targetPositions = useRef();
  const activeShape = SHAPE_BY_APTITUDE[activeAptitude] ?? "box";

  const shapes = useMemo(
    () => ({
      sphere: buildShape(sampleSphere),
      box: buildShape(sampleBox),
      cube: buildShape(sampleCube),
      pyramid: buildShape(samplePyramid),
      torus: buildShape(sampleTorus),
    }),
    []
  );

  const colors = useMemo(() => buildColors(), []);

  const initialPositions = useMemo(() => new Float32Array(shapes.box), [shapes]);

  useEffect(() => {
    if (!currentPositions.current) {
      currentPositions.current = new Float32Array(shapes[activeShape]);
    }

    targetPositions.current = shapes[activeShape];
  }, [activeShape, shapes]);

  useFrame((state, delta) => {
    if (!geometry.current || !currentPositions.current || !targetPositions.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const positionAttribute = geometry.current.attributes.position;
    const positions = positionAttribute.array;
    const current = currentPositions.current;
    const target = targetPositions.current;
    const ease = Math.min(delta * 3.8, 0.14);

    for (let index = 0; index < current.length; index += 3) {
      current[index] += (target[index] - current[index]) * ease;
      current[index + 1] += (target[index + 1] - current[index + 1]) * ease;
      current[index + 2] += (target[index + 2] - current[index + 2]) * ease;

      const particle = index / 3;
      const drift = Math.sin(elapsed * 0.9 + particle * 0.021) * 0.016;

      positions[index] = current[index] + drift;
      positions[index + 1] = current[index + 1] + drift * 0.45;
      positions[index + 2] = current[index + 2];
    }

    positionAttribute.needsUpdate = true;

    if (points.current) {
      points.current.rotation.y += delta * 0.16;
      points.current.rotation.x = Math.sin(elapsed * 0.34) * 0.08;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.021}
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleMorphScene({ activeAptitude }) {
  return (
    <div className="particle-morph-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.15], fov: 46 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ParticleMorphPoints activeAptitude={activeAptitude} />
      </Canvas>
    </div>
  );
}
