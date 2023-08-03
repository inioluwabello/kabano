'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../lib/context/AuthContext";
import { nanoid } from "nanoid";
import addData from "@/lib/firebase/firestore/addData";
import getDocument from "@/lib/firebase/firestore/getData";
import { Loading } from "../components/LoadingBar/Loading";
import { selectCount, useSelector } from "@/lib/redux";
import { logout } from "@/lib/firebase/auth/logout";

export default function IndexPage() {
    const { user } = useAuthContext()
    const router = useRouter()

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    const saveData = async () => {
        setLoading(true)
        const data = {
            name: 'John snow',
            house: 'Stark'
        }
        const result = await addData("users", nanoid(), data);

        if (result.error) {
            return console.log(result.error)
        }
        setLoading(false)
        alert('Data added')
    }

    const counter = useSelector(selectCount)
    
    const getData = async () => {
        setLoading(true)
        const id = "gvElbE9eHz8NKXZYWJsD8";
        const response = await getDocument("users", id);

        if (response.error) {
            return console.log(response.error)
        }

        setData({ ...response.result, id })
        setLoading(false)
    }

    const signOut = async () => {
        await logout();
    }

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user, router])

    return (
        <main className="main-section">
            {
                loading &&
                <Loading />
            }
            <fieldset>
                <legend>Add Data</legend>

                <button className="add-data" onClick={saveData}>Add Test Data</button>

            </fieldset>
            <br />
            
            <fieldset>

                <button className="get-data" onClick={getData}>Get Data</button>
                {
                    data &&
                    <div className="saved-data">
                        <div className="id">ID: {data.id}</div>
                        <div className="name">Name: {data.name}</div>
                        <div className="house">House: {data.house}</div>
                        <div className="counter">Redux Counter: {counter}</div>
                    </div>
                }
            </fieldset>
            <br />

            <fieldset>
                <button className="logout" onClick={signOut}>Logout</button>
            </fieldset>
        </main>
    );
}