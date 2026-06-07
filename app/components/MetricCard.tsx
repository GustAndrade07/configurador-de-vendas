import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export default function MetricCard({ title, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
      <div className="flex items-center gap-2 text-zinc-500">
        <Icon size={18} />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-zinc-900">{value}</p>
    </div>
  );
}