import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { LatLngTuple} from "leaflet";
import {IResultManuscript, IResultManuscriptList} from "../misc/interfaces";

function IsiMap(props: {result: IResultManuscriptList}) {

    return (
      <div className="resultMap">
          <MapContainer center={[47.816387, 6.381389]} zoom={4}>
              <TileLayer
                  url="https://d.tile.openstreetmap.de/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              /><MarkerClusterGroup>
              {props.result.manuscripts.map((item: IResultManuscript) => {
                  if  (item.absolute_places[0].latitude !== 0 && !isNaN(item.absolute_places[0].latitude)) {
                  let position: LatLngTuple  = [item.absolute_places[0].latitude , item.absolute_places[0].longitude];
                      return  (<Marker position={position}>
                          <Popup><span>{item.absolute_places[0].place_absolute}<br/></span><span className="hcClickable" onClick={() => {
                              window.location.href = "#detail/" + item.id;
                          }}>
                            Go to manuscript
                      </span></Popup>
                      </Marker>)}})}
          </MarkerClusterGroup>
          </MapContainer>
      </div>
    );
}

export default IsiMap;

