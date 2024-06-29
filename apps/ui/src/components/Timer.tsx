"use client";
import React, { useState, useEffect } from "react";

// Helper function to format seconds into hh:mm:ss
const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};

const Timer = ({
  startTimestamp,
  endTimestamp,
}: {
  startTimestamp: string;
  endTimestamp?: string;
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (endTimestamp) return;
    const start = new Date(startTimestamp).getTime();

    const updateElapsedTime = () => {
      const now = new Date().getTime();
      setElapsedTime(Math.floor((now - start) / 1000)); // elapsed time in seconds
    };

    updateElapsedTime(); // Update immediately on mount

    const intervalId = setInterval(updateElapsedTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [startTimestamp, endTimestamp]);

  const start = new Date(startTimestamp).getTime();
  const end = new Date(endTimestamp || "").getTime();
  const fixedElasapedTime = Math.floor((end - start) / 1000);

  return (
    <>
      {endTimestamp ? formatTime(fixedElasapedTime) : formatTime(elapsedTime)}
    </>
  );
};

export default Timer;
