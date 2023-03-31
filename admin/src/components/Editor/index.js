import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Box, Flex, Button, Typography } from "@strapi/design-system";
import styled from "styled-components";
import "./style.css";

const ActiveButton = styled(Button)`
  &.active {
    background: ${({ theme }) => theme.colors.primary100};
    border-color: ${({ theme }) => theme.colors.primary200};
    span {
      color: ${({ theme }) => theme.colors.primary700};
    }
  }
`;

export default ({ name, onChange, value, error }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value ? JSON.parse(value) : "",
    onUpdate: ({ editor }) => {
      onChange({ target: { name, value: JSON.stringify(editor.getJSON()) } });
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <>
      <Box
        borderColor={error ? "danger600" : "neutral200"}
        borderStyle="solid"
        borderWidth="1px"
        hasRadius
      >
        {editor && (
          <Box padding={2} background="neutral100">
            <Flex gap={2}>
              <ActiveButton
                variant="tertiary"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "active" : ""}
              >
                <Typography variant="pi">Italic</Typography>
              </ActiveButton>
              <ActiveButton
                variant="tertiary"
                onClick={setLink}
                className={editor.isActive("link") ? "active" : ""}
              >
                <Typography variant="pi">Link</Typography>
              </ActiveButton>
              <Button
                variant="tertiary"
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive("link")}
              >
                <Typography variant="pi">Unlink</Typography>
              </Button>
            </Flex>
          </Box>
        )}
        <Box background='neutral0' padding={4}>
          <Typography>
            <EditorContent editor={editor} />
          </Typography>
        </Box>
      </Box>
    </>
  );
};
