import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import styled from "styled-components";

const ArticleWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: solid var(--color-red-2);
  border-radius: 0.3rem;
`;

const Title = styled.input`
  display: block;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
`;

const StyledEditor = styled(ContentEditable)`
  height: 100%;
  width: 100%;
  outline: none;
  text-indent: 1.5em;
`;

function Article({ title, content, onTextChange, onTitleChange }) {
  const initialConfig = {
    namespace: "Editor",
    editorState: content,
    onError: (error) => console.log(error),
  };

  function handleTitleChange(e) {
    const title = e.target.value;
    onTitleChange(title);
  }

  function handleEditorChange(editorState) {
    onTextChange(editorState);
  }

  return (
    <ArticleWrapper>
      <Title
        type="text"
        value={title || "Без названия"}
        onChange={handleTitleChange}
      />
      <LexicalComposer initialConfig={initialConfig}>
        <OnChangePlugin onChange={handleEditorChange} />
        <RichTextPlugin contentEditable={<StyledEditor />} />
        <HistoryPlugin />
      </LexicalComposer>
    </ArticleWrapper>
  );
}

export default Article;
