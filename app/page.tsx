import Hero from "./components/hero";
import WorkoutCard from "./components/workout-card";
import { getWorkouts } from "./lib/workouts";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <Hero />

      <section className="scroll-mt-8 pt-16" id="library">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold tracking-wide text-[#f4f4f5]">
            THE LIBRARY
          </h2>
          <p className="mt-1 text-sm text-[#999ca6]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}