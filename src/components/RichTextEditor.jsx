import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
const RichTextEditor = ({ content, isEdit, setContent, isFullScreen }) => {
  const [editor, setEditor] = useState(null);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  
  // 自定义工具栏配置
  const toolbarConfig = {
    excludeKeys: ['fullScreen'],
    toolbarKeys: [
      "headerSelect",
      "blockquote",
      "|",
      "bold",
      "underline",
      "italic",
      {
          "key": "group-more-style",
          "title": "更多",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 682.666667c0 11.733333-4.266667 22.4-11.733333 30.933333l-51.2 59.733333c-8.533333 8.533333-19.2 12.8-30.933334 12.8H170.666667c-11.733333 0-22.4-4.266667-30.933334-12.8l-51.2-59.733333C80 705.066667 75.733333 694.4 75.733333 682.666667V341.333333c0-11.733333 4.266667-22.4 12.8-30.933333l51.2-59.733333c8.533333-8.533333 19.2-12.8 30.933334-12.8h503.466666c11.733333 0 22.4 4.266667 30.933334 12.8l51.2 59.733333c7.466667 8.533333 11.733333 19.2 11.733333 30.933333v341.333334z m-682.666667-341.333334v341.333334h597.333334V341.333333H85.333333z m213.333334 128c0-17.066667 12.8-29.866667 29.866667-29.866667 9.6 0 17.066667 4.266667 23.466666 10.666667l32 32 72.533334-96c6.4-8.533333 14.933333-12.8 25.6-12.8 17.066667 0 29.866667 12.8 29.866667 29.866667 0 9.6-4.266667 19.2-12.8 25.6l-98.133334 128c-6.4 8.533333-14.933333 12.8-25.6 12.8-8.533333 0-17.066667-2.133333-23.466666-8.533333l-57.6-57.6c-6.4-6.4-10.666667-14.933333-10.666667-25.6z m384 0c0-17.066667 12.8-29.866667 29.866667-29.866667 17.066667 0 29.866667 12.8 29.866667 29.866667v128c0 17.066667-12.8 29.866667-29.866667 29.866667-17.066667 0-29.866667-12.8-29.866667-29.866667v-128z\"></path></svg>",
          "menuKeys": [
              "through",
              "code",
              "sup",
              "sub",
              "clearStyle"
          ]
      },
      "color",
      "bgColor",
      "fontSize",
      "fontFamily",
      "lineHeight",
      {
          "key": "group-justify",
          "title": "对齐",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
          "menuKeys": [
              "justifyLeft",
              "justifyRight",
              "justifyCenter",
              "justifyJustify"
          ]
      },
      {
          "key": "group-indent",
          "title": "缩进",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
          "menuKeys": [
              "indent",
              "delIndent"
          ]
      },
      {
          "key": "group-more-style",
          "title": "更多",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M85.333333 213.333333h85.333334v682.666667H85.333333V213.333333z m170.666667 0h682.666667v85.333334H256v-85.333334z m0 170.666667h682.666667v85.333333H256v-85.333333z m0 170.666667h682.666667v85.333333H256v-85.333333z m0 170.666667h682.666667v85.333333H256v-85.333333z\"></path></svg>",
          "menuKeys": [
              "bulletedList",
              "numberedList",
              "todo"
          ]
      },
      "codeBlock",
      "insertTable",
      "divider",
      {
          "key": "group-image",
          "title": "图片",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
          "menuKeys": [
              "insertImage",
              "uploadImage"
          ]
      },
      "undo",
      "redo",
      {
          "key": "group-more-style",
          "title": "更多",
          "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 128c-35.2 0-64 28.8-64 64 0 35.2 28.8 64 64 64s64-28.8 64-64c0-35.2-28.8-64-64-64z m0 192c-35.2 0-64 28.8-64 64 0 35.2 28.8 64 64 64s64-28.8 64-64c0-35.2-28.8-64-64-64z m0 192c-35.2 0-64 28.8-64 64 0 35.2 28.8 64 64 64s64-28.8 64-64c0-35.2-28.8-64-64-64z\"></path></svg>",
          "menuKeys": [
              "emotion",
              "insertLink"
          ]
      }
    ]
  }
  
  // 编辑器配置
  const editorConfig = {
    placeholder: '在此处输入内容...',
    MENU_CONF: {
      // 粘贴配置
      paste: {
        // 保留粘贴样式
        pasteFilterStyle: false,
        // 不忽略粘贴的图片
        pasteIgnoreImg: false,
        // 自定义粘贴处理
        customPaste: (editor, event) => {
          // 获取粘贴的HTML内容
          const html = event.clipboardData.getData('text/html');
          
          // 如果有HTML内容，则插入HTML而不是纯文本
          if (html) {
            event.preventDefault(); // 阻止默认粘贴行为
            editor.insertHtml(html); // 插入HTML内容
            return true;
          }
          
          // 对于纯文本，使用默认行为
          return false;
        }
      }
    }
  }

  // 编辑模式下，设置 placeholder 为当前内容
  if (isEdit) {
    editorConfig.placeholder = content
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* wangEditor 工具栏 */}
      <div>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          className="border border-gray-300 rounded-tl-md rounded-tr-md"
        />
      </div>
      {/* wangEditor 编辑器  onChange={(val) => setContent(val)} */}
      <div className="flex flex-col flex-grow overflow-y-auto w-e-scroll">
        <Editor
          value={content}
          onChange={(editor) => setContent(editor.getHtml())}
          defaultConfig={editorConfig}
          mode="default"  
          className="flex-grow min-h-[220px] max-h-[440px] border border-gray-300 rounded-bl-md rounded-br-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-e-text-container"
          onCreated={(editorInstance) => setEditor(editorInstance)}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;