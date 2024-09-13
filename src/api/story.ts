import { StoryIdxType, GetStoryListResType, StoryType } from "@/types/story";
import { instance } from "@/utils/axios-instance";

export async function getStoryList() {
  const res: GetStoryListResType[] = await instance.get("/story");

  return res;
}

export async function getStoryDetail(payload: StoryIdxType) {
  const res: StoryType = await instance.get(`/story/${payload}`);

  return res;
}

export async function updateStoryLike(payload: StoryIdxType) {
  const res: number = await instance.put(`/story/like/${payload}`);

  return res;
}
