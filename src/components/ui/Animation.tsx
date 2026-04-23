"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const standardEasing = [0.22, 1, 0.36, 1] as const;

interface AnimatedProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.78, ease: standardEasing, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeadingWipe({ children, className, delay = 0 }: AnimatedProps) {
  return (
    <motion.span
      initial={{ opacity: 0.7, x: 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.56, ease: standardEasing, delay }}
      className={cn("inline-block pr-4 bg-transparent", className)} // ensure no bg breaks it, keeping transparent padding
    >
      {children}
    </motion.span>
  );
}

export function StaggerParent({ children, className }: AnimatedProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.035,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.ul>
  );
}

export function ExpBulletPoint({ className }: Omit<AnimatedProps, "children">) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.36, ease: standardEasing } },
      }}
      className={cn("mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full", className)}
    />
  );
}