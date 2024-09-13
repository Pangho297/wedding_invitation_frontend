export type GetFeedListPayloadType = {
  page?: number;
  size?: number;
};

export type GetFeedListResType = {
  /** 피드 */
  feeds: FeedListType[];
  /** 페이지 */
  page: number;
  /** 페이지의 피드 개수 */
  size: number;
  /** 총 개수 */
  all_cnt: number;
};

export type FeedListType = {
  /** 피드 id */
  id: number;
  /** 이미지 url */
  image_url: string;
};

export type FeedType = {
  /** 피드 id */
  id: number;
  /** 이미지 url */
  image_url: string;
  /** 작성자 */
  author: string;
  /** 피드 내용 */
  body: string;
  /** 좋아요 개수 */
  like: number;
};

export type DeleteFeedPayloadType = {
  /** 피드 아이디 */
  id: number;
  /** 피드 작성자 비밀번호 */
  pw: string;
};
