import { topClients } from "@/constants/dashboard";
import { Link } from "react-router";

const TopClients = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="text-sm font-semibold">Clients With Most Posts</div>
        <Link
          to="/admin/posts-management"
          className="text-sm font-medium text-primary hover:opacity-90"
        >
          View posts <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-[1.4fr_0.6fr_0.7fr_0.6fr] gap-4 bg-muted px-6 py-3 text-xs font-semibold tracking-wider text-muted-foreground">
          <div>CLIENT</div>
          <div className="text-right">POSTS</div>
          <div className="text-right">SCHEDULED</div>
          <div className="text-right">MISSED</div>
        </div>

        <div className="divide-y divide-border">
          {topClients.map((client) => (
            <div
              key={client.name}
              className="grid grid-cols-[1.4fr_0.6fr_0.7fr_0.6fr] items-center gap-4 px-6 py-3"
            >
              <div className="text-sm font-medium text-foreground">
                {client.name}
              </div>
              <div className="text-right font-mono text-sm text-foreground">
                {client.posts}
              </div>
              <div className="text-right font-mono text-sm text-status-scheduled">
                {client.scheduled}
              </div>
              <div className="text-right font-mono text-sm text-status-missed">
                {client.missed}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopClients;
