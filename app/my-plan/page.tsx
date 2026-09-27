import MyPlanContent from "../components/my-plan-content";
import { getWorkouts } from "../lib/workouts";

export default async function MyPlan() {
    const workouts = await getWorkouts();

    return <MyPlanContent workouts={workouts} />;
}