"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";

export default function MapMarker() {
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={true}
      className="h-96 w-full rounded-lg bg-red-500"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (searchParams.get("lat") && searchParams.get("lng")) {
  //     setPosition([searchParams.get("lat"), searchParams.get("lng")]);
  //   } else {
  //     setPosition({ lat: 51.505, lng: -0.09 });
  //   }
  // }, [searchParams]);

  // const map = useMapEvents({
  //   click() {
  //     // map.locate();
  //     // console.log(map);
  //   },
  //   locationfound(e) {
  //     // setPosition(e.latlng);
  //     // setPosition(e.latlng);
  //     // console.log(e.latlng);
  //     map.flyTo(position, map.getZoom());
  //   },
  // });

  const map = useMapEvent("add", () => {
    console.log(searchParams.get("lat"));
    setPosition([searchParams.get("lat"), searchParams.get("lng")]);
    map.setView(position, map.getZoom(10));
    // map.flyToBounds
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
