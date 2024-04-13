import React, { useState } from 'react';
import { Map, Marker, GeoJson, ZoomControl     } from "pigeon-maps";

const Maps = () => {
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;
    return (
        <Map 
            height={'100%'} 
            defaultCenter={[36.8935037, 10.1908708]} 
            defaultZoom={14}
            onClick={({ event, latLng, pixel }) => {
                console.log('map was clicked');
                // console.log(event);
                console.log(latLng);
                // console.log(pixel);
            }}
        >
            <ZoomControl />
            <Marker 
                width={50}
                anchor={[36.8935037, 10.1908708]} 
                color={color} 
                onClick={() => setHue(hue + 50)} 
            />
        </Map>
    )
}

export default Maps