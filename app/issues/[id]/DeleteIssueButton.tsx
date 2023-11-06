"use client";

import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [trigger, setTrigger] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const deleteIssue = async () => {
    setTrigger(false);
    try {
      setSubmitting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError(true);
    }

  };

  return (
    <>
      <Button disabled={isSubmitting} color="red" className="cursor-pointer" onClick={() => setTrigger(true)}>
        <TrashIcon />
        Delete Issue
        {isSubmitting && <Spinner />}
      </Button>
      <AlertDialog.Root open={trigger}>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure, you want to delete the issue? This action taken can
            not be undone.
          </AlertDialog.Description>
          <Flex className="mt-2" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button className="cursor-pointer" color="gray" variant="soft" onClick={() => setTrigger(false)}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button className="cursor-pointer bg-red-600" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button
              className="cursor-pointer mt-2"
              color="gray"
              variant="soft"
              onClick={() => setError(false)}
            >
              Ok
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
