import type { RecentOrder } from "@/constants/dashboard";
import OrderItem from "./OrderItem";

type OrderDetailsProps = {
  order: RecentOrder | undefined;
};

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Order Details</div>
          {order ? (
            <div className="mt-1 text-xs text-muted-foreground">
              <span className="font-mono">{order.id}</span> • {order.from} •{" "}
              {order.status}
            </div>
          ) : (
            <div className="mt-1 text-xs text-muted-foreground">
              No order selected.
            </div>
          )}
        </div>
      </div>

      {order ? (
        <div className="mt-5 space-y-4">
          <div className="space-y-4">
            {order.items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Total</div>
              <div className="font-mono text-sm text-foreground">
                {order.total}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
