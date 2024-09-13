import { Outlet, useLocation } from "react-router-dom";
import MobileView from "../MobileView";

import "./style.scss";
import { useEffect, useRef, useState } from "react";
import api from "@/api";
import useDebounce from "@/hooks/useDebounce";

export default function DesktopLayout() {
  // 배경 이미지 순환 대비
  const [backgroundImageList, setBackgroundImageList] = useState<string[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollTo(0, 0);
  }, [ref, pathname]);

  useEffect(() => {
    getBackgroundImage();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBackgroundImage(changeImage), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [backgroundImage]);

  const changeImage = (): string => {
    const randomImage = backgroundImageList[Math.floor(Math.random() * (backgroundImageList.length - 1))] ?? 0;
    if (backgroundImage === randomImage) {
      return changeImage();
    }

    return randomImage;
  };

  const getBackgroundImage = useDebounce(async () => {
    try {
      const res = await api.main.getBackgroundImage();

      setBackgroundImageList(res);
      setBackgroundImage(res[0]);
    } catch (error) {
      throw error;
    }
  }, 300);

  return (
    <>
      <div
        className="main-container"
        ref={ref}
        style={{
          backgroundImage: `url(${backgroundImage}) `,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "background-image 1000ms ease",
        }}
      >
        <div className="blur-filter" />
        <MobileView>
          <Outlet />
        </MobileView>
      </div>
    </>
  );
}
