import React, { useMemo } from 'react';
import { useState, useRef} from "react";
import JoditEditor from "jodit-react";

export function AdminEditor({setDescription, description}) {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [value, setValue] = useState();

    const config = useMemo(
        () => ({
          readonly: false,
          spellcheck: true,
          defaultMode: "1",
          showCharsCounter: false,
          showWordsCounter: false,
          showXPathInStatusbar: false,
          maxWidth: 900,
          maxHeight: 400,
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
          buttons: "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,spellcheck,link,indent,outdent,left"
        }),
        []
      );

    console.log("Rendered editor!")

    return (
        <div style={{marginBottom: "10%", marginRight: "10%", float: "right"}}>
          <JoditEditor
            ref={editor}
            config={config}
            value={description}
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setDescription(newContent);
            }}
          />
          {/* {value && <div dangerouslySetInnerHTML={{ __html: value }}></div>} */}
        </div>
      );
}