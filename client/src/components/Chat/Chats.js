import React from "react";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { styled } from "@mui/joy/styles";

function Chats() {
  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography["body-sm"],
    textAlign: "center",
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: "1px solid",
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={0}
      >
        <Item onClick={() => alert("Hi")}>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}

export default Chats;
