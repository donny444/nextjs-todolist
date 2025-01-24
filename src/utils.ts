import { Entry } from "@/app/page";

export function AddEntry(e: React.FormEvent<HTMLFormElement>, text: string, setList: (list: Entry[]) => void, setText: (text: string) => void) {
    e.preventDefault();
    if (!text.trim()) return;
    const local: string | null = localStorage.getItem("list");
    const newEntry: Entry = { id: Date.now().toString(), text, status: "pending" };
    if (local) {
        const list: Entry[] = JSON.parse(local);
        localStorage.setItem("list", JSON.stringify([...list, newEntry]));
        const updatedList: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
        setList(updatedList);
    } else {
        localStorage.setItem("list", JSON.stringify([{ text, status: "pending" }]));
        const updatedList: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
        setList(updatedList);
    }
    setText("");
}

export function EditEntry(id: string, newText: string) {
    const local: string | null = localStorage.getItem("list");
    if (local) {
        const list: Entry[] = JSON.parse(local);
        const updatedList = list.map((entry: Entry) => {
            return entry.id === id ? { ...entry, text: newText } : entry;
        });
        localStorage.setItem("list", JSON.stringify(updatedList));
        const updatedListState: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
        return updatedListState;
    }
}

export function CheckEntry(id: string) {
    const local: string | null = localStorage.getItem("list");
    if (local) {
        const list: Entry[] = JSON.parse(local);
        const updatedList = list.map((entry: Entry) => {
            return entry.id === id ? { ...entry, status: entry.status === "completed" ? "pending" : "completed" } : entry;
        });
        localStorage.setItem("list", JSON.stringify(updatedList));
    }
}

export function DeleteEntry(id: string) {
    const local: string | null = localStorage.getItem("list");
    if (local) {
        const list = JSON.parse(local);
        const updatedList = list.filter((entry: Entry) => entry.id !== id);
        localStorage.setItem("list", JSON.stringify(updatedList));
        const updatedListState: Entry[] = JSON.parse(localStorage.getItem("list") || "[]");
        return updatedListState;
    }
}