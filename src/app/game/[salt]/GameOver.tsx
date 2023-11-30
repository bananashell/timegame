import { AnimatePresence, motion } from "framer-motion";

export const GameOver = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <h1>Game over</h1>
    </motion.section>
  );
};
