import type { SVGProps } from "react";

export function CloseSmallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M5 3.91643L8.91643 0L10 1.08357L6.08357 5L10 8.91643L8.91643 10L5 6.08357L1.08357 10L0 8.91643L3.91643 5L0 1.08357L1.08357 0L5 3.91643Z"
        fill="currentColor"
      />
    </svg>
  );
}
