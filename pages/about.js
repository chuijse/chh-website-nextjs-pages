import React, { useState, useRef } from "react";
import Divider from "@/components/Divider";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import myImage from "../public/static/images/me5.jpg";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function About({ baseVelocity = -20 }) {
  const [isTextHover, setTextHover] = useState(false);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 10000);
    moveBy += directionFactor.current * moveBy;
    if (baseX.get() >= -50) {
      baseX.set(baseX.get() + moveBy);
    } else {
      baseX.set(0);
    }
  });

  return (
    <>
      <Head>
        <title>CHH | About</title>
        <meta
          name="description"
          content="Cristian Huijse, Diseñador y Desarrollador"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="about-page-root">
        <section className="about-intro">
          <div className="information">
            <div className="head">
              <h1>Biografía</h1>
              <Divider thick="strong" size="short" color="primary" />
              <h2 className="horizontal_text">{"Diseñador & Desarrollador"}</h2>
            </div>
            <p
              //onWheel={()=> setTtextHover(true)}
              onMouseEnter={() => setTextHover(true)}
              onMouseLeave={() => setTextHover(false)}
            >
              <span className={isTextHover && "text-span"}>
                Desde muy joven, he estado vinculado a la tecnología gracias al
                entusiasmo que mi madre me heredó.
              </span>{" "}
              Mientras estudiaba diseño, me aventuré en el mundo de la
              programación de manera autodidacta, lo que despertó en mí una gran
              pasión por la interacción digital como herramienta para expandir
              nuestra realidad. Actualmente, el desarrollo de software es un
              componente esencial en mis proyectos profesionales y docentes.
            </p>
            <button>
              <a download={true} href="static/docs/CV.pdf">
                CV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.25 20.5a.75.75 0 1 1 0 1.5l-13 .005a.75.75 0 1 1 0-1.5zM11.648 2.014l.102-.007a.75.75 0 0 1 .743.648l.007.102l-.001 13.685l3.722-3.72a.75.75 0 0 1 .976-.073l.085.073a.75.75 0 0 1 .072.976l-.073.084l-4.997 4.997a.75.75 0 0 1-.976.073l-.085-.073l-5.003-4.996a.75.75 0 0 1 .976-1.134l.084.072l3.719 3.714L11 2.756a.75.75 0 0 1 .648-.743l.102-.007z"
                  />
                </svg>
              </a>
            </button>
            <button>
              <a download={true} href="static/docs/portafolio.pdf">
                Portafolio
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.25 20.5a.75.75 0 1 1 0 1.5l-13 .005a.75.75 0 1 1 0-1.5zM11.648 2.014l.102-.007a.75.75 0 0 1 .743.648l.007.102l-.001 13.685l3.722-3.72a.75.75 0 0 1 .976-.073l.085.073a.75.75 0 0 1 .072.976l-.073.084l-4.997 4.997a.75.75 0 0 1-.976.073l-.085-.073l-5.003-4.996a.75.75 0 0 1 .976-1.134l.084.072l3.719 3.714L11 2.756a.75.75 0 0 1 .648-.743l.102-.007z"
                  />
                </svg>
              </a>
            </button>
          </div>
          <div className="my-image">
            <Image
              fill
              className="image"
              src={myImage}
              alt="cristian huijse portrait"
            ></Image>
          </div>
        </section>
      </main>
    </>
  );
}
