import React from "react";

interface IProps {
  content: React.ReactNode;
  color: any;
}

export default function Badge({ content, color }: IProps) {
  return (
    <span
      className={`bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${color}-900 dark:text-${color}-300`}
    >
      {content}
    </span>
  );
}
