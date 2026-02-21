import { gsap, ScrollTrigger } from "./gsapInit";

export function initMusicStack(section, stId) {
  const root = section?.querySelector(".root");
  if (!section || !root) return;

  let _selectionMode = false;
  let _scrollToIndexAndActivate = null;
  let _clearSelection = null;
  let _slides = [];

  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)",
    },
    (ctx) => {
      const { isMobile } = ctx.conditions;

      // ── camera / stack knobs ──
      const camTiltDeg = -35;
      const zGapVW = isMobile ? 16 : 10;
      const focusZVW = 20;
      const startAtLast = true;
      const screensPerCard = 0.5;
      const endRunwayScreens = 1.0;
      const yStartVH = -6;
      const yEndVH = 0;
      const pushBackVW = -15;
      const rotStartDeg = -20;
      const rotEndDeg = 0;

      // ── selection knobs ──
      const frontPushVW = 12;
      const behindPushVW = 12;
      const activeLiftVH = isMobile ? -10 : -10;
      const frontMarginVH = isMobile ? 30 : 20;
      const behindMarginVH = isMobile ? -30 : -60;
      const selEase = "power2.inOut";

      // ── scroll-to-index knobs ──
      const snapDur = 0.9;
      const snapEase = "power3.out";
      const snapProgressNudge = -0.015;
      const snapTolerancePx = 2;
      const earlyStartPx = 18;
      const velThreshold = 0.03;
      const overlapStartAt = 0.4;
      const overlapMinMs = 120;
      const liftWhileMovingThreshold = 24;

      const vwZ = (v) => `${v}vw`;

      const slides = gsap.utils.toArray(
        section.querySelectorAll(".music-single")
      );
      const total = slides.length;
      if (!total) return;

      _slides = slides;

      // Perspective calibration: match camera start Z
      const maxDepthVWCalc = (total - 1) * zGapVW;
      const cameraStartZ = focusZVW + maxDepthVWCalc;
      section.style.perspective = `${cameraStartZ}vw`;

      slides.forEach((el, i) => {
        const baseZ = -i * zGapVW;
        el.dataset.zvw = baseZ;
        gsap.set(el, {
          position: "absolute",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          z: vwZ(baseZ),
          rotateX: 0,
          transformOrigin: "50% 50%",
          willChange: "transform",
          marginTop: "0vh",
          force3D: true,
        });
      });

      // ── Camera rig ──
      const camera = { z: 0, yvh: yStartVH };
      const applyCamera = () => {
        root.style.transform = `translateY(${camera.yvh}vh) rotateX(${camTiltDeg}deg) translateZ(${camera.z}vw)`;
      };
      gsap.set(root, { transformStyle: "preserve-3d" });

      const maxDepthVW = (total - 1) * zGapVW;
      const mainScreens = Math.max(0.0001, total * screensPerCard);
      const totalScreens = mainScreens + endRunwayScreens;

      camera.z = focusZVW + (startAtLast ? maxDepthVW : 0);
      camera.yvh = yStartVH;
      applyCamera();

      // ── Card rotation from screen position ──
      let selectionMode = false;
      function updateCardRotations() {
        if (selectionMode) return;
        const vh = window.innerHeight;
        const centerY = vh * 0.5;
        const bottomY = vh;
        const denom = Math.max(1, bottomY - centerY);

        slides.forEach((slide) => {
          const top = slide.getBoundingClientRect().top;
          const prog = gsap.utils.clamp(0, 1, (bottomY - top) / denom);
          const rot = gsap.utils.interpolate(rotStartDeg, rotEndDeg, prog);
          gsap.set(slide, { rotateX: rot });
        });
      }

      // ── Master scroll driver ──
      const masterST = ScrollTrigger.create({
        id: stId,
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * totalScreens}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate(self) {
          const pScreens = self.progress * totalScreens;
          if (pScreens <= mainScreens) {
            const phaseProg = pScreens / mainScreens;
            const depthVW = (1 - phaseProg) * maxDepthVW;
            camera.z = focusZVW + depthVW;
            camera.yvh = gsap.utils.interpolate(yStartVH, yEndVH, 0);
          } else {
            const tailT = Math.min(
              1,
              (pScreens - mainScreens) / Math.max(0.0001, endRunwayScreens)
            );
            camera.z = focusZVW + pushBackVW * tailT;
            camera.yvh = gsap.utils.interpolate(yStartVH, yEndVH, tailT);
          }
          applyCamera();
          updateCardRotations();
        },
        onRefresh() {
          camera.z = focusZVW + (startAtLast ? maxDepthVW : 0);
          camera.yvh = yStartVH;
          applyCamera();
          updateCardRotations();
        },
      });

      // ── Programmatic snap-to-index using Lenis ──
      function scrollToIndex(i, { onEarly, onDone } = {}) {
        const lenis = window.__lenis;
        i = Math.max(0, Math.min(total - 1, i));

        // Calculate the scroll Y that centers this card index
        const phaseProgBase = total > 1 ? 1 - i / (total - 1) : 0;
        let pScreens = phaseProgBase * mainScreens;
        pScreens = gsap.utils.clamp(
          0,
          totalScreens,
          pScreens + snapProgressNudge * totalScreens
        );

        const overallProgress = pScreens / totalScreens;
        const stStart = masterST.start;
        const stEnd = masterST.end;
        const targetY = stStart + (stEnd - stStart) * overallProgress;

        let firedEarly = false;
        let finished = false;
        const startTs = performance.now();

        const fireEarly = (payload) => {
          if (!firedEarly) {
            firedEarly = true;
            if (typeof onEarly === "function") onEarly(payload || {});
          }
        };
        const cleanup = () => {
          if (lenis && typeof lenis.off === "function") {
            try {
              lenis.off("scroll", onLenisScroll);
            } catch (_) {} // eslint-disable-line no-unused-vars
          }
          gsap.ticker.remove(tickPoll);
          gsap.ticker.remove(timerTick);
        };
        const fireDone = () => {
          if (!finished) {
            finished = true;
            cleanup();
            if (typeof onDone === "function") onDone();
          }
        };

        function onLenisScroll(e) {
          const curr =
            e?.scroll ??
            (window.pageYOffset || document.documentElement.scrollTop || 0);
          const vel = Math.abs(e?.velocity ?? 0);
          const distPx = Math.abs(curr - targetY);
          if (
            distPx <= snapTolerancePx ||
            (distPx <= earlyStartPx && vel < velThreshold)
          ) {
            fireEarly({ distPx, velocity: vel });
          }
        }
        function timerTick() {
          const elapsed = performance.now() - startTs;
          if (
            elapsed >=
            Math.max(overlapMinMs, overlapStartAt * snapDur * 1000)
          ) {
            fireEarly({ distPx: Infinity, velocity: 0 });
          }
        }
        function tickPoll() {
          const curr = window.scrollY || window.pageYOffset || 0;
          const distPx = Math.abs(curr - targetY);
          if (distPx <= snapTolerancePx)
            fireEarly({ distPx, velocity: 0 });
        }

        if (lenis && typeof lenis.on === "function")
          lenis.on("scroll", onLenisScroll);
        gsap.ticker.add(timerTick);
        gsap.ticker.add(tickPoll);

        // Trigger the smooth scroll via Lenis or GSAP fallback
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(targetY, {
            duration: snapDur,
            easing: gsap.parseEase ? gsap.parseEase(snapEase) : undefined,
            lock: true,
            immediate: false,
          });
        } else {
          const fromY =
            window.pageYOffset || document.documentElement.scrollTop || 0;
          gsap.to(
            { y: fromY },
            {
              y: targetY,
              duration: snapDur,
              ease: snapEase,
              onUpdate() {
                window.scrollTo(0, this.targets()[0].y);
              },
            }
          );
        }

        gsap.delayedCall(snapDur + 0.05, fireDone);
      }

      // ── Selection: lift active card, push others ──
      let activeIndex = null;

      function activateSlide(i) {
        selectionMode = true;
        _selectionMode = true;
        activeIndex = i;

        document.documentElement.style.overflow = "hidden";

        slides.forEach((el, idx) => {
          el.classList.remove("is-active", "is-front", "is-behind");
          if (idx < i) el.classList.add("is-front");
          else if (idx > i) el.classList.add("is-behind");
          else el.classList.add("is-active");
        });

        const activeEl = slides[i];
        const activeZ = parseFloat(activeEl.dataset.zvw);
        gsap.killTweensOf(slides);

        const tl = gsap.timeline();

        // Desktop: shift active card to the left half (25% of viewport)
        // Mobile: keep centered, just lift
        const activeProps = {
          marginTop: `${activeLiftVH}vh`,
          duration: 0.6,
          ease: selEase,
        };
        if (!isMobile) {
          activeProps.left = "28%";
        }
        tl.to(activeEl, activeProps);

        tl.to(
          activeEl,
          {
            rotateX: Math.abs(camTiltDeg),
            z: vwZ(activeZ),
            duration: 0.7,
            ease: selEase,
            force3D: true,
          },
          0.1
        );

        slides.forEach((el, idx) => {
          if (idx >= i) return;
          const baseZ = parseFloat(el.dataset.zvw);
          tl.to(
            el,
            {
              z: vwZ(baseZ + frontPushVW),
              marginTop: `${frontMarginVH}vh`,
              rotateX: -5,
              duration: 1,
              ease: selEase,
              force3D: true,
            },
            0.1
          );
        });

        slides.forEach((el, idx) => {
          if (idx <= i) return;
          const baseZ = parseFloat(el.dataset.zvw);
          tl.to(
            el,
            {
              z: vwZ(baseZ - behindPushVW),
              marginTop: `${behindMarginVH}vh`,
              rotateX: -10,
              duration: 1,
              ease: selEase,
              force3D: true,
            },
            0.1
          );
        });
      }

      function resetSlides() {
        selectionMode = false;
        _selectionMode = false;
        activeIndex = null;

        document.documentElement.style.overflow = "";
        slides.forEach((el) => {
          el.classList.remove("is-active", "is-front", "is-behind");
          gsap.to(el, {
            left: "50%",
            marginTop: "0vh",
            z: vwZ(parseFloat(el.dataset.zvw)),
            rotateX: 0,
            duration: 0.75,
            ease: "power2.inOut",
          });
        });
      }

      function clearSelection() {
        if (!selectionMode) return;
        resetSlides();
      }

      // ── Combined: scroll to card, then activate ──
      function scrollToIndexAndActivate(idx, onActivated) {
        if (activeIndex === idx && selectionMode) return;
        if (selectionMode) clearSelection();

        let started = false;
        scrollToIndex(idx, {
          onEarly: ({ distPx }) => {
            if (distPx <= liftWhileMovingThreshold && !started) {
              started = true;
              activateSlide(idx);
              if (typeof onActivated === "function") onActivated();
            }
          },
          onDone: () => {
            if (!started) {
              started = true;
              activateSlide(idx);
              if (typeof onActivated === "function") onActivated();
            }
          },
        });
      }

      _scrollToIndexAndActivate = scrollToIndexAndActivate;
      _clearSelection = clearSelection;

      const onResize = () => {
        ScrollTrigger.refresh();
        updateCardRotations();
      };
      window.addEventListener("resize", onResize);

      ctx.add(() => {
        window.removeEventListener("resize", onResize);
      });

      return { masterST };
    }
  );

  return {
    cleanup: () => {
      mm.revert();
      ScrollTrigger.getById(stId)?.kill();
    },
    selectSlide: (el, onActivated) => {
      const lenis = window.__lenis;
      // Ensure Lenis is running (needed for scrollToIndex)
      if (lenis && typeof lenis.start === "function") lenis.start();

      const idx = _slides.indexOf(el);
      if (idx >= 0 && _scrollToIndexAndActivate) {
        _scrollToIndexAndActivate(idx, () => {
          // Once centered and activated, stop Lenis so the user can read the info panel
          if (lenis && typeof lenis.stop === "function") lenis.stop();
          if (typeof onActivated === "function") onActivated();
        });
      }
    },
    deselectSlide: () => {
      if (_clearSelection) _clearSelection();
      // Re-enable scrolling
      const lenis = window.__lenis;
      if (lenis && typeof lenis.start === "function") lenis.start();
    },
    isSelectionActive: () => _selectionMode,
  };
}
