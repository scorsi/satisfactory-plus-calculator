import dynamic from "next/dynamic";
import { mapBounds, mapMaxZoom, mapMinZoon, mapUrl } from "~/client/map";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false
});

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

type MapProps = {
  width?: number;
  height?: number;
}

export const Map = (props: MapProps) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap>
        {({ TileLayer }) => (
          <>
            <TileLayer
              url={mapUrl}
              minZoom={mapMinZoon} maxZoom={mapMaxZoom}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
              bounds={mapBounds as any}
            />
          </>
        )}
      </DynamicMap>
    </div>
  );
};
