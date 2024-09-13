import { GuestType } from "@/types/check";
import { instance } from "@/utils/axios-instance";

export async function getGuestList() {
  const res: GuestType[] = await instance.get("/check");

  return res;
}

export async function AddGuest(payload: GuestType) {
  const res: { message: string } = await instance.post("/check", payload);

  return res;
}
