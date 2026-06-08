import type { SVGProps } from "react";

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M7.75 6.25H14V7.75H7.75V14H6.25V7.75H0V6.25H6.25V0H7.75V6.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
