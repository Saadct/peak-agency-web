'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function HeroParallax() {
    const ref = useRef(null);
    const [mounted, setMounted] = useState(false);

    // Mouse position for tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Layer transforms (Deep to Front)
    const xBack = useTransform(springX, [-0.5, 0.5], [-15, 15]);
    const yBack = useTransform(springY, [-0.5, 0.5], [-15, 15]);

    const xMid = useTransform(springX, [-0.5, 0.5], [-30, 30]);
    const yMid = useTransform(springY, [-0.5, 0.5], [-30, 30]);

    const xFront = useTransform(springX, [-0.5, 0.5], [-50, 50]);
    const yFront = useTransform(springY, [-0.5, 0.5], [-50, 50]);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX / innerWidth - 0.5);
            mouseY.set(e.clientY / innerHeight - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    const items = [
        // Top Left Cluster
        { src: "/assets/hero-dashboard.png", width: 280, height: 200, top: "5%", left: "5%", x: xMid, y: yMid, rotate: -12, delay: 0.1, className: "hidden xl:block" },
        { src: "/assets/hero-analytics.png", width: 140, height: 140, top: "25%", left: "15%", x: xBack, y: yBack, rotate: 6, delay: 0.2, className: "hidden lg:block opacity-80" },

        // Top Right Cluster
        { src: "/assets/hero-mobile.png", width: 220, height: 400, top: "8%", right: "5%", x: xFront, y: yFront, rotate: 12, delay: 0.3, className: "hidden xl:block" },
        { src: "/assets/hero-code.png", width: 180, height: 120, top: "30%", right: "18%", x: xMid, y: yMid, rotate: -6, delay: 0.4, className: "hidden lg:block opacity-90" },

        // Bottom Left Cluster
        { src: "/assets/hero-mobile.png", width: 180, height: 320, bottom: "10%", left: "8%", x: xFront, y: yFront, rotate: -8, delay: 0.5, className: "hidden xl:block" },
        { src: "/assets/hero-code.png", width: 200, height: 130, bottom: "35%", left: "20%", x: xMid, y: yMid, rotate: 4, delay: 0.6, className: "hidden lg:block opacity-80" },

        // Bottom Right Cluster
        { src: "/assets/hero-dashboard.png", width: 260, height: 180, bottom: "15%", right: "8%", x: xMid, y: yMid, rotate: 8, delay: 0.7, className: "hidden xl:block" },
        { src: "/assets/hero-analytics.png", width: 160, height: 160, bottom: "40%", right: "22%", x: xBack, y: yBack, rotate: -10, delay: 0.8, className: "hidden lg:block opacity-70" },
    ];

    return (
        <div ref={ref} className="absolute inset-0 overflow-visible pointer-events-none z-0">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    style={{ x: item.x, y: item.y, top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                    className={`absolute z-10 ${item.className}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: item.delay, ease: "easeOut" }}
                >
                    <div className="relative group hover:z-50 transition-all duration-300">
                        <Image
                            src={item.src}
                            alt="UI Element"
                            width={item.width}
                            height={item.height}
                            className={`rounded-2xl shadow-2xl border border-white/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-0`}
                            style={{ transform: `rotate(${item.rotate}deg)` }}
                        />
                    </div>
                </motion.div>
            ))}

            {/* Decorative Background Blob */}
            <motion.div
                style={{ x: xBack, y: yBack }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
        </div>
    );
}
