"use client";

import { Portal } from "@mui/material";
import { useState } from "react";
import { Content } from "./modal/Content";

import { motion } from "framer-motion";

export const RulesModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="absolute top-0 left-0 z-10 ml-1 mt-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="aspect-square z-10 rounded-full p-2 dark:bg-gray-800 dark:text-white bg-white text-gray-800"
          onClick={() => setOpen(!open)}
        >
          <div className="w-6">?</div>
        </motion.button>
      </div>
      {open && (
        <Portal>
          <Content onClose={() => setOpen(false)} />
        </Portal>
      )}
    </>
  );
};
