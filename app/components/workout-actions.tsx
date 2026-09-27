"use client";

import { useEffect, useRef, useState } from "react";
import { addToPlan, addToSaved, getPlanLists, MAX_PLAN_SIZE, useWorkoutPlan } from "../lib/plan-storage";

function PlusIcon() {
    return (
        <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function BookmarkIcon() {
    return (
        <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M7 4.75A1.75 1.75 0 0 1 8.75 3h6.5A1.75 1.75 0 0 1 17 4.75v15.31a.75.75 0 0 1-1.13.66L12 18.8l-3.87 2.42A.75.75 0 0 1 7 20.06V4.75Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function WorkoutActions({ workoutId }: { workoutId: number }) {
    const { plan, saved } = useWorkoutPlan();
    const isInPlan = plan.includes(workoutId);
    const planIsFull = plan.length >= MAX_PLAN_SIZE;
    const isSaved = saved.includes(workoutId);
    const [message, setMessage] = useState("");
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timeout.current) clearTimeout(timeout.current);
    }, []);

    function showToast(text: string) {
        setMessage(text);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setMessage(""), 2600);
    }

    function addWorkoutToPlan() {
        const plan = getPlanLists().plan;

        if (plan.includes(workoutId)) {
            showToast("Already in today's plan");
        } else {
            showToast(addToPlan(workoutId) ? "Added to today's plan" : "Unable to add workout");
        }
    }

    return (
        <>
            <div className="mt-7 flex flex-wrap gap-3">
                <button
                    className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0c0f12] shadow-[0_12px_30px_rgba(204,255,0,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isInPlan || planIsFull}
                    onClick={addWorkoutToPlan}
                    type="button"
                    title={isInPlan ? "Already in today's plan" : planIsFull ? "Today's plan is full" : undefined}
                >
                    <PlusIcon />
                    {isInPlan ? "Added to today's plan" : "Add to today's plan"}
                </button>

                <button
                    className="inline-flex items-center gap-2 rounded-full border border-[#2b313b] bg-transparent px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#edf0f3] transition hover:border-[#4b5464] hover:bg-[#121821] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSaved}
                    onClick={() => showToast(addToSaved(workoutId) ? "Saved for later" : "Already saved for later")}
                    type="button"
                >
                    <BookmarkIcon />
                    {isSaved ? "Saved for later" : "Save for later"}
                </button>
            </div>
            <div aria-atomic="true" aria-live="polite" className="pointer-events-none fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
                {message && (
                    <p className="rounded-md border border-[#3b4530] bg-[#171d12] px-4 py-3 text-sm font-semibold text-[#ccff00] shadow-xl">
                        {message}
                    </p>
                )}
            </div>
        </>
    );
}