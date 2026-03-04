import * as React from "react";
import { X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map(({ id, title, description, variant, open }) =>
        open ? (
          <div
            key={id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl shadow-lg px-4 py-3 text-sm transition-all duration-300 ${
              variant === "destructive"
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            <div className="flex-1">
              {title && <p className="font-semibold">{title}</p>}
              {description && <p className="opacity-90 text-xs mt-0.5">{description}</p>}
            </div>
            <button
              onClick={() => dismiss(id)}
              className="mt-0.5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}
