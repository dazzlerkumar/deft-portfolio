"use client";
import { motion } from "framer-motion";
export default function Profile() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full w-full overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black"
        >
            <h1>Profile</h1>
        </motion.div>
    );
}
