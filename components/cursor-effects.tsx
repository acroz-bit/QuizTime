"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorEffects() {
  const [enabled, setEnabled] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const glowX = useSpring(pointerX, { damping: 28, stiffness: 220, mass: 0.35 });
  const glowY = useSpring(pointerY, { damping: 28, stiffness: 220, mass: 0.35 });

  const spotlightBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.18), transparent 42%), radial-gradient(220px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.1), transparent 36%)`
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const setMode = () => setEnabled(mediaQuery.matches);

    setMode();
    mediaQuery.addEventListener("change", setMode);

    return () => mediaQuery.removeEventListener("change", setMode);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setPointerInside(true);
    };

    const handleLeave = (event: MouseEvent) => {
      if (event?.relatedTarget instanceof Element) {
        return;
      }

      setPointerInside(false);
    };

    const handleBlur = () => {
      setPointerInside(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("blur", handleBlur);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: spotlightBackground }}
      />
    </>
  );
}
