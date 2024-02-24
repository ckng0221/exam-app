"use client";
import dayjs from "dayjs";

export function LocalDatetime({ utcDatetime }: { utcDatetime: string }) {
  if (!utcDatetime) return <></>;

  const dateStr = dayjs(utcDatetime).format("DD/MM/YYYY hh:mm A");

  return <>{dateStr}</>;
}

export function CurrentLocalDatetime() {
  const dateStr = dayjs().format("DD/MM/YYYY hh:mm A");

  return <>{dateStr}</>;
}
