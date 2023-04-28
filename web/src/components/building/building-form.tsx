import { api } from "~/server/api";
import { useMemo } from "react";
import { type Building, buildingSchema, buildingTypes } from "~/models/building";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select } from "~/components/ui/select";
import { toCapitalizedSpaceCase } from "~/utils/string-utils";
import { Input } from "~/components/ui/input";
import toast from "react-hot-toast";

const defaultBuilding = {
  id: "",
  type: buildingTypes[0]
} as Building;

const buildingTypeOptions = buildingTypes.map((type) => ({
  id: type,
  name: toCapitalizedSpaceCase(type)
}));

export const BuildingForm = () => {
  const ctx = api.useContext();

  const {
    control,
    reset,
    handleSubmit
  } = useForm<Building>({
    resolver: zodResolver(buildingSchema),
    defaultValues: defaultBuilding
  });

  const { mutateAsync: create, isLoading: isCreating } = api.buildings.create.useMutation({
    onSuccess: (data) => {
      reset();
      void Promise.all([
        ctx.buildings.getAll.invalidate(),
        ctx.buildings.getById.invalidate({ id: data.id })
      ]);
    },
    onError: (e) => {
      console.error(e);
    }
  });

  const isLoading = useMemo(() => isCreating, [isCreating]);

  const onSubmit = handleSubmit((data) => {
    if (isLoading) return;

    void toast.promise(create(data), {
      loading: "Creating building...",
      success: "Building created!",
      error: "Failed to create building"
    });
  });

  return (
    <section>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={onSubmit}>
        <Input control={control} name="id" label="Id" />
        <Select options={buildingTypeOptions} control={control} name="type" label="Type" />
        <Button type="submit" isLoading={isLoading}>Add</Button>
      </form>
    </section>
  );
};
