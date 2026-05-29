import { topPatients } from "@/constants/dashboard";
import { Link } from "react-router";

const TopPatients = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="text-sm font-semibold">Patients With Most Sessions</div>
        <Link
          to="/admin/appointments-management"
          className="text-sm font-medium text-primary hover:opacity-90"
        >
          View appointments <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-[1.4fr_0.6fr_0.7fr_0.6fr] gap-4 bg-muted px-6 py-3 text-xs font-semibold tracking-wider text-muted-foreground">
          <div>PATIENT</div>
          <div className="text-right">SESSIONS</div>
          <div className="text-right">UPCOMING</div>
          <div className="text-right">NO-SHOWS</div>
        </div>

        <div className="divide-y divide-border">
          {topPatients.map((patient) => (
            <div
              key={patient.name}
              className="grid grid-cols-[1.4fr_0.6fr_0.7fr_0.6fr] items-center gap-4 px-6 py-3"
            >
              <div className="text-sm font-medium text-foreground">
                {patient.name}
              </div>
              <div className="text-right font-mono text-sm text-foreground">
                {patient.sessions}
              </div>
              <div className="text-right font-mono text-sm text-status-scheduled">
                {patient.upcoming}
              </div>
              <div className="text-right font-mono text-sm text-status-missed">
                {patient.noShows}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPatients;
