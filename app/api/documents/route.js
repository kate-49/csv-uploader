import connectMongoDb from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Document from "@/models/document";

export async function POST(request) {
    const {name, content} = await request.json();
    await connectMongoDb();
    await Document.create({ name, content });
    return NextResponse.json({message: "Document created"}, {status: 201});
}

export async function GET() {
    await connectMongoDb();
    const documents = await Document.find();
    return NextResponse.json({ documents }, {status: 200});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDb();
    await Document.findByIdAndDelete(id);
    return NextResponse.json({ message: "Document deleted" }, { status: 200 });
}