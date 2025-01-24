'use client'
import { useState } from "react";

export default function Home() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("list") || "[]"));

  return (
    <div>
      <Form setList={setList}/>
      <List list={list} setList={setList} />
    </div>
  );
}

type Entry = {
  text: string;
  status: "pending" | "completed";
}

function List({ list, setList }: { list: Entry[], setList: (list: Entry[]) => void }) {

  function deleteEntry(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const local: string | null = localStorage.getItem("list");
    if (local) {
      const list = JSON.parse(local);
      const updatedList = list.filter((entry: Entry) => entry.text !== e.target.parentElement?.firstChild?.textContent);
      localStorage.setItem("list", JSON.stringify(updatedList));
      const updatedListState: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
      setList(updatedListState);
    }
  }

  return (
    <ul>
      {list.map((entry: Entry, index: number) => (
        <div key={index}>
          <li>{entry.text}</li>
          <button onClick={deleteEntry}>Delete</button>
        </div>
      ))}
    </ul>
  )
}

function Form({ setList }: { setList: (list: Entry[]) => void }) {
  const [text, setText] = useState("");

  function AddEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    const local: string | null = localStorage.getItem("list");
    if (local) {
      const list = JSON.parse(local);
      localStorage.setItem("list", JSON.stringify([...list, {text, status: "pending"}]));
      const updatedList: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
      setList(updatedList);
    } else {
      localStorage.setItem("list", JSON.stringify([{text, status: "pending"}]));
      const updatedList: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
      setList(updatedList);
    }
    setText("");
  }

  return (
    <form onSubmit={AddEntry}>
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