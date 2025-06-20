"use client";

import app, {createRef, useState} from "react";
import { useRouter } from "next/navigation";

async function SubmitForm($router, $fileName, $fileContent) {

    try {
        console.log("0fileName")
        console.log($fileName)
        console.log("0fileContent")
        console.log($fileContent)
        const contentAsJson = JSON.stringify($fileContent);

        const res = await fetch("http://localhost:3000/api/documents", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name: $fileName, content: contentAsJson }),
        });

        if (res.ok) {
            $router.push("/");
        } else {
            throw new Error("Failed to create a document");
        }
    } catch (error) {
        console.log(error);
    }
}

export default function AddDocument() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [content, setFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("content")
        console.log(content)

        const reader = new FileReader();
        console.log('read')

        reader.onerror = () => {
            console.log("Error reading the file. Please try again.", "error");
        };

        reader.onload = () => {
            const fileDataAsString = reader.result;
            const fileDataAsArray = fileDataAsString.split('\r');
            console.log('array');
            console.log(fileDataAsArray);
            return SubmitForm(router, name, fileDataAsArray);
        };

        console.log('read')
        reader.readAsText(content);

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
                onChange={(e) => setFile(e.target.files[0])}
                className="border border-slate-500 px-8 py-2"
                type="file"
                accept='.txt'
                placeholder="File Here"
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