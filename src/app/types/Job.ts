export interface Job {
  id: number;
  companyName: string;
  isForeign: boolean;
  details: string;
  date: string;
  notes: string;
  status: "pass" | "do not pass" | "on-going" | "gone" | "cancel";
  progress: string[];
}
