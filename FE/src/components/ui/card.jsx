import React from "react";

export function Card({ children }) {
  return <div className="p-4 border rounded-lg shadow-md">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b p-2 font-bold">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
