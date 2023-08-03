'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../lib/context/AuthContext";
import { nanoid } from "nanoid";
import addData from "@/lib/firebase/firestore/addData";
import getDocument from "@/lib/firebase/firestore/getData";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    const [data, setData] = useState<any>(null);
    const saveData = async () => {
        const data = {
            name: 'John snow',
            house: 'Stark'
        }
        const result = await addData("users", nanoid(), data);

        if (result.error) {
            return console.log(result.error)
        }
        alert('Data added')
    }

    const getData = async () => {
        const id = "gvElbE9eHz8NKXZYWJsD8";
        const response = await getDocument("users", id);

        if (response.error) {
            return console.log(response.error)
        }

        setData({ ...response.result, id })
    }

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user, router])

    return (
        <main className="main-section">
            <fieldset>
                <legend>Add Data</legend>

                <button className="add-data" onClick={saveData}>Add Test Data</button>

            </fieldset>
            <fieldset>

                <button className="get-data" onClick={getData}>Get Data</button>
                {
                    data &&
                    <div className="saved-data">
                        <div className="id">ID: {data.id}</div>
                        <div className="name">Name: {data.name}</div>
                        <div className="house">House: {data.house}</div>
                    </div>
                }
            </fieldset>
        </main>
    );
}

export default Page;