import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Lenis smooth scroll with ScrollTrigger proxy
 * @returns {Lenis} Lenis instance
 */
export const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Expose globally for external access
  window.lenis = lenis;
  window.__lenis = lenis;

  // Tie Lenis to GSAP's RAF
  gsap.ticker.add((t) => {
    lenis.raf(t * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);

  // Notify ScrollTrigger on scroll
  lenis.on("scroll", ScrollTrigger.update);

  // ScrollTrigger proxy - CRITICAL for proper integration
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    fixedMarkers: true,
  });

  // Update Lenis on ScrollTrigger refresh
  ScrollTrigger.addEventListener("refresh", () => {
    lenis.resize();
  });

  // Initial measure
  ScrollTrigger.refresh();

  return lenis;
};

/**
 * Destroy Lenis instance and cleanup
 * @param {Lenis} lenis - Lenis instance to destroy
 */
export const destroyLenis = (lenis) => {
  if (lenis) {
    lenis.destroy();
  }
};

export { gsap, ScrollTrigger };
