import { CloseRounded } from "@mui/icons-material";
import { motion } from "framer-motion";

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    className="rounded-full p-2 bg-gray-800 text-white dark:bg-white dark:text-gray-800 "
    onClick={onClick}
  >
    <CloseRounded />
  </motion.button>
);
