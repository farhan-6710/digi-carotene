import { SendDailySummaryDialog } from "@/components/tasks-management/SendDailySummaryDialog";
import { TaskDialog } from "@/components/tasks-management/TaskDialog";
import { TasksManagementWeeksTable } from "@/components/tasks-management/TasksManagementWeeksTable";
import {
  days,
  initialSlots,
  statusColors,
  statusText,
  weeks,
} from "@/constants/TasksManagementPage/TasksManagementPage";
import { useTasksManagement } from "@/hooks/useTasksManagement";

export function TasksManagementPage() {
  const {
    statusOptions,
    isDialogOpen,
    taskName,
    taskTime,
    taskStatus,
    editingIndex,
    setTaskName,
    setTaskTime,
    setTaskStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveTask,
    deleteTask,
    handleDialogOpenChange,
  } = useTasksManagement(initialSlots);

  const isEditing = editingIndex !== null;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Tasks Management
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track daily tasks by time and status. Click any day to add a new
            task or tap one to update its time.
          </p>
        </div>
        <SendDailySummaryDialog />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {(
          [
            { label: "Upcoming", color: "bg-status-upcoming" },
            { label: "Done", color: "bg-status-done" },
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

      <TasksManagementWeeksTable
        days={days}
        weeks={weeks}
        getSlot={getSlot}
        onAdd={openAddDialog}
        onEdit={openEditDialog}
        statusColors={statusColors}
        statusText={statusText}
      />

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        isEditing={isEditing}
        taskName={taskName}
        taskTime={taskTime}
        taskStatus={taskStatus}
        statusOptions={statusOptions}
        onTaskNameChange={setTaskName}
        onTaskTimeChange={setTaskTime}
        onTaskStatusChange={setTaskStatus}
        onSave={saveTask}
        onDelete={deleteTask}
      />
    </section>
  );
}
