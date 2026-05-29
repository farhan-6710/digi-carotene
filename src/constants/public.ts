export const clinicMeta = {
  name: "Reviva",
  tagline: "Physiotherapy & Rehabilitation Clinic",
  description:
    "Personalised recovery programmes that restore movement, reduce pain, and help you return to everyday life with confidence.",
} as const;

export const heroContent = {
  eyebrow: "Physiotherapy & Rehab",
  title: "Recover stronger with Reviva",
  description:
    "Expert-led rehabilitation for sports injuries, post-operative recovery, chronic pain, and mobility restoration — delivered with care, clarity, and consistency.",
  primaryCta: { label: "Explore our clinic", to: "/about" },
  secondaryCta: { label: "Staff portal", to: "/admin/dashboard" },
} as const;

export const serviceHighlights = [
  {
    title: "Sports Injury Rehab",
    description:
      "Structured return-to-play plans for sprains, strains, and performance-related injuries.",
  },
  {
    title: "Post-Operative Recovery",
    description:
      "Guided rehabilitation after surgery with progressive strength and mobility milestones.",
  },
  {
    title: "Chronic Pain Management",
    description:
      "Evidence-based treatment for back, neck, and joint pain with long-term movement strategies.",
  },
  {
    title: "Mobility & Gait Training",
    description:
      "Balance, posture, and walking programmes tailored to each patient’s daily goals.",
  },
] as const;

export const clinicStats = [
  { label: "Sessions delivered monthly", value: "180+" },
  { label: "Patient satisfaction", value: "96%" },
  { label: "Average recovery plan", value: "6–8 wks" },
  { label: "Therapists on staff", value: "12" },
] as const;

export const aboutContent = {
  title: "About Reviva",
  intro:
    "Reviva is a physiotherapy and rehabilitation clinic built around one belief: recovery should feel structured, supportive, and measurable.",
  sections: [
    {
      title: "Our approach",
      body: "Every patient receives a clear plan with defined milestones — from initial assessment through active rehab and discharge. We combine manual therapy, exercise prescription, and progress tracking in one calm clinical environment.",
    },
    {
      title: "Who we help",
      body: "From athletes returning to sport to patients rebuilding strength after surgery, our team supports a wide range of recovery journeys with the same level of attention and professionalism.",
    },
    {
      title: "Clinic operations",
      body: "Our staff portal keeps appointments, session activity, and patient progress organised — so clinicians can focus on care while the clinic runs smoothly behind the scenes.",
    },
  ],
  values: ["Patient-first care", "Evidence-based rehab", "Transparent progress"],
} as const;

export const publicNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Staff portal", to: "/admin/dashboard" },
] as const;
