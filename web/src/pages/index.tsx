import { type NextPage } from "next";
import { generateServerSideHelper } from "~/server/helpers/generateServerSideHelper";

const Home: NextPage = () => {
  return (
    <>
      <main className="">
        <h1 className="">Hello World</h1>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const helpers = generateServerSideHelper();

  // await helpers.buildings.getAll.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate()
    }
  };
}

export default Home;
