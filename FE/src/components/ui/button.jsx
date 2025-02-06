import React from "react";

export function Button({ children, variant = "default", size = "md", onClick }) {
  const baseClass = "px-4 py-2 rounded-md font-semibold focus:outline-none";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    sm: "text-sm px-3 py-1",
    md: "text-md px-4 py-2",
  };

  return (
    <button className={`${baseClass} ${variants[variant]} ${sizes[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}
