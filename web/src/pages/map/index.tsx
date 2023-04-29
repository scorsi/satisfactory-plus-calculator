import { type NextPage } from "next";
import Head from "next/head";
import { Map } from "~/components/map/Map";

const MapView: NextPage = () => {
  return (
    <>
      <Head>
        <title>SF+ Calculator :: Map</title>
      </Head>
      <h1>Map</h1>
      <p>Under construction...</p>
      <Map />
    </>
  )
}

export default MapView;