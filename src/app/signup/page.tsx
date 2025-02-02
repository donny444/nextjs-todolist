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
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Birth Date:</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Sex:</label>
                        <select
                            onChange={(e) => setSex(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            defaultValue={""}
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="">Prefer not to say</option>
                        </select>
                    </div>
                    <input
                        type="submit"
                        value="Sign Up"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    />
                </form>
            </div>
        </div>
    )
}