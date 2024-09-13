import { DeleteFeedPayloadType, GetFeedListResType, FeedType, GetFeedListPayloadType } from "@/types/feed";
import { instance } from "@/utils/axios-instance";

export async function getFeedList(payload?: GetFeedListPayloadType) {
  const res: GetFeedListResType = await instance.get("/feed", {
    params: payload,
  });

  return res;
}

export async function postFeed(payload: any) {
  const res: FeedType = await instance.post("/feed", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}

export async function updateFeed(payload: any) {
  const res: FeedType = await instance.put("/feed", payload);

  return res;
}

export async function deleteFeed(payload: DeleteFeedPayloadType) {
  const res: string = await instance.delete("/feed", {
    data: payload,
  });

  return res;
}

export async function getFeedDetail(payload: number) {
  const res: FeedType = await instance.get(`/feed/detail/${payload}`);

  return res;
}

export async function setFeedLike(payload: number) {
  const res: number = await instance.post(`/feed/like/${payload}`);

  return res;
}
