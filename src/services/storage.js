import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export async function uploadImage(file) {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;
  const imageRef = ref(storage, `giveaways/${fileName}`);

  await uploadBytes(imageRef, file);

  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
}