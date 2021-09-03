import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import ManuscriptDetails from "./manuscriptDetails";
import {useState} from "react";
import {IManuscript} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";

function Manuscript(props: { manuscriptID: string }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IManuscript>({} as IManuscript);

    async function fetchData() {
        const url = SERVICE_SERVER + "detail/" + props.manuscriptID;
        console.log(url);
        const response = await fetch(url);
        const json: IManuscript = await response.json();
        setResult(json);
        setLoading(false);
    }

    if (loading) {
        fetchData();
    }

    return (
        <div>
            <Header/>
            <div>
                {loading ? (
                    <div></div>
                ) : (
                    <ManuscriptDetails manuscript={result}/>
                )}
            </div>
        </div>
    )
}

export default Manuscript;
