import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import ManuscriptDetails from "./manuscriptDetails";
import {useState} from "react";
import {IManuscript} from "../misc/interfaces";

function Manuscript(props: {manuscriptID: string}) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IManuscript>({} as IManuscript);
    console.log(props.manuscriptID);

    async function fetchData() {
        const url = "http://www.huc.localhost/isidore_service/detail/" + props.manuscriptID;
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
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">

                    {/*<div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">*/}
                        {/*<div className="hcLayoutFacets">*/}
                        {/*                <div>*/}
                        {/*                    <img id="hcLeftScan" src="" alt=""/>*/}
                        {/*                    <span className="hcScanName"></span>*/}
                        {/*                </div>*/}
                        {/*</div>*/}
                        <div className="hcLayoutResults">
                            <div className="hcResultsHeader hcMarginBottom1">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <ManuscriptDetails manuscript={result}/>
                                )}

                            </div>
                        </div>
                    {/*</div>*/}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Manuscript;
