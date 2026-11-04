import { Skeleton } from "@heroui/react";

export default function SkeletonComponent() {
  return (
    <div className="shadow-panel w-full space-y-5 rounded-lg bg-transparent p-4">
      <Skeleton className="w-full h-50 rounded-3xl" />
      <Skeleton className="w-full h-50 rounded-3xl" />
      <Skeleton className="w-full h-50 rounded-3xl" />
    </div>
  );
}
