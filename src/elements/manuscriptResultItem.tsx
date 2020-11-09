import React from "react";
import {IResultManuscript} from "../misc/interfaces";

export default function ManuscriptResultItem(props: { item: IResultManuscript }) {
    const width: number = 75;
    let certainty: string = "";
    if (props.item.certainty === 'no') {
        certainty = " (?)";
    }
    const thumb:string = "http://www.huc.localhost/isidore_service/img/thumbs/" + props.item.image;

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

    function setSecondStyle(design: string): string
    {
        let returnValue: string = "";
        switch (design)
        {
            case "destroyed":
                returnValue = "psDestroyed";
                break;
            case "incomplete":
                returnValue = "psIncomplete";
                break;
            case "marginalia":
                returnValue = "psMarginalia";
                break;
            case "1 volume, destroyed":
                returnValue = "psOneVolume";
                break;
            case "2 volumes":
                returnValue = "psTwoVolumes";
                break;
            case "first volume":
                returnValue = "psFirstVolume";
                break;
            case "addition in a blank space on a page":
                returnValue = "psAddition";
                break;
            case "1 volume":
                returnValue = "psOneVolume";
                break;
            case "second volume":
                returnValue = "psSecondVolume";
                break;
            case "fragment, palimpsest":
                returnValue = "psFragment";
                break;
            case "fragment":
                returnValue = "psFragment";
                break;
            case "2 volumes, cropped":
                returnValue = "psTwoVolumes";
                break;
            case "1 volume, cropped":
                returnValue = "psOneVolume";
                break;
            case "second volume, destroyed":
                returnValue = "psSecondVolume";
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

    function formatPhysicalState(phState: string) {
        if (phState == "addition in a blank space on a page") {
            return "addition";
        } else {
            return phState;
        }
    }

    function formatFolia(fols: string) {
        if (fols == null || fols == "") {
            return ""
        } else {
            return fols + " fols., ";
        }
    }

    function formatDimension(height: string, width: string) {
        if (height == null || height == "" || width == null || width == "") {
            return "";
        } else {
            return height + " x " + width + " mm";
        }
    }

    const style: string = setStyle(props.item.designed_as);
    const secondStyle: string = setSecondStyle(props.item.physical_state);


    return (
        <div className="resItem">
            <div className="resultCell">
                <div className="thumb"><img src={thumb} alt="Test"/></div>
                <div className="resultData">
                    <div className="resultShelfmark" onClick={() => {window.location.href = "#detail/" + props.item.id; }}>
                        {props.item.shelfmark}
                    </div>
                    <div className="resultDateLocation">{props.item.scaled_dates[0].date}, {props.item.absolute_places[0].place_absolute}{certainty}</div>
                    <div className="resultDateLocation">{formatFolia(props.item.no_of_folia)} {formatDimension(props.item.page_height_min,props.item.page_width_min)}</div>
                    <div className="resultDescription">{props.item.material_type},  includes <i>Etym.</i> {props.item.books_latin}</div>
                    <div className="resultDateLocation">{props.item.additional_content_scaled}</div>
                </div>
                <div className={style}>{props.item.designed_as}</div>
                <div className={secondStyle}>{formatPhysicalState(props.item.physical_state)}</div>
            </div>
        </div>
    )
}