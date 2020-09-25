import React from "react";
import {IResultManuscript} from "../misc/interfaces";
import thumb from "../assets/img/thumbnail_example.jpg";

export default function ManuscriptResultItem(props: { item: IResultManuscript }) {
    const width: number = 74;
    let certainty: string = "";
    if (props.item.certainty == 'no') {
        certainty = "?";
    }

    function setStyle(design: string): string
    {
        let returnValue: string = "";
        switch (design)
        {
            case "non-canonical Etymologiae":
                returnValue = "hcNonCanDesign";
                break;
            case "excerpts":
                returnValue = "hcExcDesign";
                break;
            case "canonical Etymologiae":
                returnValue = "hcCanDesign";
                break;
            case "unknown":
                returnValue = "hcUnknownDesign";
                break;
            default:
                returnValue = "hcUnknownDesign";
                break;
        }
        return returnValue;
    }

    const style: string = setStyle(props.item.designed_as);


    return (
        <div className="resItem">
            <div className="resultCell">
                <div className="thumb"><img src={thumb} alt="Test"/></div>
                <div className="resultData">
                    <div className="resultShelfmark">
                        {props.item.shelfmark}
                    </div>
                    <div className="resultDateLocation">{props.item.bischoff_cla_date}, {props.item.place}{certainty}</div>
                    <div className="resultDateLocation">{props.item.no_of_folia} fols., {props.item.page_height_min} x {props.item.page_width_min} mm</div>
                    <div className="resultDescription">{props.item.material_type},  includes <i>Etym.</i> {props.item.books}</div>
                    <div className="resultDateLocation">{props.item.additional_content_scaled}</div>
                </div>
                <div className={style}>{props.item.designed_as}</div>
            </div>
        </div>
    )
}