import { useState } from "react";
import { transitionVariantPage } from "../utils/motion.transition";
import { AnimatePresence, motion } from "framer-motion";
import './styleTransition.css';

const TransitionPage = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleExitComplete = () => {
        setIsVisible(false);
        console.log(isVisible);
         
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
            <motion.div
                className="transitionPage-style"
                variants={transitionVariantPage}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
            </motion.div>
        </AnimatePresence>
    );
}

export default TransitionPage;
