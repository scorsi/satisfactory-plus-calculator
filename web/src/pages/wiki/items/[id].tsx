import { generateServerSideHelper } from "~/server/helpers/generateServerSideHelper";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { api } from "~/server/api";

type ItemViewProps = {
  id: string;
}

const ItemView: NextPage<ItemViewProps> = (props: ItemViewProps) => {
  const { id } = props;

  const { data: item } = api.items.getById.useQuery({ id: props.id });

  if (!item) return <div>404</div>;

  return (
    <>
      <Head>
        <title>SF+ Calculator :: Item :: {item.name}</title>
      </Head>
      <h1>{item.name}</h1>
      <p>Main categorie: {item.categories["0"]}</p>

      <p>Produced In</p>
      <ul>
        {item.produced_in.map((recipe_id) => (
          <li key={recipe_id}>Recipe: {recipe_id}</li>
        ))}
      </ul>

      <p>Consumed In</p>
      <ul>
        {item.consumed_in.map((recipe_id) => (
          <li key={recipe_id}>Recipe: {recipe_id}</li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const helpers = generateServerSideHelper();

  const id = context?.params?.id;

  if (typeof id !== "string") throw new Error("Invalid ID");

  await helpers.items.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id
    }
  };
};

export default ItemView;
