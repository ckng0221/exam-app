import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="p-16 flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}
