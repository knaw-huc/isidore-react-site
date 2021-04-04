import React from "react";
import {useState, useEffect} from "react";
import Slider, {SliderTooltip} from "rc-slider";
import {ISendCandidate} from "../misc/interfaces";


function DummySliderFacet(props: { add: ISendCandidate }) {
    const [values, setValues] = useState([600, 1100]);


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

    function setDateFacet() {
        props.add({
            facet: "Date numerical",
            field: "DATE_NUMERICAL",
            candidate: values[0].toString() + "-" + values[1].toString()
        });
    }


    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                Date numerical
            </div>
            <div>
                <div className="hcFacetItems">
                    <div>
                        <div className="sliderBox">
                            <Range min={600} max={1100} step={50} defaultValue={values} onAfterChange={handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <button className="ftSearchBtn" onClick={setDateFacet}>Select</button>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default DummySliderFacet;