'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;
