import React from "react";
import {useState} from "react";
import NumericInput from "react-numeric-input";

function BookFacetItem(props: {book: number, bookLatin: string, chapters: number}) {
    const [selected, setSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(true);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(props.chapters);

    function handleChange() {
        setSelected(!selected);
    }

    function handleRange() {
        setRangeSelected(false);
    }

    function saveFacet() {
        setRangeSelected(true);
    }

    return (
        <div>
            <form>
                <input className="formLine" name="book" type="checkbox" checked={selected} onChange={() => handleChange()}/>
                <div className="formLine"> <strong>{props.bookLatin}</strong></div>
                {selected ?
                    (<div className="chapterRange"><NumericInput className="numSelector" min={1} max={props.chapters} value={1} size={3} onChange={() => {handleRange()}}/> - <NumericInput className="numSelector" min={1} max={props.chapters} value={props.chapters}  size={3} onChange={() => {handleRange()}}/>
                        {!rangeSelected ?  (<button className="rangeSelectorBtn" onClick={() => saveFacet()}>OK</button>) : (<div/>)}
                    </div>) : (

                        <div/>
                    )}
            </form>
        </div>
    );
}

export default BookFacetItem;