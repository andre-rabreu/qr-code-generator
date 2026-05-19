"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";

export function QrGenerator() {
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("qr-text");
    if (saved) setText(saved);
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("qr-text", text);
    }
  }, [text, isClient]);

  const handleDownload = useCallback(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  }, []);

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        QR Code Generator
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Cole aqui um texto ou URL..."
        rows={3}
        className="w-full resize-none rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:ring-zinc-100"
      />

      <div className="mt-6 flex min-h-[200px] items-center justify-center rounded-lg bg-white p-4">
        {isClient && text.trim() ? (
          <div ref={containerRef}>
            <QRCodeCanvas
              value={text}
              size={256}
              level="M"
              includeMargin
            />
          </div>
        ) : (
          <p className="text-sm text-zinc-400">
            Digite algo acima para gerar o QR code
          </p>
        )}
      </div>

      <button
        onClick={handleDownload}
        disabled={!text.trim()}
        className="mt-4 h-11 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Baixar PNG
      </button>
    </div>
  );
}
