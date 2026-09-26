import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../lib/workouts";

function StatIcon({ type }: { type: "time" | "calories" | "rating" }) {
    if (type === "time") {
        return <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" stroke="currentColor" /><path d="M8 4.5V8l2.25 1.5" stroke="currentColor" strokeLinecap="round" /></svg>;
    }

    if (type === "calories") {
        return <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 16 16"><path d="M8.2 1.5c.5 2.2-.9 2.7-.2 4.1.4.8 1.2 1.1 1.7 1.8.6-1 .7-2 .5-3.1 2 1.7 3.4 3.5 3.4 5.7a5.6 5.6 0 0 1-11.2 0c0-2.4 1.5-4.3 3.5-6-.1 1.4.3 2.2 1 2.7.8-1.3 1.5-2.8 1.3-5.2Z" stroke="currentColor" strokeLinejoin="round" /></svg>;
    }

    return <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 16 16"><path d="m8 1.8 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.2l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.8Z" stroke="currentColor" strokeLinejoin="round" /></svg>;
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
    return (
        <Link
            className="group overflow-hidden rounded-md border border-[#24262c] bg-[#14161d] transition-colors hover:border-[#555b38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
            href={`/workouts/${workout.id}`}
        >
            <div className="relative aspect-[2/1] overflow-hidden bg-[#20232b]">
                <Image
                    alt={`${workout.name} illustration`}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    fill
                    loading={workout.image.includes("2151666701.jpg") ? "eager" : "lazy"}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    src={workout.image}
                />
            </div>
            <div className="p-3">
                <div className="mb-2 flex min-h-4 flex-wrap gap-1.5">
                    {workout.muscleGroups.map((group) => (
                        <span key={group} className="rounded-sm bg-[#ccff00] px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-[#14160a]">
                            {group.toUpperCase()}
                        </span>
                    ))}
                </div>
                <h3 className="truncate text-xs font-extrabold uppercase text-[#f4f4f5] group-hover:text-[#ccff00]">
                    {workout.name}
                </h3>
                <p className="mt-1 truncate text-[10px] text-[#858894]">{workout.equipment}</p>
                <div className="mt-3 flex items-center gap-3 border-t border-[#24262c] pt-2 text-[10px] text-[#a0a2a7]">
                    <span className="flex items-center gap-1"><StatIcon type="time" />{workout.duration} min</span>
                    <span className="flex items-center gap-1"><StatIcon type="calories" />{workout.caloriesBurned} kcal</span>
                    <span className="flex items-center gap-1"><StatIcon type="rating" />{workout.rating.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    );
}