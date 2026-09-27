"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { removeFromPlan, removeFromSaved, useWorkoutPlan } from "../lib/plan-storage";
import type { Workout } from "../lib/workouts";

type PlanTab = "plan" | "saved";
type SortOption = "duration" | "caloriesBurned" | "rating";

const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: "duration", label: "Duration" },
    { value: "caloriesBurned", label: "Calories" },
    { value: "rating", label: "Rating" },
];

const sortDirections: Record<SortOption, 1 | -1> = {
    duration: 1,
    caloriesBurned: -1,
    rating: -1,
};

function sortWorkoutList(workouts: Workout[], ids: number[], sortBy: SortOption) {
    return [...workouts].sort((first, second) => {
        const difference = Number(first[sortBy]) - Number(second[sortBy]);
        return difference * sortDirections[sortBy] || ids.indexOf(first.id) - ids.indexOf(second.id);
    });
}

export default function MyPlanContent({ workouts }: { workouts: Workout[] }) {
    const { plan, saved } = useWorkoutPlan();
    const [activeTab, setActiveTab] = useState<PlanTab>("plan");
    const [sortBy, setSortBy] = useState<SortOption>("duration");
    const [message, setMessage] = useState("");
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const planWorkouts = plan
        .map((id) => workouts.find((workout) => workout.id === id))
        .filter((workout): workout is Workout => workout !== undefined);

    const activeIds = activeTab === "plan" ? plan : saved;
    const activeWorkouts = activeIds
        .map((id) => workouts.find((workout) => workout.id === id))
        .filter((workout): workout is Workout => workout !== undefined);
    const sortedWorkouts = sortWorkoutList(activeWorkouts, activeIds, sortBy);

    const totals = planWorkouts.reduce(
        (summary, workout) => ({
            minutes: summary.minutes + workout.duration,
            calories: summary.calories + workout.caloriesBurned,
        }),
        { minutes: 0, calories: 0 },
    );

    useEffect(() => () => {
        if (timeout.current) clearTimeout(timeout.current);
    }, []);

    function showToast(text: string) {
        setMessage(text);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setMessage(""), 2600);
    }

    function markAsDone(workoutId: number) {
        showToast(removeFromPlan(workoutId) ? "Workout marked as done" : "Workout could not be updated");
    }

    function removeWorkout(workoutId: number) {
        const removed = activeTab === "plan" ? removeFromPlan(workoutId) : removeFromSaved(workoutId);
        showToast(removed ? "Workout removed" : "Workout could not be removed");
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 pb-6 pt-7 sm:px-6 lg:px-8">
            <header>
                <h1 className="text-2xl font-black uppercase text-[#f4f4f5]">MY PLAN</h1>
                <p className="mt-1 text-sm text-[#9296a0]">Cap of five lifts for today. Finish them, then load more.</p>
            </header>

            <section aria-label="Today's plan summary" className="mt-5 grid grid-cols-3 divide-x divide-[#24262c] rounded-lg border border-[#24262c] bg-[#13151c] py-4">
                <div className="px-4 sm:px-5">
                    <p className="text-xs text-[#9296a0]">Exercises</p>
                    <p className="mt-1 text-2xl font-black leading-none text-[#ccff00]">{planWorkouts.length}</p>
                </div>
                <div className="px-4 sm:px-5">
                    <p className="text-xs text-[#9296a0]">Minutes</p>
                    <p className="mt-1 text-2xl font-black leading-none text-[#f4f4f5]">{totals.minutes}</p>
                </div>
                <div className="px-4 sm:px-5">
                    <p className="text-xs text-[#9296a0]">Calories</p>
                    <p className="mt-1 text-2xl font-black leading-none text-[#f4f4f5]">{totals.calories}</p>
                </div>
            </section>

            <div className="mt-5 flex items-center justify-between gap-3">
                <div aria-label="Workout lists" className="inline-flex rounded-md border border-[#24262c] bg-[#13151c] p-1" role="tablist">
                    <button
                        aria-selected={activeTab === "plan"}
                        className={`rounded px-3 py-1.5 text-xs font-semibold transition ${activeTab === "plan" ? "bg-[#22252d] text-[#f4f4f5]" : "text-[#9296a0] hover:text-white"}`}
                        onClick={() => setActiveTab("plan")}
                        role="tab"
                        type="button"
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        aria-selected={activeTab === "saved"}
                        className={`rounded px-3 py-1.5 text-xs font-semibold transition ${activeTab === "saved" ? "bg-[#22252d] text-[#f4f4f5]" : "text-[#9296a0] hover:text-white"}`}
                        onClick={() => setActiveTab("saved")}
                        role="tab"
                        type="button"
                    >
                        Saved
                    </button>
                </div>

                <label className="flex items-center gap-2 text-xs text-[#9296a0]">
                    <span>Sort By</span>
                    <span className="relative inline-flex items-center">
                        <select
                            aria-label="Sort workouts"
                            className="appearance-none rounded-md border border-[#24262c] bg-[#13151c] py-1.5 pl-2 pr-7 text-xs text-[#f4f4f5] outline-none focus:border-[#ccff00]"
                            onChange={(event) => setSortBy(event.target.value as SortOption)}
                            value={sortBy}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <svg aria-hidden="true" className="pointer-events-none absolute right-2 size-3 text-[#9296a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </label>
            </div>

            {sortedWorkouts.length === 0 ? (
                <div className="mt-4 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-[#24262c] px-4 py-8 text-center">
                    <p className="text-base font-black text-[#f4f4f5]">NOTHING HERE YET</p>
                    <p className="mt-1 text-xs text-[#9296a0]">Browse the library and add a lift to get today moving.</p>
                    <Link className="mt-4 inline-flex items-center justify-center rounded-full bg-[#ccff00] px-5 py-2 text-xs font-bold text-[#101200] transition hover:brightness-110" href="/">
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <section aria-label={activeTab === "plan" ? "Today's planned workouts" : "Saved workouts"} className="mt-4 grid gap-3" role="tabpanel">
                    {sortedWorkouts.map((workout, index) => (
                        <article className="flex flex-col gap-3 rounded-lg border border-[#24262c] bg-[#13151c] p-2.5 sm:flex-row sm:items-center sm:gap-4 sm:p-3" key={workout.id}>
                            <Link aria-label={`View ${workout.name} details`} className="group flex min-w-0 flex-1 items-center gap-3" href={`/workouts/${workout.id}`}>
                                <div className="relative aspect-4/3 w-24 shrink-0 overflow-hidden rounded-md bg-[#20232b] sm:w-28">
                                    <Image
                                        alt={`${workout.name} illustration`}
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                        fill
                                        loading={index === 0 ? "eager" : "lazy"}
                                        sizes="112px"
                                        src={workout.image}
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="truncate text-sm font-extrabold uppercase text-[#f4f4f5] group-hover:text-[#ccff00]">{workout.name}</h2>
                                    <p className="mt-0.5 truncate text-xs text-[#9296a0]">{workout.equipment}</p>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#c3c6cc]">
                                        <span className="inline-flex items-center gap-1">
                                            <svg aria-hidden="true" className="size-3 text-[#ccff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            {workout.duration} min
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <svg aria-hidden="true" className="size-3 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.1 2.5c.5 3.3-2.1 4.6-1.2 7.1.4 1.1 1.3 1.6 2.1 1.6 1.4 0 2.3-1.3 2.1-3.2 2.7 2.2 4.2 4.7 3.4 8.1-.8 3.4-3.5 5.4-7 5.4-4.1 0-7-2.7-7-6.6 0-3.1 1.9-5.6 4.8-8.1-.1 2.6.4 3.5 1.4 3.5 1.2 0 1.6-1.4 1.4-2.8-.2-1.4-.6-2.7 0-5Z" /></svg>
                                            {workout.caloriesBurned} kcal
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <svg aria-hidden="true" className="size-3 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24"><path d="m12 2 2.9 6 6.6 1-4.8 4.7 1.1 6.6-5.8-3.1-5.8 3.1 1.1-6.6L2.5 9l6.6-1L12 2Z" /></svg>
                                            {workout.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex flex-wrap items-center justify-start gap-2 sm:shrink-0 sm:justify-end">
                                <Link className="rounded-full border border-[#30333b] px-3 py-1.5 text-[10px] font-semibold text-[#f4f4f5] transition hover:border-[#9296a0]" href={`/workouts/${workout.id}`}>
                                    View Details
                                </Link>
                                {activeTab === "plan" && (
                                    <button
                                        className="inline-flex items-center gap-1 rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-bold text-[#101200] transition hover:brightness-110"
                                        onClick={() => markAsDone(workout.id)}
                                        type="button"
                                    >
                                        <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path d="m5 12 4.2 4.2L19 2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Mark as Done
                                    </button>
                                )}
                                <button
                                    aria-label={`Remove ${workout.name} from ${activeTab === "plan" ? "today's plan" : "saved workouts"}`}
                                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[#9296a0] transition hover:bg-[#22252d] hover:text-white"
                                    onClick={() => removeWorkout(workout.id)}
                                    type="button"
                                >
                                    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /></svg>
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            )}

            <div aria-atomic="true" aria-live="polite" className="pointer-events-none fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
                {message && (
                    <p className="rounded-md border border-[#3b4530] bg-[#171d12] px-4 py-3 text-sm font-semibold text-[#ccff00] shadow-xl">
                        {message}
                    </p>
                )}
            </div>
        </main>
    );
}
