import { motion, useAnimation } from "framer-motion";
export default function MotionButton (className, type, whileHover, onClick) {
    return (
        <motion.button
        onClick={onClick}
        type="submit"
        className="bg-[#06b6d4] text-white hover:bg-sky-700 active:bg-login-bg active:shadow-lg active:shadow-login-bg/50 w-[50%] h-[40px] rounded-lg font-semibold"
        whileHover={{ scale: 1.25 }}
      >
        LOGIN
      </motion.button>
    )
}

