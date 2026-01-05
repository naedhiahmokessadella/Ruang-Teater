import * as React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, to, onClick, ...props }, ref) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to) {
      navigate(to); // navigasi ke route tertentu
    }
    if (onClick) onClick(e); // tetap jalankan event handler asli
  };

  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      onClick={handleClick} // ganti onClick default
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
