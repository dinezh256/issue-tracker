import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1.75rem" />
      <Skeleton height="20rem" className="mt-3" />
    </Box>
  );
};

export default IssueFormSkeleton;
