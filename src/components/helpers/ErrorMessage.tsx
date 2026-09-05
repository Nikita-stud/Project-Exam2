export default function ErrorMessage({
  message,
  className = '',
}: {
  message: string | null | undefined;
  className?: string;
}) {
  if (!message) return null;
  return (
    <div
      className={`p-[20px] bg-primary/10 border border-primary rounded-[10px] flex flex-col gap-2 justify-center align-middle ${className}`}
    >
      <p role="alert" className="text-primary font-bold text-center text-xl">
        {message}
      </p>
    </div>
  );
}
