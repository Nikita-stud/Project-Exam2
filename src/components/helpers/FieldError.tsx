export default function FieldError({
  id,
  message,
  variant = 'default',
  className = '',
}: {
  id: string;
  message?: string;
  variant?: 'default' | 'textarea';
  className?: string;
}) {
  if (!message) return null;
  const baseClassName =
    variant === 'textarea'
      ? 'text-primary flex justify-end mt-[-8px] text-sm mb-[-20px]'
      : 'text-primary absolute top-full end-0 w-full text-right text-sm mb-0';
  return (
    <p id={id} role="alert" className={`${baseClassName} ${className}`.trim()}>
      {message}
    </p>
  );
}
