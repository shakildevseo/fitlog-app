"use client";

import Image from "next/image";
import Link from "next/link";
import { useWorkoutPlan } from "../lib/plan-storage";

export default function Navbar() {
    const { plan, saved } = useWorkoutPlan();

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
                    className="rounded-full bg-[#20250b] px-4 py-1 text-[#ccff00] no-underline max-[600px]:px-2 max-[480px]:px-1"
                    href="/"
                >
                    Workouts
                </Link>
                <Link
                    className="px-4 py-1 text-[#a0a2a7] no-underline hover:text-white max-[600px]:px-2 max-[480px]:px-1"
                    href="/my-plan"
                >
                    My Plan
                </Link>
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-3 whitespace-nowrap text-base font-bold max-[600px]:gap-1 max-[600px]:text-sm max-[480px]:gap-1 max-[480px]:text-[10px]">
                <div className="flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-1 text-[#101200] max-[600px]:gap-1 max-[600px]:px-2 max-[480px]:px-1">
                    <span>Plan</span>
                    <span>{plan.length}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#292b2f] px-4 py-1 text-[#bfc1c5] max-[600px]:gap-1 max-[600px]:px-2 max-[480px]:px-1">
                    <span>Saved</span>
                    <span>{saved.length}</span>
                </div>
            </div>
        </header>
    );
}