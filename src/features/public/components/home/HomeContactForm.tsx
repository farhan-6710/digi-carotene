import { Send } from "lucide-react";

import {
  PUBLIC_INPUT_CLASS,
  PUBLIC_TEXTAREA_CLASS,
} from "@/features/public/constants/footer";
import { contactSubjectOptions } from "@/features/public/constants/contact";
import type { HomeContactFormProps } from "@/features/public/types/components";
import { Button } from "@/shared/ui/button";

export function HomeContactForm({
  formData,
  isSubmitting,
  onFieldChange,
  onSubmit,
}: HomeContactFormProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-30 blur-lg" />
      <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-muted-foreground">
              Your Name *
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={onFieldChange}
                placeholder="e.g. Jane Cooper"
                className={PUBLIC_INPUT_CLASS}
              />
            </label>
            <label className="block text-xs font-semibold text-muted-foreground">
              Your Email *
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={onFieldChange}
                placeholder="e.g. jane@company.com"
                className={PUBLIC_INPUT_CLASS}
              />
            </label>
          </div>

          <label className="block text-xs font-semibold text-muted-foreground">
            Subject
            <select
              name="subject"
              value={formData.subject}
              onChange={onFieldChange}
              className={PUBLIC_INPUT_CLASS}
            >
              {contactSubjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold text-muted-foreground">
            Message *
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={onFieldChange}
              placeholder="Tell us about your brand and marketing goals..."
              className={PUBLIC_TEXTAREA_CLASS}
            />
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full py-6 font-semibold shadow-md hover:shadow-primary/20"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send Message
                <Send className="size-4" />
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
