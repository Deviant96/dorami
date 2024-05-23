import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <NavBar />
        {children}
      </div>
    </main>
  );
}
