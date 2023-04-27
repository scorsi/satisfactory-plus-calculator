import { toCapitalizedSpaceCase } from "~/utils/string-utils";
import { Building } from "~/models/building";

type BuildingListProps = {
  buildings: Building[];
}

export const BuildingList = ({ buildings }: BuildingListProps) => {
  return (
    <section>
      <ul>
        {buildings?.map((building) => (
          <li key={building.id}>{`${toCapitalizedSpaceCase(building.id)} : ${building.id}<${building.type}>`}</li>
        ))}
      </ul>
    </section>
  );
};
