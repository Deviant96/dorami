import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-24">
      <div className="container mx-auto p-4">
        <p>Please choose you action from the navigaton menu.</p>
        <p className="break-words">{JSON.stringify(session)}</p>
      </div>
    </main>
  );
}
