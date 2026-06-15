import type { SVGProps } from "react";

export function EyeOpenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 5C8.65685 5 10 6.34315 10 8C10 9.65685 8.65685 11 7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5ZM7 6.5C6.17157 6.5 5.5 7.17157 5.5 8C5.5 8.82843 6.17157 9.5 7 9.5C7.82843 9.5 8.5 8.82843 8.5 8C8.5 7.17157 7.82843 6.5 7 6.5Z"
        fill="currentColor"
      />
      <path
        d="M7 2.5C10.866 2.5 14 4.96243 14 8H12.5C12.5 6.10771 10.3947 4 7 4C3.60529 4 1.5 6.10771 1.5 8H0C0 4.96243 3.13401 2.5 7 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
