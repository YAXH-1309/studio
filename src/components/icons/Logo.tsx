import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      aria-label="DormFlow Logo"
      {...props}
    >
      <rect width="200" height="50" fill="transparent" />
      <path d="M10 10 H30 V40 H10 Z M20 15 V35 M10 25 H30" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      <text
        x="40"
        y="35"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        DormFlow
      </text>
    </svg>
  );
}
