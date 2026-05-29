import { recentAppointments } from "@/constants/dashboard";
import { Link, useLocation, useNavigate, useParams } from "react-router";

type RecentAppointmentsProps = {
  title?: string;
  showViewAllLink?: boolean;
  variant?: "dashboard" | "page";
};

const RecentAppointments = ({
  title = "Recent Appointments",
  showViewAllLink = true,
  variant = "dashboard",
}: RecentAppointmentsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const isAppointmentsRoute =
    location.pathname.startsWith("/admin/appointments-management");

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
            to="/admin/appointments-management"
            className="text-sm font-medium text-primary hover:opacity-90"
          >
            View all <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>

      <div className="border-t border-border">
        <div className="border-b grid grid-cols-[110px_1fr_1fr_92px] gap-4 bg-muted px-6 py-3 text-xs font-semibold tracking-wider text-muted-foreground">
          <div>TIME</div>
          <div>PATIENT</div>
          <div>APPOINTMENT</div>
          <div className="text-right">STATUS</div>
        </div>

        <div className="divide-y divide-border">
          {recentAppointments.map((appointment) => {
            const isSelected =
              isAppointmentsRoute && appointmentId === appointment.id;

            const mutedTextClass = isSelected
              ? "text-primary-foreground"
              : "text-muted-foreground group-hover:text-primary-foreground";

            const mainTextClass = isSelected
              ? "text-primary-foreground"
              : "text-foreground group-hover:text-primary-foreground";

            return (
              <button
                key={appointment.id}
                type="button"
                onClick={() => {
                  navigate("/admin/appointments-management");
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
                    {appointment.time}
                  </div>
                  <div
                    className={["font-mono text-sm", mutedTextClass].join(" ")}
                  >
                    {appointment.patient}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={["font-mono text-sm", mainTextClass].join(" ")}
                    >
                      {appointment.id}
                    </div>
                    <div className={["text-xs", mutedTextClass].join(" ")}>
                      • {appointment.sessionType}
                    </div>
                  </div>
                  <div
                    className={[
                      "text-right font-mono text-sm",
                      mutedTextClass,
                    ].join(" ")}
                  >
                    {appointment.status}
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

export default RecentAppointments;
