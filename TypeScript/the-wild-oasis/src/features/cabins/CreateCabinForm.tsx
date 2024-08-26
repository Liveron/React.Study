import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { CabinModel } from "../../model/CabinModel";
import FormRow from "../../ui/FormRow";

type FormModel = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
};

type MutationFnProps = {
  cabin: CabinModel;
  id: number;
};

type Props = {
  cabinToEdit: CabinModel;
};

function CreateCabinForm({ cabinToEdit }: Props) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormModel>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ cabin, id }: MutationFnProps) => createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ cabin, id }: MutationFnProps) => createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: FieldValues) {
    if (isEditSession) editCabin();

    createCabin({
      cabin: { ...data, image: data.image[0] } as CabinModel,
      id: editId,
    });
  }

  const isWorking = isCreating || isEditing;

  function onError(errors: FieldValues) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors.name?.message as string}
        labelFor="name"
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors.maxCapacity?.message as string}
        labelFor="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors.regularPrice?.message as string}
        labelFor="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors.discount?.message as string}
        labelFor="discount"
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message as string}
        labelFor="description"
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={errors.image?.message as string}
        labelFor="image"
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required ",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
