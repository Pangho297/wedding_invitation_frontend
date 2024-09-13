import { RefObject, useEffect, useRef, useState } from "react";

/** IntersectionObserver API Hooks
 *
 * 스크롤에 ref에 해당하는 요소가 표시되었는지에 대한 여부를 boolean값으로 내보내는 Hooks
 *
 * 화면에 표시되었을 경우에 따른 스타일 변경, 로딩처리를 위해 사용
 *
 * 사용 예시
 * ```jsx
 * const anyRef = useRef<HTMLElement | null>(null);
 * const isOnScreen = useOnScreen(anyRef);
 *
 * . . .
 *
 * return (
 *  <div className="example" ref={anyRef}>example</div>
 * );
 * ```
 *
 * @param ref React Ref객체
 * @returns `boolean`
 */
export function useOnScreen(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);

  useEffect(() => {
    // IntersectionObserver 인스턴스 생성 및 Hooks의 ref에 지정
    observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting), {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });
  }, []);

  useEffect(() => {
    if (observerRef.current === null) return;
    // 인자로 받아온 감시 대상을 지정
    observerRef.current.observe(ref.current!);

    return () => {
      // 컴포넌트가 unMount된 경우 감시 종료
      observerRef.current?.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
