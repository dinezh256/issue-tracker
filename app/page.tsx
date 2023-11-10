import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";
// import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const statusProps = {
    open,
    inProgress,
    closed,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...statusProps} />
        <IssueChart {...statusProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summarry of issues",
};
