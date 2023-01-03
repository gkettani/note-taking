import React from 'react'

export default function OptionsBar({ 
  deleteNote, 
  updatedAt, 
  noteId 
}: {
    deleteNote: (id: string) => void,
    updatedAt: Date | null,
    noteId: string
    }) {

  return (
    <div className="flex justify-between bg-white">
      <p className="mt-2 ml-10">Last Updated: {updatedAt?.toLocaleString()}</p>
      <div className=" mt-2 mr-12 flex gap-3">
        <button className="bg-blue-900 text-white p-1 rounded-md">....</button>
        <button className="bg-blue-900 text-white p-1 rounded-md" onClick={() => deleteNote(noteId)}>Delete</button>
      </div>
    </div>
  )
}
