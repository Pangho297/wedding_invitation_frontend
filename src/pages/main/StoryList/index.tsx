import { Link } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import { GetStoryListResType } from "@/types/story";

export default function StoryList() {
  const [storyList, setStoryList] = useState<GetStoryListResType[]>([]);

  useEffect(() => {
    getStoryList();
  }, []);

  const getStoryList = useDebounce(async () => {
    try {
      const res = await api.story.getStoryList();

      setStoryList(res);
    } catch (error) {
      throw error;
    }
  }, 300);
  return (
    <>
      {storyList.length > 0 && (
        <article className="story-list-container">
          <ul className="list-wrapper">
            {storyList.map((item, index) => (
              <Link className="story-link" to={`/story/${item.idx}`} key={index}>
                <li className="list-item">
                  <img className="list-thumbnail" src={item.image_url} alt="story-thumbnail" />
                </li>
                <p className="thumbnail-title">{item.idx}</p>
              </Link>
            ))}
          </ul>
        </article>
      )}
    </>
  );
}
