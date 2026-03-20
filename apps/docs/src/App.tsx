"use client";

import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { AiFillAliwangwang } from "react-icons/ai";

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        opacity: 0.1 + i * 0.03,
        duration: 20 + (i % 10) * 1.5,
      })),
    [position],
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      fill="none"
      viewBox="0 0 696 316"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
          initial={{ pathLength: 0.3, opacity: 0.3 }}
          animate={{
            pathLength: [0.3, 1, 0.3],
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: path.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

export interface BackgroundPathsProps {
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundPaths({ className = "", children }: BackgroundPathsProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden bg-black text-white ${className}`} style={{ zIndex: -1 }}>
      {/* Mirrored path sets for symmetry */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Subtle center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          width: "min(60vw, 60vh)",
          height: "min(60vw, 60vh)",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

import Threads from "./components/Threads";

const TypingText = ({ lines }: { lines: string[] }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const child = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      } as const
    },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.h1 variants={container} initial="hidden" animate="visible">
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          <div style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {line.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={child}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </motion.h1>
  );
};

export function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // sync body class for global CSS variables
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="layout">
      {!isDark && (
        <Threads
          color={[0.2, 0.2, 0.2]}
          amplitude={2}
          distance={0.3}
          enableMouseInteraction={true}
        />
      )}
      {isDark && <BackgroundPaths />}
      
      <nav className="navbar">
        <div className="navbar-content">
          <a href="#" className="logo">
            <AiFillAliwangwang size={22} style={{ color: "var(--fg)" }} />
            <span>Hostra</span>
          </a>
          
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#docs">Docs</a>
            <a href="#github">GitHub</a>
          </div>
        </div>
      </nav>

      <div className="theme-toggle">
        <button 
          onClick={() => setIsDark(!isDark)} 
          className="theme-btn"
          title="Toggle Theme"
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
          <span>{isDark ? 'Bright' : 'Dark'}</span>
        </button>
      </div>

      <main className="hero">
        <div className="hero-logo">
          <AiFillAliwangwang size={32} style={{ color: "var(--fg)" }} />
          <span>Hostra</span>
        </div>
        <TypingText lines={["Ship code.", "Not processes."]} />
        <div className="hero-buttons">
          <a href="#deploy" className="btn btn-primary">
            Start Deploying
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="#docs" className="btn btn-secondary">
            Read Docs
          </a>
        </div>
      </main>
    </div>
  );
}
