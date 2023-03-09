import { IoTrashOutline, IoEllipsisHorizontalCircle, IoDownloadOutline } from 'react-icons/io5'
import DeleteModal from '../modals/DeleteModal';
import { useState } from 'react';

export default function OptionsBar({ 
  deleteNote, 
  updatedAt, 
  noteId 
}: {
    deleteNote: (id: string) => void,
    updatedAt: Date | null,
    noteId: string
    }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between bg-white">
      <p className="text-sm mt-2 ml-5 text-slate-500">Last edit: {updatedAt?.toLocaleDateString('en-US',{year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second:"numeric" })}</p>
      <div className=" mt-2 mr-5 flex gap-3">
        <button title='Download in PDF'>
          <IoDownloadOutline className="text-2xl text-purple-600"/>
        </button>
        <button title='Settings'>
          <IoEllipsisHorizontalCircle className="text-2xl text-purple-600"/>
        </button>
        <button title='Delete note' onClick={() => setIsOpen(true)}>
          <IoTrashOutline className="text-2xl text-purple-600"/>
        </button>
      </div>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} deleteNote={() => deleteNote(noteId)} />
    </div>
  )
}
