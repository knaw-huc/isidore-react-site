import React from "react";
import {IResultManuscript} from "../misc/interfaces";
import thumb from "../assets/img/thumbnail_example.jpg";

export default function ManuscriptResultItem(props: { item: IResultManuscript }) {
    const width: number = 74;
    let certainty: string = "";
    if (props.item.certainty == 'no') {
        certainty = "?";
    }

    return (
        <div className="resItem">
            <div className="resultCell">
                <div className="colorblock"> <div className="square"/></div>
                <div className="thumb"><img src={thumb} alt="Test"/></div>
                <div className="resultData">
                    <div className="resultShelfmark">{props.item.shelfmark}</div>
                    <div className="resultDateLocation">{props.item.bischoff_cla_date}, {props.item.place}{certainty}</div>
                    <div className="resultDateLocation">{props.item.no_of_folia} fols., {props.item.page_height_min} x {props.item.page_width_min} mm</div>
                    <div className="resultDescription">{props.item.material_type},  includes <i>Etym.</i> {props.item.books}</div>
                    <div className="resultDateLocation">{props.item.additional_content_scaled}</div>
                </div>
            </div>
        </div>
    )
}