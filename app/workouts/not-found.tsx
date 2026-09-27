import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      <p className="text-sm font-bold text-[#ccff00]">404</p>
      <h1 className="mt-2 text-3xl font-black text-[#f4f4f5]">Workout not found</h1>
      <p className="mt-2 text-sm text-[#9296a0]">This workout does not exist.</p>
      <Link className="mt-6 rounded-full bg-[#ccff00] px-5 py-2.5 text-sm font-bold text-[#101200]" href="/">
        Back to workouts
      </Link>
    </main>
  );
}