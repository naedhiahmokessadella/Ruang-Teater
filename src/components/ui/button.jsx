import * as React from "react";

// Pastikan file utils.js ada di src/lib/utils.js
import { cn } from "../../lib/utils"; 

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          variant === "link" && "text-blue-500 hover:underline",
          variant === "outline" && "border border-gray-300",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
