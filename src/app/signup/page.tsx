'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [sex, setSex] = useState("");

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("profile",
            JSON.stringify({
                firstName,
                lastName,
                age,
                birthDate,
                sex,
                timestamp: Date.now().toString(),
                status: "active"
            })
        );
        router.push("/"); // Redirect to home page
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label>Birth Date:</label>
                    <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </div>
                <div>
                    <label>Sex:</label>
                    <select onChange={(e) => setSex(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}