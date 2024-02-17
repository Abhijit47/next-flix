"use client";

// START: Preserve spaces to avoid auto-sorting
// import "leaflet/dist/leaflet.css";

// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

// import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function MapPlaceholder() {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function Map({ data }) {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (searchParams.get("lat") && searchParams.get("lng")) {
      setMapPosition([searchParams.get("lat"), searchParams.get("lng")]);
    } else {
      setMapPosition([40, 0]);
    }
  }, [searchParams]);

  return (
    <div>
      {isClient && (
        <MapContainer
          preferCanvas={true}
          // center={data[0]?.location?.geo?.coordinates ?? mapPosition}
          center={mapPosition}
          zoom={5}
          scrollWheelZoom={true}
          className="h-96 w-full rounded-lg bg-red-500"
          placeholder={<MapPlaceholder />}
          whenReady={(e) => console.log("Ready to print")}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapMarker position={mapPosition} />
          {/* {data?.map(({ _id, location }) => (
            <Marker key={_id} position={location?.geo?.coordinates}>
              <Popup position={location?.geo?.coordinates}>
                <span className="block text-xs font-light">
                  {location?.address?.street1}
                </span>
                <span className="block text-xs font-light">
                  {location?.address?.city}
                </span>
                <span className="block text-xs font-light">
                  {location?.address?.zipcode}
                </span>
                <span className="block text-xs font-light">
                  <Image
                    src={`https://flagcdn.com/16x12/${location?.address?.state.toLowerCase()}.png`}
                    alt={location?.address?.city}
                    width={16}
                    height={12}
                    priority
                  />
                </span>
              </Popup>
            </Marker>
          ))} */}
        </MapContainer>
      )}
    </div>
  );
}

function MapMarker({ position }) {
  // const [position, setPosition] = useState(null);

  // useEffect(() => {
  //   if (searchParams.get("lat") && searchParams.get("lng")) {
  //     setMapPosition([searchParams.get("lat"), searchParams.get("lng")]);
  //   } else {
  //     setMapPosition([40, 0]);
  //   }
  // }, [searchParams]);

  const map = useMapEvents({
    click() {
      // map.locate();
      // console.log(map);
    },
    locationfound(e) {
      // setPosition(e.latlng);
      // setPosition(e.latlng);
      // console.log(e.latlng);
      map.flyTo(position, map.getZoom(5));
    },
  });

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: () => {
          console.log("marker clicked");
        },
      }}
    >
      <Popup
        eventHandlers={{
          click: () => {
            console.log("popup clicked");
          },
        }}
      >
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}
