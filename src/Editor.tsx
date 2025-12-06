import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup, EditorView } from "codemirror";
import React, { useEffect, useRef } from "react";

const initialText = "// Hello World \n// Write your code here... \n\nconsole.log('Made with Curiousity by Mustafa Sayyed')


#include <stdio.h> #include <stdlib.h>

struct Node {

int data;

struct Node* prev; struct Node* next;

struct Node* createNode(int value) {

struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

newNode->data = value;

newNode->prev = NULL;

newNode->next = NULL;

return newNode;

struct Node* insertBeginning(struct Node* head, int value) { struct Node* newNode = createNode(value);

newNode->next = head;

if (head != NULL) {

head->prev = newNode;
}

head = newNode:

return head:

void display(struct Node* head) {

struct Node* temp = head;

while (temp!= NULL) {

printf("%d ", temp->data);

temp = temp->next; // single pointer movement

int main() {

struct Node* head = NULL;

head = insertBeginning(head, 30); head = insertBeginning(head, 20); head = insertBeginning(head, 10);

printf("Doubly Linked List: "); display(head);

return 0;
}


" + "\n".repeat(5);

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
