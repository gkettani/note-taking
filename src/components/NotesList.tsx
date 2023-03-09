import { IoCreateOutline } from 'react-icons/io5';
import SearchBar from './SearchBar';
import type { RouterOutputs } from '../utils/trpc';


type Note = RouterOutputs["notes"]["list"][number] | undefined;

export default function NotesList({ 
  notes,
  updateEditor,
  createNote,
  currentNote,
  setCurrentNote
 }: {
  notes: RouterOutputs["notes"]["list"] | undefined,
  updateEditor: (id: string) => void,
  createNote: () => void,
  currentNote: Note | undefined,
  setCurrentNote: (note: Note) => void
 }) {

  const handleNoteClick = (note: Note) => {
    if (!note) return;
    updateEditor(note.id)
    setCurrentNote(note)
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
                note.id === currentNote?.id ? "bg-purple-100 pointer-events-none" : ""
              }`
            }
            onClick={() => handleNoteClick(note)}>
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
