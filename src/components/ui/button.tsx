import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { classNames } from "~/utils/classNames";
import Link from "next/link";

const variants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        light: "bg-slate-100 border border-slate-900 text-slate-900 hover:bg-slate-200",
        ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof variants>
  & { isLoading?: boolean; href?: string; };

export const Button = ({
                         className,
                         children,
                         variant,
                         isLoading,
                         size,
                         href,
                         ...propsRest
                       }: ButtonProps) => {
  const classes = useMemo(
    () => classNames(variants({ variant, size }), className),
    [variant, size, className]
  );

  const innerComponent = useMemo(() => (
    <button
      className={classes}
      disabled={isLoading}
      {...propsRest}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  ), [classes, isLoading, children, propsRest]);

  return href
    ? <Link href={href}>{innerComponent}</Link>
    : innerComponent;
};
