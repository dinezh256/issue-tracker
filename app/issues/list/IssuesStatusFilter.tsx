'use client';

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from 'next/navigation'

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssuesStatusFilter = () => {
  const router = useRouter()

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === 'ALL' ? '' : `?status=${status}`
        router.push(`/issues/list${query}`)
      }}
    >
      <Select.Trigger className="cursor-pointer" placeholder="Filter by Status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item className="cursor-pointer" key={status.value} value={status.value ?? "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
