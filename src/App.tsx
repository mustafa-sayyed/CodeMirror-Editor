import { EditorState } from "@codemirror/state"
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import type React from "react"
import { useEffect, useRef } from "react"

const App: React.FC = () => {
  const currentRef = useRef(null) ;

  useEffect(() => {

    const onUpdate = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        console.log(`New Content: ${update.state.doc.toString()}`);
        
      }
    } )

    const initialState = EditorState.create({
      doc: "Hello World",
      extensions: [basicSetup, onUpdate, javascript()]
    })

    const view = new EditorView({
      state: initialState,
      parent: currentRef.current || undefined,
    })

    return () => {
      view.destroy();
    }
  }, [])

  return (
    <div className="h-screen w-full flex flex-col px-10 justify-center text-black">
      <h1 className="text-2xl mb-2 text-center">Hello CodeMirror Editor</h1>
        <div ref={currentRef} className="w-full min-h-72 border-2 rounded-sm border-gray-700">
        </div>
    </div>
  )
}

export default App
