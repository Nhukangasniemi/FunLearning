import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-purple-600 text-white shadow-md hover:bg-purple-500 hover:scale-[1.02] active:scale-98",
        destructive:
          "bg-rose-500 text-white shadow-md hover:bg-rose-600 hover:scale-[1.02] active:scale-98",
        outline:
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm",
        secondary:
          "bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900",
        ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
        link: "text-purple-600 underline-offset-4 hover:underline",
        pro: "bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-rose-400 hover:scale-[1.02] active:scale-98",
        candy:
          "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-98",
        amber:
          "bg-amber-400 text-amber-950 font-black shadow-md hover:bg-amber-300 hover:scale-[1.02] active:scale-98",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
