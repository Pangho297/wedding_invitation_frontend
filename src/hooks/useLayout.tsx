import { useMediaQuery } from "react-responsive";

/** 디스플레이 크기에 따라 boolean 값을 내보내는 hooks
 * 
 * isDesktop: 해상도가 1200px 이상일 경우 true
 * 
 * isTablet: 해상도가 768px 이상 1199px 이하일 경우 true
 * 
 * isMobile: 해상도가 767px 이하인 경우 true
 */
export default function useLayout() {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return {
    isDesktop,
    isTablet,
    isMobile,
  };
}
