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


    function openWindow(ref: string) {
        let a = document.createElement('a');
        a.target = '_blank';
        a.href = ref;
        a.click();
    }


    return (
        <div className="hcManuscriptBasicInfo">
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabelHeader">
                        {props.manuscript.shelfmark}
                        <div className="hcSteinova">{props.manuscript.steinova}</div>
                    </div>
                    <div className="urlLine">{HOME}#detail/{props.manuscript.id}</div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptValueSmall">
                        Created by Evina Steinová on 7 September 2020<br/>
                        Last modified by Evina Steinová on 7 September 2020
                    </div>
                    <div className="hcManuscriptValueOtherIDs">
                        {props.manuscript.anspach !== "" ? (<div>Anspach {props.manuscript.anspach}</div>) : (<div/>)}
                        {props.manuscript.bischoff !== "" ? (<div>Bischoff {props.manuscript.bischoff}</div>) : (
                            <div/>)}
                        {props.manuscript.cla !== "" ? (<div>CLA {props.manuscript.cla}</div>) : (<div/>)}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Date of origin
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.bischoff_cla_date} {source_of_date}
                    </div>
                </div>
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Place of origin
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.place_absolute}
                    </div>
                </div>
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Provenance
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.provenance}
                    </div>

                </div>
                <div className="hcManuscriptImg"><img className="thumb" src={img}/>
                    {props.manuscript.page_number !== "" &&
                    <div className="hcPageNumber">Folio {props.manuscript.page_number}</div>}
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Folia
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.no_of_folia} {folText}
                    </div>
                </div>
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Layout
                    </div>
                    <div className="hcManuscriptValue">
                        {layout_items}
                    </div>
                </div>
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Script
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.script}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Transmission format
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.designed_as}
                    </div>
                </div>
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Physical condition
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.physical_state_scaled}
                        {props.manuscript.physical_state !== "" ? (<div>{props.manuscript.physical_state}</div>) : (
                            <div/>)}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Content
                    </div>

                    {content.map(item => {
                        return <div className="hcManuscriptRow">
                            <div className="hcManuscriptValue underlineListItem">
                                <div>{item.material_type === "full" ? (
                                    <strong>canonical Etymologiae</strong>) : (
                                    <strong>{item.material_type}</strong>)}, <strong>books: {item.books_included}</strong>
                                </div>
                                <div className="line"><i>Etym. </i> {item.details}&nbsp;&nbsp;&nbsp; <i>({item.locations})</i>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Type
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.type}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Additional content
                    </div>
                    <div className="hcManuscriptValue">
                        {additional_content.map(line => {
                            return <div className="line">{line}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Larger unit
                    </div>
                    <div className="hcManuscriptValue">
                        {larger_unit.map(line => {
                            return <div className="line">{line}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Related manuscripts
                    </div>
                    <div className="hcManuscriptValue">
                        {related_manuscripts.map((item, index) => {
                                return (<div>
                                    <div className="cursLine">{item.reason}</div>
                                    {item.intern.map((item_in, index) => {
                                        const url = "/#detail/" + item_in.id;
                                        return (<div key={index} className="linkLine" onClick={() => {
                                            window.scroll(0, 0);
                                            window.location.href = url;
                                        }}>{item_in.shelfmark}</div>)
                                    })}
                                    {item.extern.map((index_ex, index) => {
                                        return (<div key={index} className="line">{index_ex.item}</div>)
                                    })}
                                </div>)
                            }
                        )}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Annotations
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.annotations}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Innovations
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.innovations}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Additional observations
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.additional_observations}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Bibliography
                    </div>
                    <div className="hcManuscriptValue">
                        {bibliography.map(line => {
                            return <div className="line">{line}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Digitized at
                    </div>
                    <div className="hcManuscriptValue">
                        {digitized.map(line => {
                            return <div className="linkLine" onClick={() => {
                                openWindow(line.item);
                            }}>{line.item}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className="linkLine" onClick={() => {
                window.history.back()
            }}>Back to results
            </div>
        </div>
    )
}

export default ManuscriptDetails;
