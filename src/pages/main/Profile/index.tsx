import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Link } from "react-router-dom";
import StoryRing from "@/assets/icons/story_ring.svg";

import "./style.scss";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";

dayjs.extend(duration);

type DateType = {
  day: number;
  hour: string;
  minute: string;
  second: string;
};

export default function Profile() {
  const [image, setImage] = useState<string>("");
  const [counter, setCounter] = useState<DateType>({
    day: 0,
    hour: "00",
    minute: "00",
    second: "00",
  });

  useEffect(() => {
    getIntro();
  }, []);

  useEffect(() => {
    /** 시간 계산기
     *
     * 페이저 접속 시점부터 10월 28일 17시까지 남은 시간을 계산
     */
    const calculator = () => {
      // 10월 28일 17시까지 몇초 남았는지 계산
      const diff = dayjs("2023-10-28T18:00:00").diff(dayjs(), "second");
      // 계산된 초를 기준으로 남은 시간을 연, 월, 일, 시, 분, 초로 나눔
      const duration = dayjs.duration(diff, "second");

      const times: DateType = {
        // 월 단위가 없기 때문에 남은 시간을 일 기준으로 표시 및 소수점 제거
        day: Math.floor(duration.asDays()),
        hour: duration.format("HH"),
        minute: duration.format("mm"),
        second: duration.format("ss"),
      };

      // 계산된 시간을 상태에 할당
      setCounter(times);
    };

    // 1초에 한번씩 계산 함수 호출
    const timer = setTimeout(calculator, 1000);

    // 언마운트시 타이머 제거
    return () => {
      clearTimeout(timer);
    };

    // 상태가 변할때마다 리렌더링
  }, [counter]);

  const getIntro = useDebounce(async () => {
    try {
      const res: string[] = await api.main.getIntroImage();

      setImage(res[6]);
    } catch (error) {
      throw error;
    }
  }, 300);

  return (
    <article className="profile-container">
      <div className="profile-top">
        <Link className="story-link" to="/story/WEDDING">
          <StoryRing />
          <img className="profile-photo" src={image} alt="" />
        </Link>
        <div className="calender-container">
          <div className="d-day-container">
            <div className="d-day-title">WEDDING DAY</div>
            <div className="d-day-times">
              <div className="d-day-wrapper">
                <p className="time">2023</p>
                <p className="time-type">Year</p>
              </div>
              <div className="d-day-wrapper">
                <p className="time">10</p>
                <p className="time-type">Oct</p>
              </div>
              <div className="d-day-wrapper">
                <p className="time">28</p>
                <p className="time-type">Sat</p>
              </div>
              <div className="d-day-wrapper">
                <p className="time">06</p>
                <p className="time-type">PM</p>
              </div>
            </div>
          </div>
          <div className="d-day-container">
            {/* <div className="d-day-title">D-DAY</div> */}
            <div className="timer">
              <div className="timer-wrapper">
                <p className="time">{counter?.day < 10 ? `0${counter?.day}` : counter?.day}</p>
                <p className="time-type days">D-Day</p>
              </div>
              <div className="timer-wrapper">
                <p className="time">{counter?.hour}</p>
                <p className="time-type">Hour</p>
              </div>
              <div className="timer-wrapper">
                <p className="time">{counter?.minute}</p>
                <p className="time-type">Minute</p>
              </div>
              <div className="timer-wrapper">
                <p className="time">{counter?.second}</p>
                <p className="time-type">Second</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        <h4 className="profile-title">👰🏻‍♀️ ❤️ 🤵🏻</h4>
        <p className="profile-content">
          행복한 결혼식에 소중한 분들을 초대합니다. <br />
          2023. 10. 21 오후 6시  웨딩홀
        </p>
        <a className="map-link" href="https://naver.me/GROz39Ps" target="_blank">
          🚗 오시는 길
        </a>
      </div>
    </article>
  );
}
