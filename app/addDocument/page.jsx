"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDocument() {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !content) {
            alert("Name and content are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/documents", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name, content }),
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a document");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
            />

            <input
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Description"
            />

            <button
                type="submit"
                className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
            >
                Add Document
            </button>
        </form>
    );
}