import Image from 'next/image';

export default function MainHeroSection() {
  return (
    <section className="relative hidden md:block h-[346px]">
      <Image
        src={`/hero-photo.jpg`}
        alt="Page landing image of a hotel room, "
        fill
        sizes="100vw"
        priority
        className="brightness-30 object-cover object-center"
      ></Image>
      <div className="absolute text-white bottom-[30%] left-[50px] max-w-[560px]">
        <div>
          <h1 className="font-bold">Book your next stay today with HOLIDAZE</h1>
          <h2 className="flex justify-end font-bold">Choose the best one</h2>
        </div>
        <div className="absolute top-[-62px] w-[101px] h-[217px]">
          <Image
            src={`/hero-square.png`}
            alt="Decorative teal frame accent"
            fill
            sizes="101px"
            loading="eager"
            className="object-fill"
            priority
          />
        </div>
      </div>
    </section>
  );
}
