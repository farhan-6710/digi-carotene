import { ClientDialog } from "@/components/posts-management/ClientDialog";
import { PostsManagementDaysTable } from "@/components/posts-management/PostsManagementDaysTable";
import { SendReportDialog } from "@/components/posts-management/SendReportDialog";
import { usePostsManagement } from "@/hooks/usePostsManagement";
import {
  days,
  initialSlots,
  statusColors,
  statusText,
  weeks,
} from "@/constants/PostsManagementPage/PostsManagementPage2";

export function PostsManagementPage() {
  const {
    statusOptions,
    isDialogOpen,
    clientName,
    clientStatus,
    editingIndex,
    setClientName,
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
          <h1 className="text-2xl font-semibold tracking-tight">
            Posts Management
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Plan weekly content by client and status. Click any slot to add a
            new post.
          </p>
        </div>
        <SendReportDialog />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

      <PostsManagementDaysTable
        days={days}
        weeks={weeks}
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
        clientName={clientName}
        clientStatus={clientStatus}
        statusOptions={statusOptions}
        onClientNameChange={setClientName}
        onClientStatusChange={setClientStatus}
        onSave={saveClient}
        onDelete={deleteClient}
      />
    </section>
  );
}
