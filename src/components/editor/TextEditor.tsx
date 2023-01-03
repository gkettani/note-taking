import { useState, useRef, useEffect } from 'react';
import type { RouterOutputs } from '../../utils/trpc';
import OptionsBar from './OptionsBar';

export default function TextEditor({ 
  debounceApiCall, 
  note, 
  deleteNote 
}: {
  debounceApiCall: (id: string, title: string, content: string) => void,
  note: RouterOutputs['notes']['getAll'][number] | undefined,
  deleteNote: (id: string) => void
  }) {

  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle(note ? note.title : '');
  }, [note]);

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (note) debounceApiCall(note.id, event.target.value, content);
  };

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');
  useEffect(() => {
    setContent(note ? note.content : ''); 
  }, [note]);

  const updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (note) debounceApiCall(note.id, title, event.target.value);
  };
  
  const focusContent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === "Enter") {
      contentRef.current?.focus();
    }
  };

  if (!note) return (
    <div className="w-4/5">
      <div className="text-center text-2xl p-5">Start by creating a note</div>
    </div>
  )
  
  return (
    <div className="border w-4/5 shadow-md rounded-md overflow-hidden">
      <OptionsBar updatedAt={note.updatedAt} noteId={note.id} deleteNote={deleteNote}/>
      <input 
        placeholder="Untitled" 
        className=" text-center w-full outline-none text-2xl p-1 pb-5" 
        type="text" 
        onKeyUp={(e) => focusContent(e)} 
        value={title} 
        onChange={(e) => updateTitle(e)} />
      <textarea 
        placeholder="Start writing here" 
        ref={contentRef} 
        className="editor-content custom-scrollbar w-full resize-none outline-none overflow-auto px-10 pt-5 text-justify"
        value={content} 
        onChange={(e) => updateContent(e)}
      />
    </div>
  )
}
