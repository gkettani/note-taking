import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import SearchBar from './SearchBar';
import type { RouterOutputs } from '../utils/trpc';

export default function NotesList({ 
  notes,
  updateEditor,
  createNote,
 }: {
  notes: RouterOutputs['notes']['getAll'] | undefined,
  updateEditor: (id: string) => void,
  createNote: () => void,
 }) {

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const handleNoteClick = (id: string) => {
    updateEditor(id)
    setSelectedNoteId(id)
  }
  return (
    <div className="w-1/5">
      <div className="flex justify-between mb-2">
        <h1 className="text-3xl text-slate-800 font-bold">Notes</h1>
        <button title="Create note" onClick={createNote}>
          <IoCreateOutline className="text-2xl text-purple-600"/>
        </button>
      </div>
      <SearchBar />
      <ul className='note-list bg-white rounded-t-md overflow-hidden mt-1 shadow-sm custom-scrollbar border border-gray-200'>
        {notes?.map((note) => (
          <li 
            key={note.id} 
            className={`
              p-3 hover:bg-purple-200 cursor-pointer border-b-2
              ${
                note.id === selectedNoteId ? "bg-purple-100 pointer-events-none" : ""
              }`
            }
            onClick={() => handleNoteClick(note.id)}>
            <h2 className="text-base truncate font-bold">{note.title || "Untitled"}</h2>
            <p className="text-slate-500 text-sm truncate">{note.content}</p>
          </li>
        ))}
      </ul>
      <div className="bg-purple-600 border-t-2 border-slate-200 w-full h-10 rounded-b-md">
        <p className="text-white text-sm text-center mt-2 font-semibold">
          {notes?.length} {notes?.length === 1 ? "note" : "notes"}
        </p>
      </div>
    </div>
  )
}
