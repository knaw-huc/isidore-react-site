import React from "react";
import BookFacetItem from "../elements/bookFacetItem";

function bookFacet() {

    return (
        <div className="hcFacet">
            <div className="hcFacetItems">
                <BookFacetItem book = {1}  bookLatin = "I" chapters= {44} />
                <BookFacetItem book = {2}  bookLatin = "II" chapters= {31} />
                <BookFacetItem book = {3}  bookLatin = "III" chapters= {71} />
                <BookFacetItem book = {4}  bookLatin = "IV" chapters= {13} />
                <BookFacetItem book = {5}  bookLatin = "V" chapters= {39} />
                <BookFacetItem book = {6}  bookLatin = "VI" chapters= {19} />
                <BookFacetItem book = {7}  bookLatin = "VII" chapters= {14} />
                <BookFacetItem book = {8}  bookLatin = "VIII" chapters= {11} />
                <BookFacetItem book = {9}  bookLatin = "IX" chapters= {7} />
                <BookFacetItem book = {10}  bookLatin = "X" chapters= {282} />
                <BookFacetItem book = {11}  bookLatin = "XI" chapters= {4} />
                <BookFacetItem book = {12}  bookLatin = "XII" chapters= {8} />
                <BookFacetItem book = {13}  bookLatin = "XIIII" chapters= {22} />
                <BookFacetItem book = {14}  bookLatin = "XIV" chapters= {9} />
                <BookFacetItem book = {15}  bookLatin = "XV" chapters= {16} />
                <BookFacetItem book = {16}  bookLatin = "XVI" chapters= {27} />
                <BookFacetItem book = {17}  bookLatin = "XVII" chapters= {11} />
                <BookFacetItem book = {18}  bookLatin = "XVIII" chapters= {69} />
                <BookFacetItem book = {19}  bookLatin = "XIX" chapters= {34} />
                <BookFacetItem book = {20}  bookLatin = "XX" chapters= {16} />
            </div>
        </div>
    );

}

export default bookFacet;