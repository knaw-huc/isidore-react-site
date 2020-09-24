import React from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import ManuscriptDetails from "./manuscriptDetails";

function Manuscript() {

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


                                            <ManuscriptDetails/>



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
