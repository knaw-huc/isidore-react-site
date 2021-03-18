import React from "react";
import BookFacetItem from "../elements/bookFacetItem";
import {ISendCandidate} from "../misc/interfaces";
import {useState} from "react";

function BookFacet(props: {add: ISendCandidate}) {
    const [help, setHelp] = useState(false);

    return (
        <div className="hcFacet">
            <div className="hcFacetItems">
                { !help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                    src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                    alt=""/></span>}
                {help ? (<div className="hcFacetHelp"  onClick={() => setHelp(false)}>
                    <p><strong>Books </strong></p>
                    <p>This facet allows the users to select manuscripts based on whether they currently contain material from a specific section of the <i>Etymologiae</i>. Users can select complete books by clicking on OK, but also individual book chapters and chapter ranges by adjusting the slider. A separate exclude full tab included in this facet allows one to remove all manuscripts designed as encyclopaedic copies of the <i>Etymologiae</i> (i.e., query only over manuscripts transmitting the text of the <i>Etymologiae</i> selectively).</p>
                </div>) : (<div/>)}
                <BookFacetItem add={props.add} book = {1}  bookLatin = "I" chapters= {44} />
                <BookFacetItem add={props.add} book = {2}  bookLatin = "II" chapters= {31} />
                <BookFacetItem add={props.add} book = {3}  bookLatin = "III" chapters= {71} />
                <BookFacetItem add={props.add} book = {4}  bookLatin = "IV" chapters= {13} />
                <BookFacetItem add={props.add} book = {5}  bookLatin = "V" chapters= {39} />
                <BookFacetItem add={props.add} book = {6}  bookLatin = "VI" chapters= {19} />
                <BookFacetItem add={props.add} book = {7}  bookLatin = "VII" chapters= {14} />
                <BookFacetItem add={props.add} book = {8}  bookLatin = "VIII" chapters= {11} />
                <BookFacetItem add={props.add} book = {9}  bookLatin = "IX" chapters= {7} />
                <BookFacetItem add={props.add} book = {10}  bookLatin = "X" chapters= {282} />
                <BookFacetItem add={props.add} book = {11}  bookLatin = "XI" chapters= {4} />
                <BookFacetItem add={props.add} book = {12}  bookLatin = "XII" chapters= {8} />
                <BookFacetItem add={props.add} book = {13}  bookLatin = "XIII" chapters= {22} />
                <BookFacetItem add={props.add} book = {14}  bookLatin = "XIV" chapters= {9} />
                <BookFacetItem add={props.add} book = {15}  bookLatin = "XV" chapters= {16} />
                <BookFacetItem add={props.add} book = {16}  bookLatin = "XVI" chapters= {27} />
                <BookFacetItem add={props.add} book = {17}  bookLatin = "XVII" chapters= {11} />
                <BookFacetItem add={props.add} book = {18}  bookLatin = "XVIII" chapters= {69} />
                <BookFacetItem add={props.add} book = {19}  bookLatin = "XIX" chapters= {34} />
                <BookFacetItem add={props.add} book = {20}  bookLatin = "XX" chapters= {16} />
                <div className="hcClickable" onClick={() => props.add({facet: "Books", field: "books_latin", candidate: "Unknown"})}>
                    <div className="checkBoxItem"> <strong>Unknown</strong></div>
                </div>
            </div>
        </div>
    );

}

export default BookFacet;