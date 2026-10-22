import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-purple-200 bg-purple-50 text-purple-700",
        secondary:
          "border-slate-200 bg-slate-100 text-slate-700",
        destructive:
          "border-rose-200 bg-rose-50 text-rose-700",
        outline: "border-slate-200 text-slate-700 bg-white shadow-xs",
        amber:
          "border-amber-300 bg-amber-100 text-amber-900 shadow-xs",
        emerald:
          "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-xs",
        blue:
          "border-blue-200 bg-blue-50 text-blue-700 shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
