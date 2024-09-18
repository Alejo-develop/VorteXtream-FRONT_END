import { transitionVariantPage } from "../utils/motion.transition"
import { AnimatePresence, motion } from "framer-motion"
import './styleTransition.css'
const TransitionPage = () => {
    return (
        <AnimatePresence mode="wait">
            <div>
                <motion.div
                    className="transitionPage-style"
                    variants={transitionVariantPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
                ></motion.div>
            </div>

            <div>
         
            </div>
        </AnimatePresence>
    );
}

export default TransitionPage