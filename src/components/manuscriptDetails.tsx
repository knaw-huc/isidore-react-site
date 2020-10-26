import React, {useState} from "react";
import {IManuscript} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function ManuscriptDetails(props: {manuscript: IManuscript}) {
    const layout_items = props.manuscript.layout;
    const content = props.manuscript.content;
    const img: string = SERVICE_SERVER + "img/detail/" + props.manuscript.image;
    const additional_content = props.manuscript.additional_content;
    const larger_unit = props.manuscript.larger_unit;
    const related_manuscripts = props.manuscript.related_manuscripts;

    return (
        <div className="hcManuscriptBasicInfo">
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabelHeader">
                        {props.manuscript.shelfmark}
                        <div className="hcSteinova">{props.manuscript.steinova}</div>
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptValueSmall">
                        Created by Evina Steinová on 7 September 2020<br/>
                        Last modified by Evina Steinová on 7 September 2020
                    </div>
                    <div className="hcManuscriptValueOtherIDs">
                        Anspach {props.manuscript.anspach}<br/>
                        BK {props.manuscript.bischoff}
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Date of origin
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.bischoff_cla_date} (BK)
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
                <div className="hcManuscriptImg"><img className="thumb" src={img}/></div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Folia
                    </div>
                    <div className="hcManuscriptValue">
                        {props.manuscript.no_of_folia} fols.
                    </div>
                </div>
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Layout
                    </div>
                    <div className="hcManuscriptValue">
                        {layout_items.map(line => {
                            return <div className="line">{line}</div>
                        })}
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
                <div className="hcManuscriptMaterialType">
                    <strong>{props.manuscript.material_type}</strong>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Content
                    </div>
                    <div className="hcManuscriptValue">
                        {content.map(item => {
                            return <div className="line">{item.details} <i>({item.locations})</i></div>
                        })}
                    </div>
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
                            return (<div><div className="line">{item.reason}</div>
                            {item.intern.map(item_in => {
                                const url = "/#detail/" + item_in.id;
                                return (<div onClick={() => {window.scroll(0,0); window.location.href = url;}}>{item_in.shelfmark}</div>)
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
                        -
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Innovations
                    </div>
                    <div className="hcManuscriptValue">
                        -
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Additional observations
                    </div>
                    <div className="hcManuscriptValue">
                        on fols. 16r-17v a glossary-like text that excerpts terms from Etym. VI, VII and VIII: 7.1.1-17 + 6.19.50 + (7.2.6-7 + 7.2.13-14 + 7.2.28-29 + 7.2.31) + 7.3.2 + 7.5.1 + (7.6.4 + 7.6.22 + 7.6.25) + 7.7.2 + 7.8.33 + (7.9.3-4 + 7.9.6-7) + 7.11.1 + 7.12.1 + 7.6.21 + (7.12.12 + 7.12.20 + 7.12.29 + 7.12.31) + (7.13.1 + 7.13.3) + (7.14.5-7 + 7.14.9-10) + (8.1.1 + 8.1.7) + 8.2.6 + 8.3.4 + 8.4.3-4 + 8.6.1 + 8.9.21
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Bibliography
                    </div>
                    <div className="hcManuscriptValue">
                        Beeson, p. 98; Keefe II, pp. 100-103;<br/>Keefe, Catalogue, 360;<br/>Stadelmaier, pp. 100-101;<br/> Arevalo, Isidoriana IV, pp. 357-360
                    </div>
                </div>
            </div>
            <div className="hcManuscriptTable">
                <div className="hcManuscriptRow">
                    <div className="hcManuscriptLabel">
                        Digitized at
                    </div>
                    <div className="hcManuscriptValue">
                        <a href="#">https://digi.vatlib.it/view/bav_pal_lat_485</a><br/>
                        <a href="#"></a><br/>
                        <a href="#"></a><br/>
                        <a href="#"></a><br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManuscriptDetails;
