import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesStatusFilter from "./IssuesStatusFilter";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssuesStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
