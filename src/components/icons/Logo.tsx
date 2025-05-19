import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50" // Keep viewBox, adjust text fontSize and content
      width="120" // Keep display width
      height="30"  // Keep display height
      aria-label="HOSTEL MANAGEMENT SYSTEM Logo" // Updated aria-label
      {...props}
    >
      <rect width="200" height="50" fill="transparent" />
      {/* Icon Path (Stylized "D") - kept as is */}
      <path d="M10 10 H30 V40 H10 Z M20 15 V35 M10 25 H30" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      <text
        x="40" // Keep x position
        y="35" // Keep y position
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="20" // Adjusted font size
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        HOSTEL SYSTEM {/* Updated text to fit */}
      </text>
    </svg>
  );
}
