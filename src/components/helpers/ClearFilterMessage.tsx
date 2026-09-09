import Image from 'next/image';
import Link from 'next/link';

export default function ClearFilterMessage({
  onClear,
}: {
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-[50px] my-[50px] text-center">
      <Link href="/">
        <Image
          className="w-auto"
          src="/text-logo.png"
          alt="Logo"
          width={300}
          height={200}
        />
      </Link>
      <h3>We could not find a match</h3>
      <p>Lets clear your filers and start over</p>
      <button onClick={onClear} className="cta-primary-lg">
        <i className="fa-regular fa-trash-can" aria-hidden="true"></i>
        Clear filter
      </button>
    </div>
  );
}
