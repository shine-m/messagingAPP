import { motion, AnimatePresence } from "framer-motion";

export function Animator({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ type: "spring", duration: 0.7 }}
      //   style={{ position: "absolute", width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
