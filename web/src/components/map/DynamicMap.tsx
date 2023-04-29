import "leaflet/dist/leaflet.css";
import * as leaflet from "leaflet";
import * as reactLeaflet from "react-leaflet";
import { mapBounds, mapCenter, mapMaxZoom, mapMinZoon } from "~/client/map";

type DynamicMapProps = {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  children: (reactLeaflet: typeof import("react-leaflet"), leaflet: typeof import("leaflet")) => JSX.Element;
}

const DynamicMap = (props: DynamicMapProps) => {
  const { children } = props;

  return (
    <reactLeaflet.MapContainer
      crs={leaflet.CRS.Simple} preferCanvas={true}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
      center={mapCenter as any} maxBounds={mapBounds as any}
      minZoom={mapMinZoon} maxZoom={mapMaxZoom} zoomDelta={0.5} zoomSnap={0.5} zoom={mapMinZoon}
      className="w-full h-full"
    >
      {children(reactLeaflet, leaflet)}
    </reactLeaflet.MapContainer>
  );
};

export default DynamicMap;
