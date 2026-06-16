import type { ContactDetailItem } from "@/features/public/types/types";

export const contactSectionContent = {
  badge: "Get In Touch",
  title: "Let's build something great together",
  description:
    "Ready to take your social presence and brand growth to the next level? Fill out the form and our team will get back to you within 24 hours.",
} as const;

export const contactDetails: ContactDetailItem[] = [
  {
    id: "email",
    label: "Email Us",
    value: "hello@digicarotene.com",
    href: "mailto:hello@digicarotene.com",
    icon: "Mail",
  },
  {
    id: "phone",
    label: "Call Us",
    value: "+1 (555) 0199",
    href: "tel:+15550199",
    icon: "Phone",
  },
  {
    id: "office",
    label: "Our Office",
    value: "100 Creative Way, Suite 400, San Francisco, CA",
    icon: "MapPin",
  },
];

export const CONTACT_FORM_DEFAULTS = {
  name: "",
  email: "",
  subject: "General Inquiry",
  message: "",
} as const;

export const contactSubjectOptions = [
  "General Inquiry",
  "Services Inquiry",
  "Client Portal Access",
  "Partnership",
] as const;

export const CONTACT_FORM_SUCCESS_MESSAGE =
  "Thank you! Your message has been sent successfully.";

export const CONTACT_FORM_SUBMIT_DELAY_MS = 1200;
