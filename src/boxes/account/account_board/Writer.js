import React from "react";
import ReactQuill from "react-quill";

const Writer = ({ contents, changeContents, isNew }) => {
  const Editor = {
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ],
  };



  return (
    <div className="text-editor">
      {isNew && (
        <ReactQuill
          theme="snow"
          onChange={changeContents}
          value={contents}
          modules={Editor.modules}
          formats={Editor.formats}
          style={{ height: "250px" }}
        />
      )}
      {!isNew && (
        <>
          <ReactQuill 
            value={contents} 
            readOnly 
            style={{ height: "250px" }} 
          />
        </>
      )}
    </div>
  );
};

export default Writer;
