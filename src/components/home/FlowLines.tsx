import { motion } from "framer-motion";

export default function FlowLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(153, 100%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(153, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(153, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="greenGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(153, 100%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(153, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(153, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[
          { d: "M-100,300 C200,250 400,400 600,300 S1000,200 1300,350", delay: 0 },
          { d: "M-100,450 C150,400 350,550 550,450 S950,350 1300,500", delay: 1 },
          { d: "M-100,200 C250,150 450,300 650,200 S1050,100 1300,250", delay: 2 },
          { d: "M-100,550 C200,500 400,650 600,550 S1000,450 1300,600", delay: 0.5 },
          { d: "M-100,150 C300,100 500,250 700,150 S1100,50 1300,200", delay: 1.5 },
        ].map((line, i) => (
          <motion.path
            key={i}
            d={line.d}
            fill="none"
            stroke={i % 2 === 0 ? "url(#greenGradient)" : "url(#greenGradient2)"}
            strokeWidth={i < 2 ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(153 100% 50% / 0.06) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(153 100% 50% / 0.04) 0%, transparent 70%)",
          right: "10%",
          bottom: "10%",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
