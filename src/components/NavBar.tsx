import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="mb-4">
      <Link
        href={"job-tracker"}
      >
        Job Application Tracker
      </Link>
      <Link
        href={"manage-states"}
      >
        Manage Stages
      </Link>
    </nav>
  );
}
