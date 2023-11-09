"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssuesStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || 'ALL'}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        const orderBy = searchParams.get("orderBy");

        if (status && status !== 'ALL') params.append("status", status);
        if (orderBy) params.append("orderBy", orderBy);

        const query = params.size ? '?' + params.toString() : '';
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger
        className="cursor-pointer"
        placeholder="Filter by Status..."
      />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            className="cursor-pointer"
            key={status.value ?? "ALL"}
            value={status.value ?? "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
