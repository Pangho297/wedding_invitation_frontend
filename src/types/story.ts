export type GetStoryListResType = {
  /** 스토리 인덱스 */
  idx: string;
  /** 스토리 썸네일 이미지 url */
  image_url: string;
};

export type StoryIdxType = "2015-2016" | "2017-2018" | "2019-2020" | "2021-2023" | "WEDDING";

export type StoryType = {
  /** 스토리 제목 */
  title: string;
  /** 스토리 좋아요 수 */
  like: number;
  /** 스토리 데이터 */
  img: StoryDataType[];
  next_story: StoryIdxType;
  prev_story: StoryIdxType | "/";
};

export type StoryDataType = {
  /** 스토리 이미지 url */
  image_url: string;
  /** 스토리 배경색상값(Red) */
  r: number;
  /** 스토리 배경색상값(Green) */
  g: number;
  /** 스토리 배경색상값(Blue) */
  b: number;
};
