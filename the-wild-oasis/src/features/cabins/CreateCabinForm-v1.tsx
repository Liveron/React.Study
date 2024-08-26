import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
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

type Props = {
  cabinToEdit: CabinModel;
};

function CreateCabinForm({ cabinToEdit }: Props) {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormModel>();

  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: FieldValues) {
    mutate({ ...data, image: data.image[0] } as CabinModel);
  }

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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          {...register("image", { required: "This field is required " })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
