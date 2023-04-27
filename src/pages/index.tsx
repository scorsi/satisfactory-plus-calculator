import { type NextPage } from "next";
import { BuildingList } from "~/components/building/building-list";
import { BuildingForm } from "~/components/building/building-form";
import { generateServerSideHelper } from "~/server/helpers/generateServerSideHelper";
import { api } from "~/server/api";

const Home: NextPage = () => {
  const { data: buildings } = api.buildings.getAll.useQuery();

  return (
    <>
      <main className="">
        <h1 className="">Hello World</h1>
        <BuildingList buildings={buildings ?? []} />
        <BuildingForm />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const helpers = generateServerSideHelper();

  await helpers.buildings.getAll.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate()
    }
  };
}

export default Home;
