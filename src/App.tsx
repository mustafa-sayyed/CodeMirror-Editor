import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { oneDark } from "@codemirror/theme-one-dark";
import { maskExtension } from "./maskExtension";
import { Eye, EyeOff } from "lucide-react";

const App: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [hidden, setHidden] = useState<boolean>(false);
  const maskCompartment = useRef(new Compartment()).current;

  useEffect(() => {
    if (!editorRef.current) return;

    const onUpdate = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        console.log(`New Content: ${update.state.doc.toString()}`);
      }
    });

    const customeTheme = EditorView.theme({
      ".cm-editor": {
        minHeight: "400px",
      },
      "&": {
        fontSize: "18px",
      },
    });

    const initialState = EditorState.create({
      doc: "Hello World",
      extensions: [
        basicSetup,
        onUpdate,
        javascript(),
        oneDark,
        customeTheme,
        maskCompartment.of(maskExtension(hidden)),
      ],
    });

    const view = new EditorView({
      state: initialState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: maskCompartment.reconfigure(maskExtension(hidden)),
      });
    }
  }, [hidden]);

  return (
    <div className="h-screen w-full flex flex-col px-10 justify-center text-black">
      <h1 className="text-2xl mb-2 text-center">Hello CodeMirror Editor</h1>
      <button
        onClick={() => setHidden(!hidden)}
        className="cursor-pointer block w-fit p-2">
        {hidden ? <Eye /> : <EyeOff />}
      </button>
      <div
        ref={editorRef}
        className="w-full min-h-10 border-2 rounded-sm border-gray-700"></div>
    </div>
  );
};

export default App;
