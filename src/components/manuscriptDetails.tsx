import React, {useState} from "react";
import {IManuscript} from "../misc/interfaces";
import {SERVICE_SERVER, HOME} from "../misc/config";


function ManuscriptDetails(props: { manuscript: IManuscript }) {
    const layout_items = props.manuscript.layout;
    const content = props.manuscript.content;
    const img: string = SERVICE_SERVER + "img/detail/" + props.manuscript.image;
    const additional_content = props.manuscript.additional_content;
    const larger_unit = props.manuscript.larger_unit;
    const related_manuscripts = props.manuscript.related_manuscripts;
    const bibliography = props.manuscript.bibliography;
    const digitized = props.manuscript.digitized_at;

    let folText = "fols.";
    if (props.manuscript.no_of_folia === "1") {
        folText = "fol.";
    }

    let source_of_date = "";
    if (props.manuscript.source_dating !== "") {
        source_of_date = "(" + props.manuscript.source_dating + ")";
    }

    let pgType = "Page";
    if (props.manuscript.page_number.indexOf('r') !== -1 || props.manuscript.page_number.indexOf('v') !== -1) {
        pgType = "Folio";
    }


    function openWindow(ref: string) {
        let a = document.createElement('a');
        a.target = '_blank';
        a.href = ref;
        a.click();
    }


    return (
        <div>
            <div className="hcContentContainer hcMarginBottom1 hcMarginTop3">

                <div className="hcIKheaderSplit hcAlignLeftRight">
                    <div className="hcBasicSideMargin ">
                        <h1>{props.manuscript.shelfmark}</h1>
                        <span
                            className="hcSmallTxt hcClrTxt_Grey">{HOME}#detail/{props.manuscript.id}</span>
                        <span className="hcSmallTxt hcMarginTop1"><div className="hcClickable" onClick={() => {
                            window.history.back()
                        }}>Back to results</div></span>
                    </div>

                    <div className="hcBasicSideMargin hcAlignVertical">
                        <span className=" hcAlignRight">Innovating knowledge ID <strong
                            className="hcIKidBlock">{props.manuscript.id}</strong></span>
                        {props.manuscript.anspach !== "" && (<span className="hcSmallTxt  hcAlignRight">Anspach
                            <strong className="hcIKidBlock">{props.manuscript.anspach}</strong></span>)}
                        {props.manuscript.bischoff !== "" && (<span className="hcSmallTxt hcAlignRight">Bischoff <strong
                            className="hcIKidBlock">{props.manuscript.bischoff}</strong></span>)}
                        <div className="hcIKstate hcMarginTop1">
                            <div className="hcIKstateLabelBlock hcSmallTxt ">{props.manuscript.designed_as}</div>
                            <div className="hcIKstateIconBlock">
                                <img
                                    src="https://d33wubrfki0l68.cloudfront.net/e925351caa47fe2ecc7752548256297ea30014ac/cdb32/images/custom/innknow/icon-non.png"
                                    alt=""/>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className="hcContentContainer hcMarginBottom5">

                <hr className="hcMarginBottom2"/>

                <div className="hc2columns">
                    <div className="hcBasicSideMargin">

                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Date of origin</div>
                            {props.manuscript.bischoff_cla_date} {source_of_date}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Place of origin</div>
                            {props.manuscript.place_absolute}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Provenance</div>
                            {props.manuscript.provenances.map((line) => {
                                return (<div>{line.provenance}</div>)
                            })}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Folia</div>
                            {props.manuscript.no_of_folia} {folText}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Layout</div>
                            {layout_items}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Physical condition</div>
                            {props.manuscript.physical_state_scaled}
                            {props.manuscript.physical_state !== "" ? (<div>{props.manuscript.physical_state}</div>) : (
                                <div/>)}
                        </div>

                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Script</div>
                            {props.manuscript.script}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Type</div>
                            {props.manuscript.type}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Transmission format</div>
                            {props.manuscript.designed_as}
                        </div>

                    </div>
                    <div className="hcIKkImageBlock">
                        <img
                            src={img}
                            alt=""/>
                        {props.manuscript.page_number !== "" &&
                        <div className="hcPageNumber">{pgType} {props.manuscript.page_number}</div>}
                    </div>
                </div>


                <hr className="hcMarginTop2"/>

                <div className="hc2columns hcMarginTop2">


                    <div className="hcBasicSideMargin">
                        <h2>Content</h2>
                        {content.map(item => {
                            return <div className="hcManuscriptRow">
                                <div className="hcManuscriptValue underlineListItem">
                                    <div>{item.material_type === "full" ? (
                                        <strong>canonical Etymologiae</strong>) : (
                                        <strong>{item.material_type}</strong>)}, <strong>books: {item.books_included}</strong>
                                    </div>
                                    {item.details.map(values => {
                                        return <div className="line"><i>Etym. </i> {values.details}&nbsp;&nbsp;&nbsp;
                                            <i>({values.locations})</i></div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>


                    <div className="hcBasicSideMargin">
                        <h2>Additional content</h2>
                        <div className="hcMarginBottom1">

                            <ul>
                                {additional_content.map(line => {
                                    return <li>{line}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>


                <hr className="hcMarginTop2"/>

                <div className="hc2columns hcMarginTop2">
                    <div className="hcBasicSideMargin">
                        <h2>Innovative features</h2>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Annotations</div>
                            {props.manuscript.annotations}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Diagrams</div>
                            {props.manuscript.diagrams}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Innovations</div>
                            {props.manuscript.innovations}
                        </div>
                    </div>

                    <div className="hcBasicSideMargin hcMarginTop3">
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Larger unit</div>
                            {larger_unit.map(line => {
                                return <div className="line">{line}</div>
                            })}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Related manuscripts</div>
                            {related_manuscripts.map((item, index) => {
                                    return (<div>
                                        <em>{item.reason}</em>
                                        {item.intern.map((item_in, index) => {
                                            const url = "/#detail/" + item_in.id;
                                            return (<div key={index} className="linkLine" onClick={() => {
                                                window.scroll(0, 0);
                                                window.location.href = url;
                                            }}>{item_in.shelfmark}</div>)
                                        })}
                                        {item.extern.map((index_ex, index) => {
                                            if (index_ex !== "0") {
                                                return (<div key={index} className="line">{index_ex}</div>)
                                            }

                                        })}
                                    </div>)
                                }
                            )}
                        </div>
                    </div>
                </div>

                <hr className="hcMarginTop2"/>
                <div className="hcMarginTop2 hcBasicSideMargin">
                    <h2>Additional information</h2>
                    <div className="hcMarginBottom1">
                        <div className="hcDataLabel">Additional observations</div>
                        {props.manuscript.additional_observations}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcDataLabel">Bibliography</div>
                        <ul>
                            {bibliography.map(line => {
                                return <li>{line}</li>
                            })}
                        </ul>
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcDataLabel">Digitized at</div>
                        {props.manuscript.digitized_at.map((item) => {
                            return (
                                <div className="linkLine" onClick={() => {
                                    openWindow(item.item);
                                }}>{item.item}</div>
                            )
                        })}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcDataLabel">Additional information online</div>
                        {props.manuscript.url_other === "-" ?
                            (
                                <div>{props.manuscript.url_other}</div>
                            ) : (
                                <div className="linkLine" onClick={() => {
                                    openWindow(props.manuscript.url_other);
                                }}>{props.manuscript.url_other}</div>
                            )}
                    </div>
                </div>
                <hr className="hcMarginTop2"/>
                <div className="hc2columns hcMarginTop2">
                    <div className="hcBasicSideMargin hcSmallTxt">
                        <div className="hcClickable" onClick={() => {
                            window.history.back()
                        }}>Back to results
                        </div>
                    </div>
                    <div className="hcBasicSideMargin hcSmallTxt">
                        Created by Evina Steinová on 7 September 2020<br/>
                        Last modified by Evina Steinová on 7 September 2020
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManuscriptDetails;
