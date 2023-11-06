import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button className="cursor-pointer">
      <Link href={`/issues/edit/${issueId}`}>
        <Flex gap="3" align="center">
          <Pencil2Icon />
          <Text>Edit Issue</Text>
        </Flex>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
