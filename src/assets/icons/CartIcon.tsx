import type { SVGProps } from "react";

export function CartIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M7 0C8.62488 0 9.9709 1.19248 10.2114 2.75H12.9443L13.8101 14H0.189941L1.05566 2.75H3.78857C4.0291 1.19248 5.37513 0 7 0ZM1.80957 12.5H12.1904L11.5557 4.25H10.25V6H8.75V4.25H5.25V6H3.75V4.25H2.44434L1.80957 12.5ZM7 1.5C6.20727 1.5 5.53792 2.02717 5.32275 2.75H8.67725C8.46208 2.02717 7.79273 1.5 7 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
