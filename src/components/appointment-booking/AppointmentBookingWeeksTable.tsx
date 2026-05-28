import type {
  AppointmentSlot,
  AppointmentStatusKey,
  Week,
} from "@/types/AppointmentBooking/types";

type AppointmentBookingWeeksTableProps = {
  days: string[];
  weeks: Week[];
  getSlot: (day: string, date: number) => AppointmentSlot | undefined;
  onAdd: (day: string, date: number) => void;
  onEdit: (day: string, date: number, appointmentIndex: number) => void;
  statusColors: Record<AppointmentStatusKey, string>;
  statusText: Record<AppointmentStatusKey, string>;
};

export function AppointmentBookingWeeksTable({
  days,
  weeks,
  getSlot,
  onAdd,
  onEdit,
  statusColors,
  statusText,
}: AppointmentBookingWeeksTableProps) {
  const weekCount = weeks.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        className="grid border-b border-border bg-muted text-xs font-semibold tracking-wider text-muted-foreground"
        style={{
          gridTemplateColumns: `140px repeat(${weekCount}, minmax(0, 1fr))`,
        }}
      >
        <div className="px-4 py-3">Day</div>
        {weeks.map((week) => (
          <div key={week.label} className="px-4 py-3 text-center">
            <div>{week.label}</div>
            <div className="text-[11px] text-muted-foreground">
              {week.range}
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-border">
        {days.map((day, dayIndex) => (
          <div
            key={day}
            className="grid"
            style={{
              gridTemplateColumns: `140px repeat(${weekCount}, minmax(0, 1fr))`,
            }}
          >
            <div className="flex items-center border-r border-border bg-muted/40 px-4 py-6 text-sm font-semibold">
              {day}
            </div>
            {weeks.map((week) => {
              const dateNumber = week.dates[dayIndex];

              if (!dateNumber) {
                return (
                  <div
                    key={`${day}-${week.label}-empty`}
                    className="min-h-[140px] border-r border-border/70 bg-muted/20"
                  />
                );
              }

              const slot = getSlot(day, dateNumber);
              const hasAppointments = Boolean(slot?.appointments.length);

              return (
                <div
                  key={`${day}-${week.label}-${dateNumber}`}
                  role="button"
                  tabIndex={0}
                  className="group flex min-h-[140px] cursor-pointer flex-col border-r border-border/70 p-4 text-left transition hover:bg-muted/40"
                  aria-label={`Add appointment for ${day} May ${dateNumber}`}
                  onClick={() => onAdd(day, dateNumber)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onAdd(day, dateNumber);
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Date</span>
                    <span className="font-mono">May {dateNumber}</span>
                  </div>

                  <div className="mt-3 flex flex-1 flex-col gap-1.5">
                    {hasAppointments ? (
                      slot?.appointments.map((appointment, appointmentIndex) => (
                        <button
                          key={`${appointment.id}-${appointmentIndex}`}
                          type="button"
                          className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background/70 px-3 py-1.5 text-left transition hover:border-ring/50"
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(day, dateNumber, appointmentIndex);
                          }}
                          aria-label={`Edit ${appointment.patientName}`}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className={`size-2 shrink-0 rounded-full ${statusColors[appointment.status]}`}
                            />
                            <span className="truncate text-sm font-medium">
                              {appointment.patientName}
                            </span>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-0.5">
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {appointment.time}
                            </span>
                            <span
                              className={`text-[11px] font-semibold ${statusText[appointment.status]}`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        Click to add appointments
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
