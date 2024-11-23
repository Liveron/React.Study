import { CabinModel } from "../model/CabinModel";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(): Promise<CabinModel[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as CabinModel[];
}

export async function createEditCabin(cabin: CabinModel, id: number) {
  console.log(cabin, id);

  const { image } = cabin;
  const hasImagePath =
    typeof image === "string" && String(image).startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const query = supabase.from("cabins");

  if (!id) {
    query.insert([{ ...cabin, image: imagePath }]);
  }

  if (id) {
    query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabin.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
}
