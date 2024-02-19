"use client";
import dayjs from "dayjs";

export default function LocalDatetime({
  utcDatetime,
}: {
  utcDatetime: string;
}) {
  const dateStr = dayjs(utcDatetime).format("DD/MM/YYYY hh:mm A");

  return <>{dateStr}</>;
}
