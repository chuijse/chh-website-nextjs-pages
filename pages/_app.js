import "@/styles/global.scss";
import Nav from "@/components/Nav";
import Transition from "@/components/Transition";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  return (
    <div>
      <AnimatePresence mode="wait">
        <Transition key={router.route}>
          <Nav />
          <Component {...pageProps} />
        </Transition>
      </AnimatePresence>
    </div>
  );
}
