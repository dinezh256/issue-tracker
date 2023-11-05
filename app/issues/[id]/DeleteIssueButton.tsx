"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import axios from "axios";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="cursor-pointer bg-red-600">
          <TrashIcon />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure, you want to delete the issue? This action taken can not be
          undone.
        </AlertDialog.Description>
        <Flex className="mt-2" gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button className="cursor-pointer" color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              className="cursor-pointer bg-red-600"
              onClick={async () => {
                const data = await axios.delete("/api/issues/" + issueId);
                if (data.data.success) {
                  router.push("/issues");
                  router.refresh();
                }
              }}
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
