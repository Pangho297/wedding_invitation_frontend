import { Link, To } from "react-router-dom";
import * as K from "react-kakao-maps-sdk";

import "./style.scss";
import ArrowBackOutline from "@/assets/icons/arrow_back.svg";
import Tmap from "@/assets/icons/t_map.jpeg";
import KakaoMap from "@/assets/icons/kakao_map.svg";
import KakaoNav from "@/assets/icons/kakao_nav.png";
import NaverMap from "@/assets/icons/naver_map.jpeg";
import PMarker from "@/assets/icons/p_marker.png";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import api from "@/api";
import copy from "copy-to-clipboard";
import { Toast } from "antd-mobile";

// TMAP 길찾기 링크 https://surl.tmobiapi.com/84613cbe
// 네이버 지도 길찾기 링크 https://naver.me/5jmz6uMM
// 카카오 지도 길찾기 링크 https://kko.to/lh71BfBXDV

export default function Map() {
  const [image, setImage] = useState<string>();
  const [markerInfo, setMarkerInfo] = useState<number[]>([]);
  const marker = [
    { lat: 37, lng: 126, type: "MAIN" },
    { lat: 37, lng: 126, type: "PARKING" },
    { lat: 37, lng: 126, type: "PARKING" },
  ];

  useEffect(() => {
    getImage();
  }, []);

  const getImage = useDebounce(async () => {
    try {
      const res = await api.main.getIntroImage();
      setImage(res[0]);
    } catch (error) {
      throw error;
    }
  }, 300);

  const handleCopyAddress = (address: string) => {
    copy(address);
    Toast.show({
      content: "복사되었습니다",
    });
  };

  return (
    <section className="map-container">
      <nav className="map-header">
        <Link to={-1 as To} className="map-header-left">
          <ArrowBackOutline />
        </Link>
        <h3 className="map-header-title">오시는 길</h3>
        <div className="map-header-right" />
      </nav>
      <article className="map-body">
        {image && <img className="map-image" src={image} alt="map_image" />}
        <div className="map-link-container">
          <div className="button-wrapper">
            <img src={Tmap} alt="t_map" />
            <a className="navigation-button t-map" target="_blank" href="https://surl.tmobiapi.com/84613cbe">
              TMAP 바로가기
            </a>
          </div>
          <div className="button-wrapper">
            <div>
              <KakaoMap />
            </div>
            <div className="public-wrapper kakao">
              <a className="navigation-button kakao" target="_blank" href="https://kko.to/JwUAoAtWQC">
                카카오 지도 바로가기
              </a>
            </div>
          </div>
          <div className="button-wrapper">
            <img src={NaverMap} alt="naver_map" />
            <div className="public-wrapper naver">
              <a className="navigation-button naver" target="_blank" href="https://naver.me/GROz39Ps">
                네이버 지도 바로가기
              </a>
            </div>
          </div>
        </div>
        <div className="address">
          <div>
            <h5>도로명 주소</h5>
            <div className="address-detail">
              <p>웨딩홀</p>
              <button onClick={() => handleCopyAddress("")}>📋복사</button>
            </div>
          </div>
          <div>
            <h5>지번주소</h5>
            <div className="address-detail">
              <p>웨딩홀</p>
              <button onClick={() => handleCopyAddress("")}>📋복사</button>
            </div>
          </div>
        </div>
        <h3 className="map-title">지도</h3>
        <div className="map-description">
          <img src={PMarker} alt="p_marker" />
          <p style={{ color: "grey" }}>마커를 클릭하시면 주차장 정보를 확인하실 수 있습니다. </p>
        </div>
        <K.Map className="kakao-map" center={{ lat: 37, lng: 126 }}>
          {marker.map((item, index) => (
            <K.MapMarker
              position={{ lat: item.lat, lng: item.lng }}
              clickable={true}
              onClick={() =>
                setMarkerInfo(prev => {
                  if (markerInfo.includes(index)) return prev.filter(item => item !== index);

                  if (item.type === "PARKING") {
                    return [...prev, index];
                  }

                  return prev;
                })
              }
              image={
                item.type === "PARKING"
                  ? {
                      src: PMarker,
                      size: {
                        width: 35,
                        height: 35,
                      },
                    }
                  : undefined
              }
            >
              {markerInfo.includes(index) && (
                <div
                  className="marker-info-container"
                  style={{ width: "max-content", height: "max-content", padding: "16px" }}
                >
                  {index === 1 && (
                    <div className="parking-marker golf-parking">
                      <h3>주차장</h3>
                      <div className="parking-app-container">
                        <a target="_blank" href="https://surl.tmobiapi.com/a43693bc">
                          <img src={Tmap} alt="t_map" />
                        </a>
                        <a target="_blank" href="https://kko.to/QWQGQVOgcC">
                          <img src={KakaoNav} alt="kakao_nav" />
                        </a>
                        <a target="_blank" href="https://naver.me/xTeSt6Te">
                          <img src={NaverMap} alt="naver_map" />
                        </a>
                      </div>
                      <div className="marker-address">
                        <button onClick={() => handleCopyAddress("")}>📋 도로명 주소 복사</button>
                        <button onClick={() => handleCopyAddress("")}>📋 지번 주소 복사</button>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="parking-marker">
                      <h3>주차장</h3>
                      <div className="parking-app-container">
                        <a target="_blank" href="https://surl.tmobiapi.com/0d257ac5">
                          <img src={Tmap} alt="t_map" />
                        </a>
                        <a target="_blank" href="https://kko.to/LXPDmrasPj">
                          <img src={KakaoNav} alt="t_map" />
                        </a>
                        <a target="_blank" href="https://naver.me/5Fldl6oZ">
                          <img src={NaverMap} alt="t_map" />
                        </a>
                      </div>
                      <div className="marker-address">
                        <button onClick={() => handleCopyAddress("")}>📋 도로명 주소 복사</button>
                        <button onClick={() => handleCopyAddress("")}>📋 지번 주소 복사</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </K.MapMarker>
          ))}
        </K.Map>
      </article>
    </section>
  );
}
