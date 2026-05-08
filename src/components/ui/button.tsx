import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[#0a0a0f] hover:bg-[var(--color-primary-hover)] shadow-[0_0_20px_-4px_rgba(242,169,0,0.5)] hover:shadow-[0_0_28px_-2px_rgba(242,169,0,0.7)]",
        secondary:
          "bg-[var(--color-secondary)] text-[#0a0a0f] hover:brightness-110 shadow-[0_0_20px_-4px_rgba(0,180,255,0.5)]",
        outline:
          "border border-[var(--color-border-strong)] bg-transparent text-white hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]",
        ghost:
          "text-[var(--color-muted)] hover:text-white hover:bg-[var(--color-surface-hover)]",
        danger:
          "bg-[var(--color-danger)] text-white hover:brightness-110 shadow-[0_0_20px_-4px_rgba(255,68,68,0.5)]",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
