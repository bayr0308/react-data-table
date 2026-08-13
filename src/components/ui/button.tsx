import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ComponentProps<"button"> {}

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

export { Button };
