import Hero from "./components/hero";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <Hero />
      <div className="scroll-mt-8 pt-16" id="library" />
    </main>
  );
}
