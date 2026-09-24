"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#151922",
          color: "#fff",
          border: "1px solid #29303c",
        },
      }}
    />
  );
}
