"use client";

import {createRef, useState} from "react";
import { useRouter } from "next/navigation";
import * as Papa from "postcss";

export default function AddDocument() {
    const fileInput = createRef();
    const fileName = createRef();

    const router = useRouter();

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
            },
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData("avatar", fileInput.current.files[0]);
        // formData.set("fileName", fileName.current.value);

        const reader = new FileReader();
        const file = fileInput.current.files[0];



        if (file) {
            const text = e.target.result
            console.log("text")
            console.log(text)
            reader.readAsText(file);
            // console.log(reader.read(file));
        }

        console.log("document contents")
        console.log(FileReader.readAsText(fileInput.current.files[0]))

        try {
            const res = await fetch("http://localhost:3000/api/documents", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: formData
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
                ref={fileName}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
            />

            <input
                ref={fileInput}
                className="border border-slate-500 px-8 py-2"
                type="file"
                placeholder="File Here"
            />

            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                style={{display: "block", margin: "10px auto"}}
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