import React from "react";
import {useState} from "react";
import NumericInput from "react-numeric-input";
import {ISendCandidate} from "../misc/interfaces";

function BookFacetItem(props: { add: ISendCandidate, book: number, bookLatin: string, chapters: number }) {
    const [selected, setSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(false);
    let from = 1;
    let to = props.chapters;

    function handleChange() {
        setSelected(!selected);
    }

    function handleRange() {
        setRangeSelected(false);
    }

    function handleFrom(value: number | null, stringValue: string, input: HTMLInputElement) {
        if (!isNaN(Number(stringValue))) {
            from = Number(stringValue);
            setRangeSelected(false);
        } else {
            setRangeSelected(true);
        }
    }

    function handleTo(value: number | null, stringValue: string, input: HTMLInputElement) {
        if (!isNaN(Number(stringValue))) {
            to = Number(stringValue);
            setRangeSelected(false);
        } else {
            setRangeSelected(true);
        }
    }

    function saveFacet() {
        props.add({
            facet: "Books",
            field: "BOOK",
            candidate: props.bookLatin + ":" + from as string + "-" + to as string
        });
        setRangeSelected(true);
    }

    return (
        <div>
            <form>
                <div className="hcClickable" onClick={() => handleChange()}><strong>book {props.bookLatin}</strong>
                </div>
                {selected ?
                    (<div className="chapterRange"><NumericInput className="numSelector" min={1} max={props.chapters}
                                                                 value={1} size={3}
                                                                 onChange={handleFrom}/> - <NumericInput
                        className="numSelector" min={1} max={props.chapters} value={props.chapters} size={3}
                        onChange={handleTo}/>
                        {!rangeSelected ? (
                            <button className="rangeSelectorBtn" onClick={() => saveFacet()}>OK</button>) : (<div/>)}
                    </div>) : (

                        <div/>
                    )}
            </form>
        </div>
    );
}

export default BookFacetItem;