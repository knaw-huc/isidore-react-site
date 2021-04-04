import React from "react";
import {IResultManuscript} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import canonical from "../assets/img/icon-canonical.png";
import non_canonical from "../assets/img/icon-non-canonical.png";
import unknown from "../assets/img/icon-unknown.png";
import excerpts from "../assets/img/icon-excerps.png";

export default function ManuscriptResultItem(props: { item: IResultManuscript }) {
    const width: number = 75;
    let certainty: string = "";
    if (props.item.certainty === 'no') {
        certainty = " (?)";
    }
    const thumb:string = SERVICE_SERVER + "img/thumbs/" + props.item.image;

    function setStyle(design: string): string
    {
        let returnValue: string = "";
        switch (design)
        {
            case "non-canonical Etymologiae":
                return non_canonical;
            case "excerpts":
                return excerpts;
            case "canonical Etymologiae":
                return canonical
            case "unknown":
                return unknown;
            default:
                return unknown;
        }
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
                returnValue = "psUnknownDesign";
                break;
            default:
                returnValue = "psUnknownDesign";
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
        if (fols == null || fols === "") {
            return ""
        } else {
            if (fols === "1") {
                return fols + " fol.";
            } else {
                return fols + " fols., ";
            }
        }
    }

    function formatDimension(height: string, width: string) {
        if (height == null || height === "" || width == null || width === "") {
            return "-";
        } else {
            return height + " x " + width + " mm";
        }
    }

    function showContent(content: string): string {
        if (content.trim() === "") {
            return "-";
        } else {
            if (content.length > 100) {
                return content.slice(0, 100) + "...";
            } else {
                return content;
            }
        }
    }

    //const style: string = "hcIKstateIconBlock " + setStyle(props.item.designed_as);
    const secondStyle: string = "hcIKstateIconBlock " + setSecondStyle(props.item.physical_state);


    return (
            <li className="hcMarginBottom2 clickableResultItem" onClick={() => {
                window.location.href = "#detail/" + props.item.id; }}>
                <div className="hcIKresultCard hcIKBgLight">
                    <div className="hcAlignLeftRight hcMarginBottom1">
                        <strong className="">Albi, Bibliothèque municipale, MS 38</strong>
                        <div>
                            <div className="hcIKstate">
                                <div className="hcIKstateLabelBlock hcSmallTxt">{props.item.designed_as}</div>
                                <div className='hcIconStyle'>
                                    <img className='hcIconStyle'
                                        src={setStyle(props.item.designed_as)}
                                        alt=""/>
                                </div>
                            </div>
                            <div className="hcIKstate">
                                <div className="hcIKstateLabelBlock hcSmallTxt">{props.item.physical_state}</div>
                                <div className={secondStyle}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hcIKresultCardInfo">
                        <div className="hcIKkImageBlockResult">
                            <img
                                src={thumb}
                                alt={props.item.shelfmark}/>
                        </div>
                        <div className="hcAlignVertical">
                            <div className="hc2columns">
                                <div className="hcBasicSideMargin">
                                    <div className="hcMarginBottom05">
                                        <div className="hcDataLabel">Date of origin</div>
                                        {props.item.scaled_dates[0].date}
                                    </div>
                                    <div className="hcMarginBottom05">
                                        <div className="hcDataLabel">Place of origin</div>
                                        {props.item.absolute_places[0].place_absolute} {certainty}
                                    </div>
                                    <div className="hcMarginBottom05">
                                        <div className="hcDataLabel">Folia</div>
                                        {props.item.no_of_folia}
                                    </div>
                                    <div className="hcMarginBottom05">
                                        <div className="hcDataLabel">Page dimensions</div>
                                        {formatDimension(props.item.page_height_min, props.item.page_width_min)}
                                    </div>
                                </div>
                                <div className="hcBasicSideMargin">
                                    <div className="hcMarginBottom05">
                                        <div className="hcDataLabel">Material type</div>
                                        {props.item.material_type}
                                    </div>
                                    <div className="hcMarginBottom1">
                                        <div className="hcDataLabel">Content</div>
                                        <span className="hcSmallTxt">
                                            {showContent(props.item.additional_content_scaled)}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </li>

    )
}