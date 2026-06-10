import type { SVGProps } from "react";

export function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.75 10.5H6.25V9H7.75V10.5Z" fill="currentColor" />
      <path d="M7.75 8H6.25V3.5H7.75V8Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
