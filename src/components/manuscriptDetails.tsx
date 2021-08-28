import React, {useState} from "react";
import {IManuscript} from "../misc/interfaces";
import {SERVICE_SERVER, HOME, EDITION} from "../misc/config";
import canonical from "../assets/img/icon-canonical.png";
import non_canonical from "../assets/img/icon-non-canonical.png";
import unknown from "../assets/img/icon-unknown.png";
import excerpts from "../assets/img/icon-excerps.png";
import iiifImg from "../assets/img/iiif.png";
import {toBase64} from "js-base64";


function ManuscriptDetails(props: { manuscript: IManuscript }) {
    const [help, setHelp] = useState(false);
    const [contentHelp, setContentHelp] = useState(false);
    const [typeHelp, setTypeHelp] = useState(false);
    const [addHelp, setAddHelp] = useState(false);
    const [largeHelp, setLargeHelp] = useState(false);
    const [relHelp, setRelHelp] = useState(false);
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

    console.log(props.manuscript.iiif);

    let pgType = "Page";
    if (props.manuscript.page_number.indexOf('r') !== -1 || props.manuscript.page_number.indexOf('v') !== -1) {
        pgType = "Folio";
    }

    function setStyle(design: string): string {
        let returnValue: string = "";
        switch (design) {
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

    function openWindow(ref: string) {
        let a = document.createElement('a');
        a.target = '_blank';
        a.href = ref;
        a.click();
    }


    return (
        <div>
            <div>
                <div className="hcContentContainer hcMarginBottom1 hcMarginTop3">
                    <div className="hcIKheaderSplit hcAlignLeftRight">
                        <div className="hcBasicSideMargin ">
                            <h1>{props.manuscript.shelfmark}</h1>
                            <span
                                className="hcSmallTxt hcClrTxt_Grey">{HOME}#detail/{props.manuscript.id}
                                </span>
                            {props.manuscript.former_shelfmarks !== "" && <span
                                className="hcSmallTxt hcClrTxt_Grey">Formerly {props.manuscript.former_shelfmarks}
                                </span>}
                            <span
                                className="hcSmallTxt hcClrTxt_Grey">Created by {props.manuscript.created_by} on {props.manuscript.created_on}
                                </span>
                            {props.manuscript.last_updated_on !== "" &&
                            <span
                                className="hcSmallTxt hcClrTxt_Grey">Last updated by {props.manuscript.created_by} on {props.manuscript.last_updated_on}
                                </span>}
                            {props.manuscript.contributions_from !== "" &&
                            <span
                                className="hcSmallTxt hcClrTxt_Grey">Contributions from {props.manuscript.contributions_from}
                                </span>}
                            {props.manuscript.completeness_of_the_record !== "" &&
                            <span
                                className="hcSmallTxt hcClrTxt_Grey">State of the record: {props.manuscript.completeness_of_the_record}
                                </span>}
                            <span className="hcSmallTxt hcMarginTop1"><div className="hcClickable" onClick={() => {
                                window.history.back()
                            }}>Back to results</div></span>
                        </div>

                        <div className="hcBasicSideMargin hcAlignVertical">
                        <span className="hcAlignRight tikkieKleiner">Innovating knowledge ID <strong
                            className="hcIKidBlock">{props.manuscript.steinova}</strong></span>
                            {props.manuscript.anspach !== "" && (<span className="hcSmallTxt  hcAlignRight">Anspach
                            <strong className="hcIKidBlock">{props.manuscript.anspach}</strong></span>)}
                            {props.manuscript.bischoff !== "" && (
                                <span className="hcSmallTxt hcAlignRight">Bischoff <strong
                                    className="hcIKidBlock">{props.manuscript.bischoff}</strong></span>)}
                            {props.manuscript.siglum !== "" && (
                                <span className="hcSmallTxt hcAlignRight">Siglum <strong
                                    className="hcIKidBlock">{props.manuscript.siglum}</strong></span>)}
                            <div className="hcIKstate hcMarginTop1">
                                <div
                                    className="hcIKstateLabelBlock hcSmallTxt ">{props.manuscript.designed_as}</div>
                                <div className="hcIKstateIconBlock">
                                    <img
                                        src={setStyle(props.manuscript.designed_as)}
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
                                <div className="hcDataLabel">Page dimensions</div>
                                {layout_items}
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Physical condition</div>
                                {props.manuscript.physical_state_scaled}
                                {props.manuscript.physical_state !== "" ? (
                                    <div>{props.manuscript.physical_state}</div>) : (
                                    <div/>)}
                            </div>

                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Script</div>
                                {props.manuscript.script}
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Type <div className="detailHelp"
                                                                       onClick={() => setTypeHelp(!typeHelp)}><img
                                    className="hcIconHelpDetail"
                                    src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                                    alt=""/></div>
                                </div>
                                {typeHelp && (<div className="hcFacetHelp" onClick={() => {
                                    setTypeHelp(false)
                                }}>
                                    refers to the character of manuscripts transmitting the <em>Etymologiae</em>.
                                    Manuscripts transmitting only the <em>Etymologiae</em> are designated
                                    as <strong>Big
                                    Isidores</strong>. Other manuscripts are assigned to a category based on a
                                    notable
                                    thematic profile. Not all texts found in these manuscripts must fit this
                                    profile,
                                    but the majority does. Manuscripts that do not fit into any of the profiles are
                                    classified as <strong>miscellanies</strong>. In case the thematic design of a
                                    manuscript cannot be established due to its fragmentary preservation, it is
                                    labelled
                                    as <strong>unknown</strong>.
                                </div>)}
                                {props.manuscript.type}
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Transmission format <div className="detailHelp"
                                                                                      onClick={() => setHelp(!help)}>
                                    <img
                                        className="hcIconHelpDetail"
                                        src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                                        alt=""/></div>
                                </div>
                                {help && (<div className="hcFacetHelp" onClick={() => {
                                    setHelp(false)
                                }}>
                                    Based on the way in which they transmit the material from Isidore’s work,
                                    manuscripts in the database are divided into three transmission formats:
                                    <ul>
                                        <li><strong>canonical <em>Etymologiae</em></strong> transmit this material
                                            principally as it was structured and organized by Braulio of Zaragoza,
                                            that
                                            is as an encyclopaedic text;
                                        </li>
                                        <li><strong>non-canonical <em>Etymologiae</em></strong> transmit a part of
                                            Isidore’s text repurposed for a novel use by medieval users, not as an
                                            encyclopaedia;
                                        </li>
                                        <li>the label excerpts indicates a manuscript that transmits short excerpts
                                            from
                                            the <em>Etymologiae</em>.
                                        </li>
                                    </ul>
                                    The label <strong>unknown</strong> is used for manuscripts which cannot be
                                    placed
                                    into either of the three categories.

                                </div>)}
                                {props.manuscript.designed_as}
                            </div>

                        </div>
                        <div className="hcIKkImageBlock">
                            <img
                                src={img}
                                alt=""/>
                            {props.manuscript.page_number !== "" &&
                            <div className="hcPageNumber">{pgType} {props.manuscript.page_number}</div>}
                            {props.manuscript.iiif !== "" &&
                            <div className="iiif" onClick={() => {
                                openWindow("#viewer/" + toBase64(props.manuscript.iiif));
                            }}><img
                                src={iiifImg}
                                alt=""/></div>}
                        </div>
                    </div>


                    <hr className="hcMarginTop2"/>

                    <div className="hc2columns hcMarginTop2">


                        <div className="hcBasicSideMargin">
                            <h2>Content <div className="detailHelp"
                                             onClick={() => setContentHelp(!contentHelp)}><img
                                className="hcIconHelpDetail"
                                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                                alt=""/></div></h2>
                            {contentHelp && (<div className="hcFacetHelp" onClick={() => {
                                setContentHelp(false)
                            }}>
                                details the sections of the <em>Etymologiae</em> appearing in the manuscript. Each
                                unit
                                of transmission is described separately.
                            </div>)}
                            {content.map(item => {
                                return <div className="hcManuscriptRow">
                                    <div className="hcManuscriptValue underlineListItem">
                                        <div>{item.material_type === "full" ? (
                                            <strong>canonical Etymologiae</strong>) : (
                                            <strong>{item.material_type}</strong>)}, <strong>books: {item.books_included}</strong>
                                        </div>
                                        {item.details.map(values => {
                                            return <div className="line">
                                                <i>Etym. </i> {values.details}&nbsp;&nbsp;&nbsp;
                                                <i>({values.locations})</i></div>
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>


                        <div className="hcBasicSideMargin">
                            <h2>Additional content <div className="detailHelp"
                                                        onClick={() => setAddHelp(!addHelp)}><img
                                className="hcIconHelpDetail"
                                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                                alt=""/></div></h2>
                            <div className="hcMarginBottom1">
                                {addHelp && (<div className="hcFacetHelp" onClick={() => {
                                    setAddHelp(false)
                                }}>
                                    Lists texts appearing in the manuscript side by side with the material from
                                    the <em>Etymologiae</em>.
                                </div>)}
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
                                <div className="hcDataLabel">Interpolations</div>
                                {props.manuscript.interpolations.length == 0 && (
                                    <div>-</div>
                                )}
                                {props.manuscript.interpolations.map(item => {
                                    return (<div className="innovationListItem">
                                        {item.interpolation} ({item.folia})
                                        {item.description !== "" && (
                                            <div>{item.description}</div>
                                        )}
                                    </div>)
                                })
                                }
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Diagrams</div>
                                {props.manuscript.diagrams.length == 0 && (
                                    <div>-</div>
                                )}
                                {props.manuscript.diagrams.map(item => {
                                    return (<div className="innovationListItem">
                                        {item.diagram_type} ({item.folia})
                                        {item.description !== "" && (
                                            <div>{item.description}</div>
                                        )}
                                    </div>)
                                })
                                }
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Easter table</div>
                                {props.manuscript.easter_tables.length == 0 && (
                                    <div>-</div>
                                )}
                                {props.manuscript.easter_tables.map(item => {
                                    return (<div className="innovationListItem">
                                        {item.easter_table_type} ({item.folia})
                                        {item.remarks !== "" && (
                                            <div>{item.remarks}</div>
                                        )}
                                    </div>)
                                })
                                }
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Annotations</div>
                                {props.manuscript.annotations.length == 0 && (
                                    <div>-</div>
                                )}
                                {props.manuscript.annotations.map(item => {
                                    return (<div className="innovationListItem">
                                        {item.number_of_annotations} {item.language} glosses to books {item.books}
                                        {item.remarks !== "" && (
                                            <div>{item.remarks}</div>
                                        )}
                                        {item.url !== "" && (
                                            (<div className="linkLine" onClick={() => {
                                                openWindow(EDITION + item.url);
                                            }}>
                                                {EDITION + item.url}
                                            </div>)
                                        )}
                                    </div>)
                                })
                                }
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Other innovations</div>
                                <div dangerouslySetInnerHTML={{__html: props.manuscript.innovations}}/>
                            </div>
                        </div>

                        <div className="hcBasicSideMargin hcMarginTop3">
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Larger unit <div className="detailHelp"
                                                                              onClick={() => setLargeHelp(!largeHelp)}>
                                    <img
                                        className="hcIconHelpDetail"
                                        src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                                        alt=""/></div>
                                </div>
                                {largeHelp && (<div className="hcFacetHelp" onClick={() => {
                                    setLargeHelp(false)
                                }}>
                                    If material from the <em>Etymologiae</em> appears in the manuscript embedded
                                    into a
                                    larger collection, this collection is named or briefly described here.
                                </div>)}
                                {larger_unit.map(line => {
                                    return <div className="line" dangerouslySetInnerHTML={{__html: line}}/>
                                })}
                            </div>
                            <div className="hcMarginBottom1">
                                <div className="hcDataLabel">Related manuscripts <div className="detailHelp"
                                                                                      onClick={() => setRelHelp(!relHelp)}>
                                    <img
                                        className="hcIconHelpDetail"
                                        src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                                        alt=""/></div>
                                </div>
                                {relHelp && (<div className="hcFacetHelp" onClick={() => {
                                    setRelHelp(false)
                                }}>
                                    if the manuscript shares an innovation with other manuscripts in our outside of
                                    the
                                    database, the nature of the innovation is shortly described and the manuscripts
                                    are
                                    listed here. Manuscripts with a record view in the database are linked.
                                </div>)}
                                {related_manuscripts.map((item, index) => {
                                        return (<div>
                                            <em>{item.reason}</em>
                                            <ul className="relationList">
                                                {item.intern.map((item_in, index) => {
                                                    const url = "/#detail/" + item_in.id;
                                                    return (<li>
                                                        <div key={index} className="linkLine" onClick={() => {
                                                            window.scroll(0, 0);
                                                            window.location.href = url;
                                                        }}>{item_in.shelfmark}</div>
                                                    </li>)
                                                })}
                                                {item.extern.map((index_ex, index) => {
                                                    return (<li>
                                                        <div key={index} className="line"
                                                             dangerouslySetInnerHTML={{__html: index_ex.name}}/>
                                                    </li>)

                                                })}
                                            </ul>
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
                            <div dangerouslySetInnerHTML={{__html: props.manuscript.additional_observations}}/>
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
                                    <div>
                                        <div className="linkLine" onClick={() => {
                                            openWindow(item.other_links);
                                        }}>{item.other_links}</div>
                                        {item.label !== null && (<div>{item.label}</div>)}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="hcMarginBottom1">
                            <div className="hcDataLabel">Additional information online</div>
                            {props.manuscript.url_other.map((item) => {
                                return (
                                    <div>
                                        <div className="linkLine" onClick={() => {
                                            openWindow(item.url);
                                        }}>{item.url}</div>
                                        {item.label}
                                    </div>
                                )
                            })}


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
                        {/*<div className="hcBasicSideMargin hcSmallTxt">
                                Created by Evina Steinová on 7 September 2020<br/>
                                Last modified by Evina Steinová on 7 September 2020
                            </div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManuscriptDetails;
