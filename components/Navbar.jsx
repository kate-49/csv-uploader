import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
            <Link className="bg-white p-2" href={"/"}>
                View all CVs
            </Link>
            <Link className="bg-white p-2" href={"/viewDuplicateDocuments"}>
                View duplicate information
            </Link>
            <Link className="bg-white p-2" href={"/addDocument"}>
                Add Document
            </Link>
        </nav>
    );
}