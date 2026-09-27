"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkoutPlan } from "../lib/plan-storage";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = useWorkoutPlan();
    const isHome = pathname === "/" || pathname.startsWith("/workouts/");
    const isMyPlan = pathname === "/my-plan";

    return (
        <header className="relative flex flex-nowrap items-center justify-between gap-2 border-b border-[#1d1f22] p-2 max-[480px]:gap-1 max-[480px]:p-1">
            <Link className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-bold text-base text-[#f1f2f2] max-[600px]:text-sm max-[480px]:gap-1 max-[480px]:text-xs" href="/">
                <Image
                    src="/assets/logo.png"
                    alt="Fitlog"
                    width={28}
                    height={28}
                />

                <span>FITLOG</span>
            </Link>

            <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-4 whitespace-nowrap text-base font-bold max-[600px]:gap-0 max-[600px]:text-sm max-[480px]:relative max-[480px]:left-auto max-[480px]:min-w-0 max-[480px]:flex-1 max-[480px]:translate-x-0 max-[480px]:justify-center max-[480px]:text-[11px]">
                <Link
                    className={`rounded-full px-4 py-1 no-underline max-[600px]:px-2 max-[480px]:px-1 ${isHome ? "bg-[#20250b] text-[#ccff00]" : "text-[#a0a2a7] hover:text-white"}`}
                    href="/"
                >
                    Workout
                </Link>
                <Link
                    className={`px-4 py-1 no-underline max-[600px]:px-2 max-[480px]:px-1 ${isMyPlan ? "rounded-full bg-[#20250b] text-[#ccff00]" : "text-[#a0a2a7] hover:text-white"}`}
                    href="/my-plan"
                >
                    My Plan
                </Link>
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-3 whitespace-nowrap text-base font-bold max-[600px]:gap-1 max-[600px]:text-sm max-[480px]:gap-1 max-[480px]:text-[10px]">
                <Link className="flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-1 text-[#101200] transition hover:brightness-110 max-[600px]:gap-1 max-[600px]:px-2 max-[480px]:px-1" href="/my-plan">
                    <span>Plan</span>
                    <span>{plan.length}</span>
                </Link>
                <Link className="flex items-center gap-2 rounded-full border border-[#292b2f] px-4 py-1 text-[#bfc1c5] transition hover:border-[#4b5464] hover:text-white max-[600px]:gap-1 max-[600px]:px-2 max-[480px]:px-1" href="/my-plan">
                    <span>Saved</span>
                    <span>{saved.length}</span>
                </Link>
            </div>
        </header>
    );
}