import { useEffect, useRef } from "react";

/**
 * 디바운스를 이용하기위한 custom hooks
 *
 * 사용 예시
 *
 * @example
 * ```
 *  const handleChange = useDebounce((e: ChangeEvent ) => {console.log(e.target.value)})
 * ```
 *
 */
export default function useDebounce<A extends any[]>(callback: (...args: A) => void, delay: number) {
  // 호출 사이에 인자와 timeout 핸들 추적
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const cleanUp = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  // timeout이 초기화 되었는지 확인 후 안되었으면
  // timeout 초기화
  useEffect(() => cleanUp, []);

  return function debounceCallback(...args: A) {
    // 마지막에 들어온 인자 선언
    argsRef.current = args;

    // 디바운스 타이머 초기화
    cleanUp();

    // 재시작까지 기다리기
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, delay);
  };
}
