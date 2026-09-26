export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

const WORKOUTS_API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(WORKOUTS_API_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Unable to load workouts.");
  }

  return response.json() as Promise<Workout[]>;
}