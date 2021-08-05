import React from "react";
import {useState} from "react";
import Slider, {SliderTooltip} from "rc-slider";
import {ISendCandidate} from "../misc/interfaces";

function BookFacetItem(props: { add: ISendCandidate, book: number, bookLatin: string, chapters: number }) {
    const [values, setValues] = useState([1, props.chapters]);
    const [selected, setSelected] = useState(false);

    const {createSliderWithTooltip} = Slider;
    const Range = createSliderWithTooltip(Slider.Range);
    const {Handle} = Slider;

    const handle = (props: any) => {
        const {value, dragging, index, ...restProps} = props;
        return (
            <SliderTooltip
                prefixCls="rc-slider-tooltip"
                overlay={`${value}`}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </SliderTooltip>
        );
    };

    const handleChange = (values: any) => {
        setValues(values);
    }

    function saveFacet() {
        props.add({
            facet: "Books",
            field: "BOOK",
            candidate: props.bookLatin + ":" + values[0] as string + "-" + values[1] as string
        });
    }

    return (
        <div>
            <form>
                <div className="hcClickable" onClick={() => {setSelected(!selected)}}><strong>book {props.bookLatin}</strong>
                </div>
                {selected && (
                    <div className="hcBookSelector">
                    <div className="rangeLabelFrom">From:</div> {values[0]} <div className="rangeLabelTo">to:</div>{values[1]}
                    <div>
                    <div className="hcFacetItems">
                    <div>
                    <div className="sliderBox">
                    <Range min={1} max={props.chapters} step={1} defaultValue={values} onAfterChange={handleChange}/>
                    </div>
                    </div>
                    </div>
                    </div>
                    <button className="ftSearchBtn" onClick={saveFacet}>Select</button>
                        <hr className="bookLine"/>
                    </div>
                )}

            </form>
        </div>
    );
}

export default BookFacetItem;