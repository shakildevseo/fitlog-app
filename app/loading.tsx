export default function Loading() {
    return (
        <main className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-4 py-12 text-sm text-[#9296a0] sm:px-6 lg:px-8">
            <p aria-live="polite" className="inline-flex items-center gap-3" role="status">
                <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-[#30343b] border-t-[#ccff00]" />
                Loading workouts...
            </p>
        </main>
    );
}