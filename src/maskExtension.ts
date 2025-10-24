import type { Range } from "@codemirror/state";
import {
  Decoration,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";

class maskCharWidget extends WidgetType {

  toDOM(): HTMLElement {
    const el = document.createElement("span");
    el.textContent = "•";
    el.style.userSelect = "none";
    el.style.pointerEvents = "none"

    return el;
  }
}

export function maskExtension(hidden: Boolean) {
  const maskWidget = new maskCharWidget();

  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = hidden ? this.createMask(view) : Decoration.none;
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = hidden ? this.createMask(update.view) : Decoration.none;
        }
      }

      createMask(view: EditorView): DecorationSet {
        const widgets: Range<Decoration>[] = [];

        for (let { from, to } of view.visibleRanges) {
          const text = view.state.doc.sliceString(from, to);
          console.log(text);
          console.log(text.length);
          
          for (let i = 0; i < text.length; i++) {
            if (text[i] == "\n") continue;

            const deco = Decoration.replace({
              widget: maskWidget,
            }).range(from + i, from + i + 1);

            widgets.push(deco);
          }
        }

        return Decoration.set(widgets);
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
}
