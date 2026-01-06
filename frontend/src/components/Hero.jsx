import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-28">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-primary"
      >
        Find Your Perfect Match 
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-4 text-lg text-gray-600 max-w-xl"
      >
        Join MeetMate and start connecting with amazing people near you!
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-6"
        onClick={() => (window.location.href = '/register')}
      >
        Get Started
      </motion.button>
    </section>
  );
}
