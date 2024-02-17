"use client";
import dayjs from "dayjs";

export default function LocalDatetime({
  utcDatetime,
}: {
  utcDatetime: string;
}) {
  const dateStr = dayjs(utcDatetime).format("d/M/YYYY hh:mm:A");

  return <>{dateStr}</>;
}
