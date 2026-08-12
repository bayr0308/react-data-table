import { type ComponentProps } from "react";

import { cn } from "../../utils/cn";

interface BadgeProps extends ComponentProps<"span"> {}

const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
};

export { Badge };
