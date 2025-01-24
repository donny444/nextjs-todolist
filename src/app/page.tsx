'use client'
import React, { useState } from "react";
import { AddEntry, EditEntry, DeleteEntry, CheckEntry } from "@/utils";

export default function Home() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("list") || "[]"));
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <div>
      <button onClick={toggleFormVisibility}>Add Todo</button>
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
    const updatedListState = EditEntry(id, newText);
    setList(updatedListState);
  }

  function onDelete(id: string) {
    const updatedListState = DeleteEntry(id);
    setList(updatedListState);
  }

  return (
    <ul>
      {list.map((entry: Entry) => (
        <div key={entry.id}>
          {/* <div>{ entry.status === "completed" ? : }</div> */}
          <input 
            type="checkbox" 
            checked={entry.status === "completed"}
            onChange={() => {
              CheckEntry(entry.id);
              setList(JSON.parse(localStorage.getItem("list") || "[]"));
            }}
          />
          <li>{entry.text}</li>
          <button onClick={() => onEdit(entry.id, prompt("Edit entry:", entry.text) || entry.text)}>Edit</button>
          <button onClick={() => onDelete(entry.id)}>Delete</button>
        </div>
      ))}
    </ul>
  )
}

function Form({ setList, closeForm }: { setList: (list: Entry[]) => void, closeForm: () => void }) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    AddEntry(e, text, setList, setText);
    closeForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Add a todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}