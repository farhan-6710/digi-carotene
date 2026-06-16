import { useCallback, useState } from "react";

import {
  CONTACT_FORM_DEFAULTS,
  CONTACT_FORM_SUBMIT_DELAY_MS,
  CONTACT_FORM_SUCCESS_MESSAGE,
} from "@/features/public/constants/contact";
import type { ContactFormData } from "@/features/public/types/types";
import { showToast } from "@/shared/utils/showToast";

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    ...CONTACT_FORM_DEFAULTS,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      showToast("success", CONTACT_FORM_SUCCESS_MESSAGE);
      setFormData({ ...CONTACT_FORM_DEFAULTS });
      setIsSubmitting(false);
    }, CONTACT_FORM_SUBMIT_DELAY_MS);
  }, []);

  return {
    formData,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  };
}
