import { motion } from "framer-motion";

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 24,
  className = "",
  once = false,
}) {
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
