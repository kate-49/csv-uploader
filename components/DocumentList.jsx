import RemoveBtn from "./RemoveBtn";

const getDocuments = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/documents", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};

async function findDuplicateContent(documents) {

}

export default async function DocumentList() {
    const { documents } = await getDocuments();

    const { returnedDocuments } = await findDuplicateContent(documents);
    return (
        <>
            {returnedDocuments.map((d) => (
                <div
                    key={d._id}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div>
                        <h2 className="font-bold text-2xl">{d.name}</h2>
                        <div>{d.content}</div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtn id={d._id}/>
                    </div>
                </div>
            ))}
        </>
    );
}