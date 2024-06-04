import StageList from "@/components/StageList";

export default function ManageStates() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <StageList />
      </div>
    </main>
  );
}
