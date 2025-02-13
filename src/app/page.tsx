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
  const [filter, setFilter] = useState("all");
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editEntry, setEditEntry] = useState({ id: "", text: "" });
  const [search, setSearch] = useState("");

  const toggleEditForm = (id?: string, text?: string) => {
    setIsEditVisible(!isEditVisible);
    if (id && text) {
      setEditEntry({ id, text });
    }
  }

  function onDelete(id: string) {
    DeleteEntry(id, setList);
  }

  return (
    <div>
      <input type="text" placeholder="Search" className="w-full p-2 border rounded mt-4" onChange={(e) => setSearch(e.target.value)} />
      <select className="w-full p-2 border rounded my-4" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <ul>
        {list.filter(entry => (entry.status === filter || filter === "all") && entry.text.includes(search)).map((entry: Entry) => (
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
            <div className="flex">
              <Image src="/pen.svg" width={24} height={24} alt="edit" onClick={() => toggleEditForm(entry.id, entry.text)} />
              <Image src="/close.svg" width={24} height={24} alt="delete" onClick={() => onDelete(entry.id)} />
              {/* <button onClick={() => onEdit(entry.id, prompt("Edit entry:", entry.text) || entry.text)}>Edit</button> */}
              {/* <button onClick={() => onDelete(entry.id)}>Delete</button> */}
            </div>
          </div>
        ))}
      </ul>
      {isEditVisible && <EditForm id={editEntry.id} text={editEntry.text} setList={setList} closeEdit={toggleEditForm} />}
    </div>
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
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add</button>
      </div>
    </form>
  )
}

function EditForm({ id, text, setList, closeEdit }: { id: string, text: string, setList: (list: Entry[]) => void, closeEdit: () => void }) {
  const [newText, setNewText] = useState(text);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    EditEntry(id, newText, setList);
    closeEdit();
  }

  return (
    <form onSubmit={handleSubmit} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-4 rounded relative">
        <Image src="/cancel.svg" width={24} height={24} alt="close" onClick={closeEdit} className="absolute top-2 right-2 cursor-pointer" />
        <input
          type="text"
          placeholder="Edit the todo"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full p-2 border rounded mt-6 mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Save</button>
      </div>
    </form>
  )
}