'use client';

import { ITextEditor } from '../field/form-interface';
import cn from 'clsx';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './TextEditor.module.scss';

const TextEditor: FC<ITextEditor> = ({ onChange, placeholder, value,error }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isUpdated) return;
    const defaultValue = value || '';
    const blocksFromHTML = htmlToDraft(defaultValue);
    
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [value, isUpdated]);
  
  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true);
    setEditorState(editorState);
    
    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className={cn(styles.editor_wrapper, 'animate-fade')}>
      <label>
        <span>{placeholder}</span>

        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            spellCheck
            toolbar={{
              options:['inline', 'list'],
              inline: {
                inDropdown:false,
                className:undefined,
                component:undefined,
                dropdownClassName:undefined,
                options: [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough'
                ]
              },
              list: {
                inDropdown:false,
                options:['unordered', 'ordered']
              }
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default TextEditor;
