import { recentOrders } from "@/constants/dashboard";
import { Link, useLocation, useNavigate, useParams } from "react-router";

type RecentOrdersProps = {
  title?: string;
  showViewAllLink?: boolean;
  variant?: "dashboard" | "page";
};

const RecentOrders = ({
  title = "Recent Orders",
  showViewAllLink = true,
  variant = "dashboard",
}: RecentOrdersProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const isOrdersRoute = location.pathname.startsWith("/orders");

  return (
    <div
      className={[
        "rounded-2xl border border-border bg-card shadow-sm",
        variant === "dashboard" ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <div className="text-sm font-semibold">{title}</div>
        {showViewAllLink ? (
          <Link
            to="/orders"
            className="text-sm font-medium text-primary hover:opacity-90"
          >
            View all <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>

      <div className="border-t border-border">
        <div className="border-b grid grid-cols-[110px_1fr_1fr_92px] gap-4 bg-muted px-6 py-3 text-xs font-semibold tracking-wider text-muted-foreground">
          <div>TIME</div>
          <div>FROM</div>
          <div>ORDER</div>
          <div className="text-right">TOTAL</div>
        </div>

        <div className="divide-y divide-border">
          {recentOrders.map((order) => {
            const isSelected = isOrdersRoute && orderId === order.id;

            const mutedTextClass = isSelected
              ? "text-primary-foreground"
              : "text-muted-foreground group-hover:text-primary-foreground";

            const mainTextClass = isSelected
              ? "text-primary-foreground"
              : "text-foreground group-hover:text-primary-foreground";

            return (
              <button
                key={order.id}
                type="button"
                onClick={() => {
                  if (isOrdersRoute) {
                    navigate(`/orders/${order.id}`, { replace: true });
                    return;
                  }

                  navigate(`/orders/${order.id}`);
                }}
                className={[
                  "group block w-full text-left",
                  "cursor-pointer transition",
                  "hover:bg-primary",
                  isSelected ? "bg-primary" : "",
                ].join(" ")}
              >
                <div className="grid grid-cols-[110px_1fr_1fr_92px] items-center gap-4 px-6 py-3">
                  <div
                    className={["font-mono text-sm", mutedTextClass].join(" ")}
                  >
                    {order.time}
                  </div>
                  <div
                    className={["font-mono text-sm", mutedTextClass].join(" ")}
                  >
                    {order.from}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={["font-mono text-sm", mainTextClass].join(" ")}
                    >
                      {order.id}
                    </div>
                    <div className={["text-xs", mutedTextClass].join(" ")}>
                      • {order.status}
                    </div>
                  </div>
                  <div
                    className={[
                      "text-right font-mono text-sm",
                      mutedTextClass,
                    ].join(" ")}
                  >
                    {order.total}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
