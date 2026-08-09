import type { FieldErrors, FieldValues } from 'react-hook-form';

export default function ErrorField(formErrors: FieldErrors<FieldValues>) {
  const firstErrorField = Object.keys(formErrors)[0];
  if (firstErrorField) {
    const fieldElement = document.getElementsByName(firstErrorField)[0];
    fieldElement?.focus();
  }
}
