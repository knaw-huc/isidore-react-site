import React, {useEffect} from "react";
import Header from "../page/header";
// import Footer from "../page/footer";
import ManuscriptList from "./manuscriptList";
import {useState} from "react";
import SearchFreeText from "../facets/searchFreeText";
import GeoNameFacet from "../facets/geoNameFacet";
import AbsolutePlaceFacet from "../facets/absolutePlaceFacet";
import DatelabelFacet from "../facets/dateLabelFacet";
import FragmentFacet from "../facets/fragmentFacet";
import BookFacet from "../facets/bookFacet";
import PageDimensionsFacet from "../facets/pageDimensions";
import PhysicalStateFacet from "../facets/physicalStateFacet";
import ScriptFacet from "../facets/scriptFacet";
import ManuscriptTypeFacet from "../facets/manuscriptType";
import LayoutFacet from "../facets/layoutFacet";
import TransmittedFacet from "../facets/transmittedFacet";
// import EasterTableFacet from "../facets/easterTableFacet";
import GeneralListFacet from "../facets/generalListFacet";
import ProvenanceFacet from "../facets/provenanceFacet";
import AuthorFacet from "../facets/authorFacet";
import CurrentPlaceFacet from "../facets/currentPlaceFacet";
import InterpolationsFacet from "../facets/interpolationFacet";
import RegionFacet from "../facets/regionFacet";
import {
    IResultManuscriptList,
    ISearchObject,
    ISendCandidate,
    IFacetCandidate,
    ISearchValues,
    IRemoveFacet,
    IResetFacets
} from "../misc/interfaces";
import {PROJECT_SITE, SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";
import IsiMap from "../elements/map";
import DummySliderFacet from "../facets/dummySliderfacet";
import AnnotationsFacet from "../facets/annotationsFacet";
import RelationsFacet from "../facets/relationsFacet";
import DigitizedFacet from "../facets/digitizedFacet";
import LargerCollectionFacet from "../facets/largerCollectionFacet";
import ExcludeFullFacet from "../facets/excludeFullFacet";
import InnovationsFacet from "../facets/innovationFacet";
import DiagramsFacet from "../facets/diagramsFacet";


export default function Search(props: { search_string: string }) {
    let searchBuffer: ISearchObject = {
        facetstate: {
            search: true,
            geo: false,
            dateLabel: false,
            book: false,
            dimensions: false,
            filters: false,
            physicalState: false,
            script: false,
            manuscript: false,
            layout: false,
            transmitted: false,
            provenance: false,
            authors: false,
            currentplace: false,
            region: false,
            relations: false,
            innovations: false,
            diagrams: false,
            diagramsYes: false,
            annotations: false,
            annotationsYes: false,
            digitized: false,
            larger: false,
            exclude: false,
            fragment: false,
            interpolations: false,
            interpolationsYes: false,
            easter_tables: false
        },
        searchvalues: "none",
        page: 1,
        page_length: 500,
        sortorder: "",
        is_list: true
    };

    if (props.search_string !== "none") {
        try {
            searchBuffer = JSON.parse(Base64.fromBase64(props.search_string)) as ISearchObject;
        } catch (Error) {
            window.scroll(0, 0);
            window.location.href = "/";
        }

    }

    const [searchFT, setSearchFT] = useState(searchBuffer.facetstate.search);
    const [geoFacet, setGeoFacet] = useState(searchBuffer.facetstate.geo);
    const [dateLabelFacet, setDatelabelFacet] = useState(searchBuffer.facetstate.dateLabel);
    const [bookFacet, setBookFacet] = useState(searchBuffer.facetstate.book);
    const [dimFacet, setDimFacet] = useState(searchBuffer.facetstate.dimensions);
    const [innovationsFacet, setInnovationsFacet] = useState(searchBuffer.facetstate.innovations);
    const [diagramsFacet, setDiagramsFacet] = useState(searchBuffer.facetstate.diagrams);
    const [diagramsYes, setDiagramsYes] = useState(searchBuffer.facetstate.diagrams);
    const [physicalStateFacet, setPhysicalStatefacet] = useState(searchBuffer.facetstate.physicalState);
    const [scriptFacet, setScriptFacet] = useState(searchBuffer.facetstate.script);
    const [manuscriptFacet, setManuscriptFacet] = useState(searchBuffer.facetstate.manuscript);
    const [layoutFacet, setLayoutFacet] = useState(searchBuffer.facetstate.layout);
    const [transmittedFacet, setTransmittedFacet] = useState(searchBuffer.facetstate.transmitted);
    const [provenanceFacet, setProvenanceFacet] = useState(searchBuffer.facetstate.provenance);
    const [authorFacet, setAuthorFacet] = useState(searchBuffer.facetstate.authors);
    const [currentPlaceFacet, setCurrentPlaceFacet] = useState(searchBuffer.facetstate.currentplace);
    const [regionFacet, setRegionFacet] = useState(searchBuffer.facetstate.region);
    const [annotationFacet, setAnnotationFacet] = useState(searchBuffer.facetstate.annotations);
    const [annotationsYes, setAnnotationsYes] = useState(searchBuffer.facetstate.annotationsYes);
    const [digitizedFacet, setDigitizedfacet] = useState(searchBuffer.facetstate.digitized);
    const [largerFacet, setLargerfacet] = useState(searchBuffer.facetstate.larger);
    const [excludeFacet, setExcludeFacet] = useState(searchBuffer.facetstate.exclude);
    const [fragmentFacet, setFragmentFacet] = useState(searchBuffer.facetstate.fragment);
    const [interpolationsFacet, setInterpolationsFacet] = useState(searchBuffer.facetstate.interpolations);
    const [interpolationsYes, setInterpolationsYes] = useState(searchBuffer.facetstate.interpolationsYes);
    const [relationsFacet, setRelationsFacet] = useState(searchBuffer.facetstate.relations);
    const [easterTableFacet, setEasterTableFacet] = useState(searchBuffer.facetstate.relations);
    const [refresh, setRefresh] = useState(false);
    const [searchData, setSearchData] = useState<ISearchObject>(searchBuffer);
    const [isList, setIsList] = useState(searchBuffer.is_list);
    const [downloadActive, setDownloadActive] = useState(false);


    const cross: string = "[x]";
    let facets: ISearchValues[] = [];
    if (typeof searchBuffer.searchvalues === "object") {
        facets = searchBuffer.searchvalues as ISearchValues[];
    }

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IResultManuscriptList>({amount: 0, pages: 0, manuscripts: []});

    async function fetchData() {
        const url = SERVICE_SERVER + "search/?q=" + Base64.toBase64(JSON.stringify(searchData));
        const response = await fetch(url);
        const json: IResultManuscriptList = await response.json();
        setResult(json);
        setLoading(false);
    }

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        let searchBuffer: ISearchObject = searchData;
        switch (field) {
            case "Has interpolations":
                setInterpolationsYes(false);
                if (typeof searchBuffer.searchvalues === "object") {
                    searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                        return el.field !== "interpolations.interpolation";
                    });
                }
                break;
            case "Has diagrams":
                setDiagramsYes(false);
                if (typeof searchBuffer.searchvalues === "object") {
                    searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                        return el.field !== "diagrams.diagram_type";
                    });
                }
                break;
            case "Has annotations":
                setAnnotationsYes(false);
                if (typeof searchBuffer.searchvalues === "object") {
                    searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                        return el.field !== "annotations.amount";
                    });
                }
                break;

        }
        if (typeof searchBuffer.searchvalues === "object") {
            searchBuffer.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter((element => element !== value));
                }
            })
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                return el.values.length > 0
            });
            if (searchBuffer.searchvalues.length === 0) {
                searchBuffer.searchvalues = "none";
            }
        }
        setSearchData(searchBuffer);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        setRefresh(!refresh);
    }

    function openWindow(ref: string) {
        let a = document.createElement('a');
        a.target = '_blank';
        a.href = ref;
        a.click();
    }

    const resetFacets: IResetFacets = () => {
        let searchBuffer: ISearchObject = searchData;
        searchBuffer.page = 1;
        searchBuffer.searchvalues = "none";
        setSearchFT(true);
        setGeoFacet(false);
        setDatelabelFacet(false);
        setBookFacet(false);
        setDimFacet(false);
        setPhysicalStatefacet(false);
        setScriptFacet(false);
        setManuscriptFacet(false);
        setLayoutFacet(false);
        setTransmittedFacet(false);
        setProvenanceFacet(false);
        setAuthorFacet(false);
        setCurrentPlaceFacet(false);
        setRegionFacet(false);
        setRelationsFacet(false);
        setInnovationsFacet(false);
        setDiagramsFacet(false);
        setDiagramsYes(false);
        setAnnotationFacet(false);
        setAnnotationsYes(false);
        setDigitizedfacet(false);
        setLargerfacet(false);
        setExcludeFacet(false);
        setFragmentFacet(false);
        setInterpolationsFacet(false);
        setInterpolationsYes(false);
        setEasterTableFacet(false);
        setSearchData(searchBuffer);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchBuffer));
        setRefresh(!refresh);
    }


    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        let searchBuffer: ISearchObject = searchData;
        switch (candidate.field) {
            case "has_interpolations":
                if (candidate.candidate === 'yes') {
                    setInterpolationsYes(true);
                } else {
                    setInterpolationsYes(false);
                }
                break;
            case "has_diagrams":
                if (candidate.candidate === 'yes') {
                    setDiagramsYes(true);
                } else {
                    setDiagramsYes(false);
                }
                break;
            case "has_annotations":
                if (candidate.candidate === 'yes') {
                    setAnnotationsYes(true);
                } else {
                    setAnnotationsYes(false);
                }
                break;

        }
        if (searchData.searchvalues === "none") {
            searchBuffer.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            setSearchData(searchBuffer);
            window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
            setRefresh(!refresh);
        } else {
            if (typeof searchBuffer.searchvalues === "object") {
                let found: boolean = false;
                searchBuffer.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            item.values.push(candidate.candidate);
                        }
                    }
                });
                if (!found) {
                    searchBuffer.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
            searchBuffer.page = 1;
            setSearchData(searchBuffer);
            window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
            setRefresh(!refresh);
            window.scroll(0, 0);
        }
    }


    function setPageLength(amount: string) {
        let sd = searchData;
        sd.page = 1;
        sd.page_length = parseInt(amount);
        setSearchData(sd);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        window.scroll(0, 0);
        setRefresh(!refresh);
    }

    function nextPage() {
        goToPage(searchData.page + 1);
    }

    function prevPage() {
        if (searchData.page > 0) {
            goToPage(searchData.page - 1);
        }

    }

    function goToPage(page: number) {
        let sd = searchData;
        sd.page = page;
        setSearchData(sd);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        setRefresh(!refresh);
        window.scroll(0, 0);
    }

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginTop3">
                <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                    <div className="hcLayoutFacets">
                        <button type="button" name="button" id="showFacets" className="hcfixedSideButton"><img
                            src="https://d33wubrfki0l68.cloudfront.net/191a405740a4ade92836ba6eea6a6ceaa798bf2f/a4d8b/images/icons/icon-set-facets.svg"
                            className="icon" alt="Facet button"/></button>
                        <div className="hcFacetSubDivision"
                             onClick={() => setSearchFT(!searchFT)}>
                            {searchFT ? (<span className="hcFacetGroup">&#9660; search</span>) : (
                                <span className="hcFacetGroup">&#9658; search</span>
                            )}
                        </div>
                        {searchFT ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <SearchFreeText add={sendCandidate}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setCurrentPlaceFacet(!currentPlaceFacet);
                        }}>
                            {currentPlaceFacet ? (<span className="hcFacetGroup">&#9660; current place</span>) : (
                                <span className="hcFacetGroup">&#9658; current place</span>)}
                        </div>
                        {currentPlaceFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <CurrentPlaceFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}
                        <div className="hcFacetSubDivision"
                             onClick={() => setDatelabelFacet(!dateLabelFacet)}>
                            {dateLabelFacet ? (<span className="hcFacetGroup">&#9660; date of origin</span>) : (
                                <span className="hcFacetGroup">&#9658; date of origin</span>)}
                        </div>
                        {dateLabelFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <DatelabelFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                <DummySliderFacet add={sendCandidate}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision"
                             onClick={() => setGeoFacet(!geoFacet)}>
                            {geoFacet ? (<span className="hcFacetGroup">&#9660; place of origin</span>) : (
                                <span className="hcFacetGroup">&#9658; place of origin</span>)}
                        </div>
                        {geoFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <GeoNameFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                <AbsolutePlaceFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setRegionFacet(!regionFacet);
                        }}>
                            {regionFacet ? (<span className="hcFacetGroup">&#9660; region of origin</span>) : (
                                <span className="hcFacetGroup">&#9658; region of origin</span>)}
                        </div>
                        {regionFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <RegionFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setProvenanceFacet(!provenanceFacet);
                        }}>
                            {provenanceFacet ? (<span className="hcFacetGroup">&#9660; provenance</span>) : (
                                <span className="hcFacetGroup">&#9658; provenance</span>)}
                        </div>
                        {provenanceFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <ProvenanceFacet parentCallback={sendCandidate} search={searchData}
                                                 refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle"
                             onClick={() => setDimFacet(!dimFacet)}>
                            {dimFacet ? (<span className="hcFacetGroup">&#9660; page dimensions</span>) : (
                                <span className="hcFacetGroup">&#9658; page dimensions</span>)}
                        </div>
                        {dimFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <PageDimensionsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setLayoutFacet(!layoutFacet);
                        }}>
                            {layoutFacet ? (<span className="hcFacetGroup">&#9660; layout</span>) : (
                                <span className="hcFacetGroup">&#9658; layout</span>)}
                        </div>
                        {layoutFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <LayoutFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setPhysicalStatefacet(!physicalStateFacet);
                        }}>
                            {physicalStateFacet ? (<span className="hcFacetGroup">&#9660; physical state</span>) : (
                                <span className="hcFacetGroup">&#9658; physical state</span>)}
                        </div>
                        {physicalStateFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <PhysicalStateFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}


                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setTransmittedFacet(!transmittedFacet);
                        }}>
                            {transmittedFacet ? (
                                <span className="hcFacetGroup">&#9660; etym. transmitted as</span>) : (
                                <span className="hcFacetGroup">&#9658; etym. transmitted as</span>)}
                        </div>
                        {transmittedFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <TransmittedFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}
                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setBookFacet(!bookFacet)
                        }}>
                            {bookFacet ? (<span className="hcFacetGroup">&#9660; books</span>) : (
                                <span className="hcFacetGroup">&#9658; books</span>)}
                        </div>
                        {bookFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <BookFacet add={sendCandidate}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                            setManuscriptFacet(!manuscriptFacet);
                        }}>
                            {manuscriptFacet ? (<span className="hcFacetGroup">&#9660; manuscript type</span>) : (
                                <span className="hcFacetGroup">&#9658; manuscript type</span>)}
                        </div>
                        {manuscriptFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <ManuscriptTypeFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setAuthorFacet(!authorFacet);
                        }}>
                            {authorFacet ? (<span className="hcFacetGroup">&#9660; author / text / types</span>) : (
                                <span className="hcFacetGroup">&#9658; author / text / types</span>)}
                        </div>
                        {authorFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <AuthorFacet parentCallback={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setScriptFacet(!scriptFacet);
                        }}>
                            {scriptFacet ? (<span className="hcFacetGroup">&#9660; script</span>) : (
                                <span className="hcFacetGroup">&#9658; script</span>)}
                        </div>
                        {scriptFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <ScriptFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}


                        <div className="hcFacetSubDivision" onClick={() => {
                            setFragmentFacet(!fragmentFacet);
                        }}>
                            {fragmentFacet ? (<span className="hcFacetGroup">&#9660; fragment</span>) : (
                                <span className="hcFacetGroup">&#9658; fragment</span>)}
                        </div>
                        {fragmentFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <FragmentFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision"><hr/></div>


                        <div className="hcFacetSubDivision" onClick={() => {
                            setInnovationsFacet(!innovationsFacet);
                        }}>
                            {innovationsFacet ? (<span className="hcFacetGroup">&#9660; innovations</span>) : (
                                <span className="hcFacetGroup">&#9658; innovations</span>)}
                        </div>
                        {innovationsFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <InnovationsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setInterpolationsFacet(!interpolationsFacet);
                        }}>
                            {interpolationsFacet ? (<span className="hcFacetGroup">&#9660; interpolations</span>) : (
                                <span className="hcFacetGroup">&#9658; interpolations</span>)}
                        </div>
                        {interpolationsFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                {interpolationsYes ? (
                                    <GeneralListFacet  add={sendCandidate} search={searchData} refresh={refresh} field="interpolations.interpolation" label="Interpolations"/>
                                ) : (
                                    <InterpolationsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                )}
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setDiagramsFacet(!diagramsFacet)
                        }}>
                            {diagramsFacet ? (<span className="hcFacetGroup">&#9660; diagrams</span>) : (
                                <span className="hcFacetGroup">&#9658; diagrams</span>)}
                        </div>
                        {diagramsFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                {diagramsYes ? (
                                    <GeneralListFacet  add={sendCandidate} search={searchData} refresh={refresh} field="diagrams.diagram_type" label="Diagrams"/>
                                ) : (
                                    <DiagramsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                )}
                            </div>) : (<div/>)}

                        {/*<div className="hcFacetSubDivision" onClick={() => {
                            setEasterTableFacet(!easterTableFacet)
                        }}>
                            {easterTableFacet ? (<span className="hcFacetGroup">&#9660; easter tables</span>) : (
                                <span className="hcFacetGroup">&#9658; easter tables</span>)}
                        </div>
                        {easterTableFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <EasterTableFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}*/}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setRelationsFacet(!relationsFacet)
                        }}>
                            {relationsFacet ? (<span className="hcFacetGroup">&#9660; relations to other mss</span>) : (
                                <span className="hcFacetGroup">&#9658; relations to other mss</span>)}
                        </div>
                        {relationsFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <RelationsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setAnnotationFacet(!annotationFacet)
                        }}>
                            {annotationFacet ? (<span className="hcFacetGroup">&#9660; annotations</span>) : (
                                <span className="hcFacetGroup">&#9658; annotations</span>)}
                        </div>
                        {annotationFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                {annotationsYes ? (
                                    <GeneralListFacet  add={sendCandidate} search={searchData} refresh={refresh} field="annotations.amount" label="Annotations"/>
                                ) : (
                                    <AnnotationsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                )}
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setDigitizedfacet(!digitizedFacet)
                        }}>
                            {digitizedFacet ? (<span className="hcFacetGroup">&#9660; digitized</span>) : (
                                <span className="hcFacetGroup">&#9658; digitized</span>)}
                        </div>
                        {digitizedFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <DigitizedFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="hcFacetSubDivision" onClick={() => {
                            setLargerfacet(!largerFacet);
                        }}>
                            {largerFacet ? (
                                <span className="hcFacetGroup">&#9660; part larger collection</span>) : (
                                <span className="hcFacetGroup">&#9658; part larger collection</span>)}
                        </div>
                        {largerFacet ? (
                            <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                <LargerCollectionFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                            </div>) : (<div/>)}

                        <div className="fbMessage">
                            We will be glad to receive <div className="hcClickable" onClick={() => {
                            window.location.href = PROJECT_SITE + "?page_id=278";
                        }}>feedback</div> on the database from you.
                        </div>
                    </div>


                    <div className="hcLayoutResults">
                        <div className="hcMarginBottom2">
                            <div className="hcIKselectedFacet">
                                <div><em>Selected facets:</em></div>
                                <div className="hcIKselectedFacetBuffer">
                                    {searchData.searchvalues === "none" ? (<div></div>) : (<div>
                                        {facets.map((item: ISearchValues) => {
                                            return (
                                                <div className="hcIKselectedFacetItem">
                                                    <div className="hcIKselectedFacetName">{item.name}</div>
                                                    {item.values.map((facValue: string, i: number) => {
                                                        return (
                                                            <div className="hcIKselectedFacetVal">
                                                                {facValue}
                                                                <span className="hcIcon"
                                                                      onClick={() => removeFacet(item.name, facValue)}>
                                                                    <img
                                                                        src="https://d33wubrfki0l68.cloudfront.net/e93e5de154a54933b8993d839dc3fa85de13f6aa/67726/images/icons/icon-delete.svg"
                                                                        alt=""/>
                                                    </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>)}

                                </div>
                            </div>
                            <div className="hcResultsHeader hcMarginBottom2">
                                <div className="manFoundHeader">Manuscripts found: <strong>{result.amount}</strong>
                                </div>
                                <div className="hcAlignHorizontal">
                                    {isList && (<div className="manuscriptSelector">
                                        <select value={searchData.page_length}
                                                onChange={(e) => setPageLength(e.target.value)}>
                                            <option value={50}>50 per page</option>
                                            <option value={100}>100 per page</option>
                                            <option value={500}>All manuscripts</option>
                                        </select>
                                    </div>)}
                                    {isList ? (
                                        <button onClick={() => {
                                            searchBuffer.is_list = false;
                                            searchBuffer.page_length = 500;
                                            window.location.href = "#search/?q=" + Base64.toBase64(JSON.stringify(searchBuffer));
                                            setIsList(false);
                                            setRefresh(!refresh);
                                        }}>Results on map</button>
                                    ) : (
                                        <button onClick={() => {
                                            searchBuffer.is_list = true;
                                            searchBuffer.page_length = searchData.page_length;
                                            window.location.href = "#search/?q=" + Base64.toBase64(JSON.stringify(searchBuffer));
                                            setIsList(true);
                                            setRefresh(!refresh);
                                        }}>Results in list</button>
                                    )}
                                    <button onClick={resetFacets}>Reset facets</button>
                                    <button onClick={() => {
                                        setDownloadActive(true);
                                    }}>Download results
                                    </button>
                                </div>
                            </div>
                            {downloadActive && (<div className="downloadFormats"><strong>Choose format: </strong>
                                <div className="downloadFormat" onClick={() => {
                                    setDownloadActive(false);
                                    openWindow(SERVICE_SERVER + "download/csv/?q=" + Base64.toBase64(JSON.stringify(searchData)))
                                }}>CSV
                                </div> | <div className="downloadFormat" onClick={() => {
                                    setDownloadActive(false);
                                    openWindow(SERVICE_SERVER + "download/excel/?q=" + Base64.toBase64(JSON.stringify(searchData)))
                                }}>Excel
                                </div> | <div className="downloadFormat" onClick={() => {
                                    setDownloadActive(false);
                                    openWindow(SERVICE_SERVER + "download/xml/?q=" + Base64.toBase64(JSON.stringify(searchData)))
                                }}>XML
                                </div>
                            </div>)}


                            {loading ? (<div>Loading...</div>) : (
                                <div>
                                    {isList ? (
                                        <ul className="hcList2 hcList2NoIcon hcMarginBottom2">
                                            <ManuscriptList result={result}/>
                                        </ul>
                                    ) : (
                                        <IsiMap result={result}/>
                                    )}


                                    <div className="hcAlignLeftRight">
                                        <div>
                                            <div className="hcPagination">
                                                {searchData.page > 1 ? (<div className="hcClickable" onClick={() => {
                                                    prevPage()
                                                }}>&#8592; Previous</div>) : (<div/>)}
                                                {searchData.page < result.pages ? (
                                                    <div className="hcClickable" onClick={() => {
                                                        nextPage()
                                                    }}>Next &#8594;</div>) : (<div/>)}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}