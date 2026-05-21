import type { OrderLineItem } from "@/constants/dashboard";
import { useEffect, useState } from "react";

type OrderItemProps = {
  item: OrderLineItem;
};

export default function OrderItem({ item }: OrderItemProps) {
  const [isDark, setIsDark] = useState(() =>
    typeof document === "undefined"
      ? false
      : document.body.classList.contains("dark"),
  );

  useEffect(() => {
    const body = document.body;

    const sync = () => setIsDark(body.classList.contains("dark"));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const imageUrl = isDark
    ? "https://placehold.co/600x400/e49d49/060302"
    : "https://placehold.co/600x400/3d2013/FFF";

  return (
    <div className="flex items-center gap-4">
      <img
        src={imageUrl}
        alt={item.name}
        className="size-12 rounded-xl border border-border bg-muted object-cover"
        loading="lazy"
      />

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{item.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          ₹{item.price.toFixed(2)} • Qty {item.quantity}
        </div>
      </div>

      <div className="text-right font-mono text-sm text-muted-foreground">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
