import NavBar from "@/components/NavBar";
import { auth } from "./auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <NavBar />
        Welcome
        {JSON.stringify(session)}
      </div>
    </main>
  );
}
