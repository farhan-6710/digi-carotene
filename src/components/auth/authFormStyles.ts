export const authFormStyles = {
  label:
    "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
  input:
    "h-10 rounded-lg border border-ring/60 bg-background px-3 text-sm text-foreground shadow-xs transition placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 dark:bg-card/80 dark:border-border",
  googleButton:
    "h-10 w-full rounded-full border border-ring/60 bg-card text-sm font-medium text-foreground shadow-xs hover:bg-muted/50",
  submitButton: "h-10 w-full rounded-full font-medium shadow-sm",
  divider:
    "bg-card px-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase",
  errorAlert:
    "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive",
  successAlert:
    "rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-sm text-foreground",
  tabsList:
    "mb-6 grid h-11 w-full grid-cols-2 rounded-full border border-ring/60 bg-muted/40 p-1 shadow-xs",
  tabsTrigger:
    "h-full rounded-full border-0 px-4 text-sm font-medium text-muted-foreground shadow-none transition hover:text-foreground data-active:bg-card data-active:text-foreground data-active:shadow-sm after:hidden dark:data-active:bg-card dark:data-active:text-foreground",
} as const;
