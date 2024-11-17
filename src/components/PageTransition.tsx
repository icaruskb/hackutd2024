// hackutd2024/src/components/PageTransition.tsx
import { motion } from 'framer-motion';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }} // Adjust duration as needed
    >
      {children}
    </motion.div>
  );
};