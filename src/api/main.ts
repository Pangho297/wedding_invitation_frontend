import { instance } from "@/utils/axios-instance";

export async function getIntroImage() {
  const res: string[] = await instance.get("/intro/images");

  return res;
}

export async function getBackgroundImage() {
  const res: string[] = await instance.get("/intro/images/desktop-bg");

  return res;
}
