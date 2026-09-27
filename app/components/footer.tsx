import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#1d1f22] bg-[#0a0b0d]">
      <div className="mx-auto flex max-w-[96%] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-2 py-3 text-[11px] text-[#858a92] sm:text-xs">
        <div className="flex items-center gap-1.5 whitespace-nowrap font-bold tracking-[0.12em] text-[#f1f2f2] text-base">
          <Image
            src="/assets/logo.png"
            alt="Fitlog"
            width={25}
            height={25}
          />
          <span>FITLOG</span>
        </div>

        <p className="m-0 min-w-0 text-right text-[#858a92]">
          <span>© {new Date().getFullYear()} FitLog</span>
          <span className="mx-2 text-[#4b4f54]">—</span>
          <span>Workout Library. Train hard, log honest.</span>
        </p>
      </div>
    </footer>
  );
}