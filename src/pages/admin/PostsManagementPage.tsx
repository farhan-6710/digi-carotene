import { ClientDialog } from "@/components/admin/posts-management/ClientDialog";
import { DateSelector } from "@/components/admin/posts-management/DateSelector";
import { PostsManagementWeeksTable } from "@/components/admin/posts-management/PostsManagementWeeksTable";
import { SendDailyReportDialog } from "@/components/admin/posts-management/SendDailyReportDialog";
import {
  initialSlots,
  statusColors,
  statusText,
} from "@/constants/admin/posts-management/postsManagement";
import { usePostsCalendarSelection } from "@/hooks/admin/usePostsCalendarSelection";
import { usePostsManagement } from "@/hooks/admin/usePostsManagement";

export function PostsManagementPage() {
  const { selectedDate, calendarWeeks, year, month, selectDate } =
    usePostsCalendarSelection();

  const {
    statusOptions,
    isDialogOpen,
    clientId,
    clientName,
    clientTime,
    clientStatus,
    editingIndex,
    setClientName,
    setClientTime,
    setClientStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveClient,
    deleteClient,
    handleDialogOpenChange,
  } = usePostsManagement(initialSlots);

  const isEditing = editingIndex !== null;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Posts Management
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage daily client posts by time and status. Click any day to add a
            client or tap one to update it.
          </p>
        </div>
        <SendDailyReportDialog />
      </div>

      <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {(
            [
              { label: "Draft", color: "bg-status-draft" },
              { label: "Scheduled", color: "bg-status-scheduled" },
              { label: "Posted", color: "bg-status-posted" },
              { label: "Missed", color: "bg-status-missed" },
            ] as const
          ).map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"
            >
              <span className={`size-2 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <DateSelector selectedDate={selectedDate} onSelect={selectDate} />
      </div>

      <PostsManagementWeeksTable
        year={year}
        month={month}
        weeks={calendarWeeks}
        selectedDate={selectedDate}
        getSlot={getSlot}
        onAdd={openAddDialog}
        onEdit={openEditDialog}
        statusColors={statusColors}
        statusText={statusText}
      />

      <ClientDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        isEditing={isEditing}
        clientId={clientId}
        clientName={clientName}
        clientTime={clientTime}
        clientStatus={clientStatus}
        statusOptions={statusOptions}
        onClientNameChange={setClientName}
        onClientTimeChange={setClientTime}
        onClientStatusChange={setClientStatus}
        onSave={saveClient}
        onDelete={deleteClient}
      />
    </section>
  );
}
