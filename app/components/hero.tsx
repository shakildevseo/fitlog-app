import Image from "next/image";

export default function Hero() {
    return (
        <section className="grid min-h-120 overflow-hidden rounded-xl border border-[#24262c] bg-[#14161d] px-6 py-8 sm:px-10 lg:grid-cols-[1fr_260px] lg:items-center lg:px-12 lg:py-10">
            <div className="max-w-2xl">
                <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-[#ccff00]">
                    WORKOUT LIBRARY
                </p>
                <h1 className="max-w-155 text-4xl   text-[#f4f4f5] sm:text-5xl lg:text-[46px] font-extrabold">
                    TRAIN WITH INTENT. LOG
                    <br />
                    EVERY SET.
                </h1>
                <p className="mt-4 max-w-120 text-sm leading-6 text-[#999ca6]">
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                    <br />
                    into today&apos;s plan, and watch the week&apos;s work add up.
                </p>
                <a
                    className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-md bg-[#ccff00] px-4 text-[11px] font-bold tracking-wide text-[#11130a] transition-colors hover:bg-[#ddff55] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccff00]"
                    href="#library"
                >
                    BROWSE WORKOUTS
                    <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M5 12h14m-6-6 6 6-6 6"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>
                </a>
            </div>
            <div className="relative mx-auto mt-6 size-56 max-w-full lg:mt-0 lg:size-64">
                <Image
                    alt="gym  Image"
                    className="object-contain"
                    fill
                    priority
                    sizes="(max-width: 1024px) 14rem, 16rem"
                    src="/assets/banner.png"
                />
            </div>
        </section>
    );
}