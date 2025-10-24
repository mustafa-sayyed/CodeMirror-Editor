import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup, EditorView } from "codemirror";
import React, { useEffect, useRef } from "react";

const initialText = "// Hello World \n// Write your code here... \n\nconsole.log('Made with Curiousity by Mustafa Sayyed')" + "\n".repeat(23);

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const customTheme = EditorView.theme({
    ".cm-content": {
        fontSize: "18px",
    }
  }, {dark: true})

  useEffect(() => {
    const editorState = EditorState.create({
      doc: initialText,
      extensions: [basicSetup, oneDark, javascript({ jsx: true, typescript: true }), customTheme],
    });

    const editorView = new EditorView({
      state: editorState,
      parent: editorRef.current || undefined,
    });

    return () => {
      editorView.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center p-4 min-h-screen w-full">
      <div ref={editorRef} className="w-full h-fit border-2 border-black rounded-md" />
    </div>
  );
};

export default Editor;
