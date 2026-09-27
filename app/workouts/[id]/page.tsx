import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/workout-actions";
import { getWorkouts } from "../../lib/workouts";

export default async function WorkoutDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const workouts = await getWorkouts();
    const workout = workouts.find((item) => item.id === Number(id));

    if (!workout) {
        notFound();
    }

    const keySpecs = [
        { label: "Equipment", value: workout.equipment },
        { label: "Difficulty", value: workout.difficulty },
        { label: "Sets", value: workout.sets.toString() },
        { label: "Reps", value: workout.reps },
        { label: "Duration", value: `${workout.duration} min` },
        { label: "Calories", value: `${workout.caloriesBurned} kcal` },
        { label: "Rating", value: workout.rating.toFixed(1) },
    ];

    return (
        <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
            <article className="overflow-hidden rounded-[26px] border border-[#1f242b] bg-[#0d1117] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="grid lg:grid-cols-[1.08fr_1.28fr]">
                    <div className="relative min-h-[420px] bg-[#181d24] lg:min-h-full">
                        <Image
                            alt={`${workout.name} illustration`}
                            className="object-cover"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            src={workout.image}
                        />
                    </div>

                    <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-9">
                        <div className="flex flex-wrap gap-2">
                            {workout.muscleGroups.map((group) => (
                                <span key={group} className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d1117]">
                                    {group}
                                </span>
                            ))}
                        </div>

                        <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#f3f5f7] sm:text-[2.3rem]">
                            {workout.name.toUpperCase()}
                        </h1>

                        <p className="mt-4 max-w-[62ch] text-[15px] leading-7 text-[#9aa1ad]">
                            {workout.description}
                        </p>

                        <div className="mt-6 overflow-hidden rounded-xl border border-[#1f242b] bg-[#111720]">
                            {keySpecs.map((spec, index) => (
                                <div
                                    key={spec.label}
                                    className={`grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 text-sm ${index !== keySpecs.length - 1 ? "border-b border-[#1f242b]" : ""}`}
                                >
                                    <span className="font-semibold uppercase tracking-[0.12em] text-[#7d8591]">{spec.label}</span>
                                    <span className="font-semibold text-[#edf0f3]">{spec.value}</span>
                                </div>
                            ))}
                        </div>

                        <h2 className="mt-7 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f3f5f7]">
                            Instructions
                        </h2>

                        <ol className="mt-4 space-y-3 text-[13px] leading-6 text-[#b7bdc6]">
                            {workout.instructions.map((instruction, index) => (
                                <li key={instruction} className="flex gap-3">
                                    <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-[#111720] text-[10px] font-bold text-[#ccff00] ring-1 ring-[#2a2f39]">
                                        {index + 1}
                                    </span>
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ol>

                        <WorkoutActions workoutId={workout.id} />
                    </div>
                </div>
            </article>
        </main>
    );
}