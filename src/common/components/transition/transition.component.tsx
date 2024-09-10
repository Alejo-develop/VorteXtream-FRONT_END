import { motion } from "framer-motion"
import { fadeIn } from "../../utils/motion.transition" 

interface MotionTransitionProps {
    children: JSX.Element
    position: 'right' | 'bottom' | 'left'
    className: string
}

const MotionTransition = (props: MotionTransitionProps) => {
    const { children, position, className } = props
    
    return(
        <motion.div
            variants={fadeIn(position)}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className={className}
            >
            {children}
        </motion.div>
    )
}

export default MotionTransition