import RecentOrders from "@/components/dashboard/RecentOrders";
import OrderDetails from "@/components/orders/OrderDetails";
import { recentOrders } from "@/constants/dashboard";
import { useParams } from "react-router";

export function OrdersPage() {
  const { orderId } = useParams();
  const selectedOrder = recentOrders.find((order) => order.id === orderId);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Select an order to see its items.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <RecentOrders title="Orders" showViewAllLink={false} variant="page" />
        <OrderDetails order={selectedOrder} />
      </div>
    </section>
  );
}
