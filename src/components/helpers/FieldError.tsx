export default function FieldError({
  id,
  message,
  variant = 'default',
}: {
  id: string;
  message?: string;
  variant?: 'default' | 'textarea';
}) {
  if (!message) return null;
  const className =
    variant === 'textarea'
      ? 'text-primary flex justify-end mt-[-8px] text-sm mb-[-20px]'
      : 'text-primary absolute top-full end-0 text-sm mb-0';
  return (
    <p id={id} role="alert" className={className}>
      {message}
    </p>
  );
}
