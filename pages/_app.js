import "@/styles/global.scss";
import Nav from "@/components/Nav";
import dynamic from "next/dynamic";
import React, { useCallback, useRef, useState } from "react";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Roboto_Mono,
  Share_Tech,
  Share_Tech_Mono,
} from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-mono",
});

const shareTech = Share_Tech({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-tech",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-tech-mono",
});

const ThreeRouteTransition = dynamic(
  () => import("@/components/ThreeRouteTransition"),
  {
    ssr: false,
    loading: () => (
      <div className="three-route-transition intro loading visible">
        <p className="three-route-label intro">Bienvenido</p>
        <div className="intro-loader" aria-hidden="true">
          <span />
        </div>
      </div>
    ),
  }
);

const routes = {
  "/": "Inicio",
  "/about": "About",
  "/contact": "Contacto",
};

const TEXT_HOLD_DURATION = 320;

function getRouteLabel(url) {
  const pathname = url.split("?")[0].split("#")[0];
  return routes[pathname] ?? "Cristian Huijse";
}

export default function App({ Component, pageProps, router }) {
  const [isTransition, setTransition] = useState(true);
  const [routeTransition, setRouteTransition] = useState({
    phase: "intro",
    label: "Bienvenido",
  });
  const pendingNavigation = useRef(null);
  const holdTimer = useRef(null);

  const clearHoldTimer = useCallback(() => {
    if (!holdTimer.current) return;

    clearTimeout(holdTimer.current);
    holdTimer.current = null;
  }, []);

  const revealRoute = useCallback((url) => {
    setRouteTransition({
      phase: "reveal",
      label: getRouteLabel(url),
    });
  }, []);

  const transitionTo = useCallback(
    (url) => {
      if (isTransition || url === router.asPath) return;

      clearHoldTimer();
      pendingNavigation.current = { type: "push", url };
      setTransition(true);
      setRouteTransition({
        phase: "cover",
        label: getRouteLabel(url),
      });
    },
    [clearHoldTimer, isTransition, router.asPath]
  );

  const transitionBack = useCallback(() => {
    if (isTransition) return;

    clearHoldTimer();
    pendingNavigation.current = { type: "back" };
    setTransition(true);
    setRouteTransition({
      phase: "cover",
      label: "Inicio",
    });
  }, [clearHoldTimer, isTransition]);

  const handlePhaseComplete = useCallback(
    async (phase) => {
      if (phase === "intro") {
        clearHoldTimer();
        holdTimer.current = setTimeout(() => {
          setRouteTransition((current) => ({
            ...current,
            phase: "reveal",
          }));
          holdTimer.current = null;
        }, TEXT_HOLD_DURATION);
        return;
      }

      if (phase === "reveal") {
        pendingNavigation.current = null;
        setRouteTransition((current) => ({ ...current, phase: "idle" }));
        setTransition(false);
        return;
      }

      if (phase !== "cover" || !pendingNavigation.current) return;

      const navigation = pendingNavigation.current;

      clearHoldTimer();
      holdTimer.current = setTimeout(async () => {
        if (navigation.type === "push") {
          await router.push(navigation.url);
          revealRoute(navigation.url);
          holdTimer.current = null;
          return;
        }

        const revealAfterBack = (url) => {
          router.events.off("routeChangeComplete", revealAfterBack);
          revealRoute(url);
          holdTimer.current = null;
        };

        router.events.on("routeChangeComplete", revealAfterBack);
        router.back();
      }, TEXT_HOLD_DURATION);
    },
    [clearHoldTimer, router, revealRoute]
  );

  const handleRouteError = useCallback(() => {
    clearHoldTimer();
    pendingNavigation.current = null;
    setRouteTransition((current) => ({ ...current, phase: "idle" }));
    setTransition(false);
  }, [clearHoldTimer]);

  React.useEffect(() => {
    router.events.on("routeChangeError", handleRouteError);

    return () => {
      router.events.off("routeChangeError", handleRouteError);
      clearHoldTimer();
    };
  }, [router.events, handleRouteError, clearHoldTimer]);

  return (
    <div
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${robotoMono.variable} ${shareTech.variable} ${shareTechMono.variable}`}
    >
      <Nav
        isTransition={isTransition}
        onNavigate={transitionTo}
        onBack={transitionBack}
      />
      <Component {...pageProps} />
      <ThreeRouteTransition
        phase={routeTransition.phase}
        label={routeTransition.label}
        onPhaseComplete={handlePhaseComplete}
      />
    </div>
  );
}
