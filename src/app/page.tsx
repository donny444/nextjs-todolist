'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AddEntry, EditEntry, DeleteEntry, CheckEntry } from "@/utils";

export default function Home() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("list") || "[]"));
  const [isFormVisible, setIsFormVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      router.push("/signup");
    }
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <div className="bg-light-blue-100 min-h-screen p-4 max-w-lg mx-auto">
      <button onClick={toggleFormVisibility} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Todo
      </button>
      {isFormVisible && <Form setList={setList} closeForm={toggleFormVisibility} />}
      <List list={list} setList={setList} />
    </div>
  );
}

export type Entry = {
  id: string;
  text: string;
  status: "pending" | "completed";
}

function List({ list, setList }: { list: Entry[], setList: (list: Entry[] | undefined) => void }) {

  function onEdit(id: string, newText: string) {
    EditEntry(id, newText, setList);
  }

  function onDelete(id: string) {
    DeleteEntry(id, setList);
  }

  return (
    <ul>
      <div>
        <h2 className="text-2xl font-bold">Pending</h2>
        <div>
          {list.filter(entry => entry.status === "pending").map((entry: Entry) => (
            <div key={entry.id} className="bg-white shadow-md rounded p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={entry.status === "completed"}
                  onChange={() => {
                    CheckEntry(entry.id, setList);
                  }}
                  className="w-5 h-5"
                />
                <li className="ml-2">{entry.text}</li>
              </div>
              <div className="flex space-x-2">
                <Image src="/pen.svg" width={24} height={24} alt="edit" onClick={() => onEdit(entry.id, prompt("Edit entry:", entry.text) || entry.text)} />
                <Image src="/close.svg" width={24} height={24} alt="delete" onClick={() => onDelete(entry.id)} />
                {/* <button onClick={() => onEdit(entry.id, prompt("Edit entry:", entry.text) || entry.text)}>Edit</button> */}
                {/* <button onClick={() => onDelete(entry.id)}>Delete</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-t-2 border-gray-400" />
      <div>
        <h2 className="text-2xl font-bold">Completed</h2>
        <div>
          {list.filter(entry => entry.status === "completed").map((entry: Entry) => (
            <div key={entry.id} className="bg-white shadow-md rounded p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={entry.status === "completed"}
                  onChange={() => {
                    CheckEntry(entry.id, setList);
                  }}
                  className="w-5 h-5"
                />
                <li className="ml-2">{entry.text}</li>
              </div>
              <div className="flex space-x-2">
                <Image src="/pen.svg" width={24} height={24} alt="edit" onClick={() => onEdit(entry.id, prompt("Edit entry:", entry.text) || entry.text)} />
                <Image src="/close.svg" width={24} height={24} alt="delete" onClick={() => onDelete(entry.id)} />
                {/* <button onClick={() => onEdit(entry.id, prompt("Edit entry:", entry.text) || entry.text)}>Edit</button> */}
                {/* <button onClick={() => onDelete(entry.id)}>Delete</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ul>
  )
}

function Form({ setList, closeForm }: { setList: (list: Entry[]) => void, closeForm: () => void }) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    AddEntry(text, setList, setText);
    closeForm();
  }

  return (
    <form onSubmit={handleSubmit} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded relative">
        <Image src="/cancel.svg" width={24} height={24} alt="close" onClick={closeForm} className="absolute top-2 right-2 cursor-pointer" />
        <input
          type="text"
          placeholder="Add a todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mt-6 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add Todo</button>
      </div>
    </form>
  )
}

function EditForm({ id, text, onEdit }: { id: string, text: string, onEdit: (id: string, newText: string) => void }) {
  const [newText, setNewText] = useState(text);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEdit(id, newText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  )
}