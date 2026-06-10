import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 14H0V12.5H14V14Z" fill="currentColor" />
      <path d="M14 7.75H0V6.25H14V7.75Z" fill="currentColor" />
      <path d="M14 1.5H0V0H14V1.5Z" fill="currentColor" />
    </svg>
  );
}
