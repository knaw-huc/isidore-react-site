import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {LatLngTuple} from "leaflet";
import {IResultManuscript, IResultManuscriptList} from "../misc/interfaces";
import {useState, useEffect} from "react";

function IsiMap(props: { result: IResultManuscriptList }) {
    const [isModernPlace, setModernPlace] = useState(false);

    let org, lib = '';
    if (isModernPlace) {
        lib = "activeSwitchBtn";
        org = "switchBtn";
    } else {
        lib = "switchBtn";
        org = "activeSwitchBtn";
    }
    return (
        <div className="resultMap">
            <MapContainer center={[47.816387, 6.381389]} zoom={4}>
                <TileLayer
                    url="https://d.tile.openstreetmap.de/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {isModernPlace ? (
                    <MarkerClusterGroup>
                        {props.result.manuscripts.map((item: IResultManuscript) => {
                            if (item.library[0].latitude != 0 && !isNaN(item.library[0].latitude)) {
                                let position: LatLngTuple = [item.library[0].latitude, item.library[0].longitude];
                                return (<Marker position={position}>
                                    <Popup><span>{item.library[0].place_name}<br/></span><span className="hcClickable"
                                                                                               onClick={() => {
                                                                                                   window.location.href = "#detail/" + item.id;
                                                                                               }}>
                            {item.shelfmark}
                      </span></Popup>
                                </Marker>)
                            }
                        })}
                    </MarkerClusterGroup>
                ) : (
                    <MarkerClusterGroup>
                        {props.result.manuscripts.map((item: IResultManuscript) => {
                            if (item.absolute_places[0].latitude != 0 && !isNaN(item.absolute_places[0].latitude)) {
                                let position: LatLngTuple = [item.absolute_places[0].latitude, item.absolute_places[0].longitude];
                                return (<Marker position={position}>
                                    <Popup><span>{item.absolute_places[0].place_absolute}<br/></span><span
                                        className="hcClickable" onClick={() => {
                                        window.location.href = "#detail/" + item.id;
                                    }}>
                            {item.shelfmark}
                      </span></Popup>
                                </Marker>)
                            }
                        })}
                    </MarkerClusterGroup>
                )}


            </MapContainer>
            <div className="mapSwitch">
                <div className={org} onClick={() => {
                    setModernPlace(false)
                }}>Place of origin
                </div>
                <div className={lib} onClick={() => {
                    setModernPlace(true)
                }}>Current location
                </div>
            </div>
        </div>
    );
}

export default IsiMap;

