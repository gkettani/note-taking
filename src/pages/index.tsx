import { type NextPage } from "next";
import Head from "next/head";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

import { trpc } from "../utils/trpc";
import type { RouterOutputs } from "../utils/trpc";
import TextEditor from "../components/editor/TextEditor";
import NotesList from "../components/NotesList";

type Note = RouterOutputs["notes"]["list"][number] | undefined;

const Home: NextPage = () => {

  const [currentNote, setCurrentNote] = useState<Note>(undefined);

  // const utils = trpc.useContext();
  // utils.notes.list.getData(); // get data from cache

  const notes = trpc.notes.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onSuccess: (notes) => {
      if (!currentNote && notes.length > 0) {
        setCurrentNote(notes[0]);
      }
    }
  });

  const create = trpc.notes.create.useMutation({
    onSuccess: (note) => {
      notes.data?.push(note);
      setCurrentNote(note);
    },
  });

  const updateNote = trpc.notes.update.useMutation({
    onSuccess: (note) => {
      if (!notes.data) return;
      const index = notes.data?.findIndex((n) => n.id === note.id);
      if (index !== undefined && index !== -1) {
        notes.data[index] = note;
        setCurrentNote(note);
      }
    }
  });

  const deleteNote = trpc.notes.delete.useMutation({
    onSuccess: (note) => {
      if (!notes.data) return;
      const index = notes.data?.findIndex((n) => n.id === note.id);
      if (index !== undefined && index !== -1) {
        notes.data.splice(index, 1);
        if (notes.data.length > 0) {
          setCurrentNote(notes.data[0]);
        } else {
          setCurrentNote(undefined);
        }
      }
    }
  });

  const debounceApiCall = useCallback( 
    debounce((noteId: string, title: string, content: string) => {
      updateNote.mutate({ id: noteId, title, content });
    }, 500), []);

  const updateEditor = (noteId: string) => {
    const note = notes.data?.find((note) => note.id === noteId);
    setCurrentNote(note);
  }

  const handleDelete = (id: string) => {
    deleteNote.mutate({ id });
  }

  if (notes.isFetching) return (<div>Loading...</div>);

  return (
    <>
      <Head>
        <title>Notes</title>
        <meta name="description" content="Note taking application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full p-5 font-mono gap-5">
        <NotesList currentNote={currentNote} setCurrentNote={setCurrentNote} updateEditor={updateEditor} notes={notes.data}  createNote={() => create.mutate({ title: "Untitled", content: "" })} />
        <TextEditor debounceApiCall={debounceApiCall} note={currentNote} deleteNote={handleDelete} />
      </main>
    </>
  );
};

export default Home;
