# Typescript

리액트 사용에 앞서 타입스크립트로 타입을 지정하는 방법부터 간단하게 알아보자

우선 데이터 타입들부터 알아보자

- `string`

문자열을 표현할 때 사용한다

- `number`

다른 언어에서 `int`, `float`과 같이 세분화된것이 아닌 숫자는 `number` 하나로 통일된다

- `boolean`

`true`, `false`값을 가지는 데이터 타입

위 세가지 타입을 원시 타입으로 자주 사용한다

- `Array`

`[1, 2, 3]`과 같은 배열의 타입을 지정할 때에는 `number[]`와 같이 지정한다  
또한, `Array<number>`와 같은 방식으로 지정할 수 있고 위와 동일하다

주의할 점은 `[number]`와는 전혀 다른 타입이다 이 내용은 후술하겠다

- `any`

어떠한 값도 될 수 있는 타입이다 위험하지만 때로는 유용하게 사용할 수 있는데  
너무 복잡한 타입을 지정해야할 때, 동일하게 작동되나 값은 다를 수 있을 경우 사용한다  
자주 사용하면 타입스크립트 사용의 의미가 퇴색되기때문에 최대한 사용하지 않는편이 좋다

## 변수

```ts
const someNumber: number = 0;
```

간단하게 변수에 타입을 지정하는 방법으로 이름 뒤에 `:`을 붙이고 타입을 지정하면 된다

```ts
const someNumber: string = 0;
```

이 경우 문자열 타입에 숫자를 할당했기 때문에 에러가 발생한다

타입스크립트의 버전이 올라가면서 타입추론 기능이 크게 발전하여  
현재에는 타입을 작성하는 일도 많이 없게되었다

```ts
const someNumber = 0;
```

이 경우 타입을 표기하지 않았음에도 `someNumber`가 `number` 타입이라는걸 추론해낸다

## 함수

```ts
function add(value: number) {
  return value + 1;
}

add("5"); // output: Argument of type 'string' is not assignable to parameter of type 'number'.
```

매개변수에 타입을 지정하는 방법이다 매개변수 이름 뒤에 변수와 같이 타입을 지정한다

```ts
function hello(): string {
  return "Hello World!";
}
```

반환 타입에 대한 표기도 할 수 있다 매개변수 목록 뒤에 표기한다

```ts
const names = ["pangho", "yongineer"];

names.forEach(e => {
  console.log(e.toUppercase());
  // Error! Property 'toUppercase' dose not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

타입스크립트는 문맥을 통해 타입을 추론할수 있다  
여기선 배열 메소드 [forEach](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)의 매개변수를 추론해 `e`가 `string` 타입이라는 추론했고  
`toUppercase`의 오탈자를 바로잡으려 시도한다

_`forEach`는 배열의 요소 하나 하나에 콜백함수를 실행한 배열의 결과를 반환한다_

## 유니언 타입

```ts
function printHello(id: number | string) {
  console.log(`Hello ${id}!`);
}

printHello(12); // OK
printHello("Pangho"); // OK
printHello({ id: 24 }); // Error Argument of type '{ id: number; }' is not assignable to parameter of type 'string | number'
```

유니언 타입은 서로 다른 두개의 타입을 사용해 만드는 것으로  
지정된 타입 중 하나의 타입을 가질 수 있다

```ts
function printHello(id: number | string) {
  console.log(`Hello ${id.toUpperCase()}!`);
  // property 'toUpperCase' dose not exist on type 'string | number'.
  //   property 'toUpperCase' dose not exist on type 'number'.
}

// to fix

function printHello(id: number | string) {
  if (typeof id === "string") {
    console.log(`Hello ${id.toUpperCase()}!`);
  } else {
    console.log(`Hello ${id}`);
  }
}
```

유니언 타입을 사용할 때에는 주의할 점은 `string` 타입에서만 유효한 메소드를 사용할 수 없고  
이를 쓰기 위해선 명확하게 타입을 판단해줘야 한다

_문자열에 변수를 담아 작성하는 방법이 더 궁금하다면 [이쪽](https://ko.javascript.info/string#ref-281)을 참고하시라_

## 객체

원시타입을 제외하면 가장 많이 사용하는 타입이다 이부분은 타입 별칭과 함께 설명한다

```ts
// 변수
const user: { id; name: string } = {
  id: 0,
  name: "pangho",
};

// 함수
function printUser(user: { id; name: string }) {
  console.log(user.id);
  console.log(user.name);
}

printUser({ id: 0, name: "pangho" });
```

우선 객체타입을 지정하는 방법부터 살펴보자  
프로퍼티(`id`, `name`)에 타입을 지정하지 않는 경우 `any` 타입으로 간주하며  
error를 발생시키지만 실행은 가능하다

```ts
function printUser(user: {id: number, name: string, grade?: string}) {
  . . .
}

printUser({id: 0, name: "pangho", grade: "a"});
printUser({id: 1, name: "yongineer"});
```

객채 타입의 경우 선택적 타입 지정도 가능하다 프로퍼티 이름 뒤에 `?`를 붙이면 된다

```ts
function printUser(user: { id: number; name: string; grade?: string }) {
  console.log(user.grade.toUpperCase()); // output Error 'user.grade' is possibly 'undefined'.
}
```

옵셔널 프로퍼티 사용 시 주의해야되는 부분으로 접근 시 `undefined` 여부를 먼저 판단해줘야한다

```ts
function printUser(user: { id: number; name: string; grade?: string }) {
  if (user.grade !== undefined) {
    console.log(user.grade.toUpperCase());
  }

  // or

  console.log(user.grade?.toUpperCase());
}
```

이런식으로 조건문을 사용해 판단한 뒤 사용하거나  
Javascript 문법 중 하나인 [옵셔널 체이닝](https://ko.javascript.info/optional-chaining)을 사용해 간략하게 판단한뒤 사용할 수 있다

```ts
type UserType = {
  id: number;
  name: string;
  grade?: string;
};
```

타입 별칭은 타입을 변수처럼 이용해 재사용할 때 주로 사용하는 방법이다

```ts
function printUser(user: UserType) {
  console.log(user.id);
  console.log(user.name);
}
```

지정된 타입 별칭을 사용하면 깔끔하게 표현할 수 있다

```ts
interface UserType {
  id: number;
  name: string;
  grade?: string;
}
```

`interface`는 객체 타입에만 사용할 수 있는 타입선언의 또다른 방법이다

### interface와 type의 차이점

위에서 설명한대로 우선 `interface`는 객체에만 사용할 수 있다  
`interface`의 기능은 대부분 `type`도 가지고 있기 때문에  
둘 사이의 차이점이 없다고 느껴질 수 있지만 핵심적인 차이는  
`type`은 새 프로퍼티를 추가할 수 없는 반면 `interface`는 항상 확장될 수 있다는 점이다

#### 타입의 확장

```ts
// interface

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

// type

type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: Boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

#### 타입의 추가

```ts
// interface

interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// type

type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```

지금 당장은 그렇게 중요한 개념은 아니기 때문에 이해되지 않아도 괜찬다  
뭘 써야할지 모르겠다면 지금은 `type`을 사용해 점차 익혀나가면 된다

## Syntactic Sugar

때로는 내가 타입스크립트가 추론한 타입보다 더 잘알고있는 경우가 있다  
그럴경우 사용할 수 있는 몇가지 기능이 있다

### 타입 단언

```ts
const input = document.getElementById("main_input") as HTMLInputElement;
```

`input`의 기존 타입은 `HTMLElement | null`이지만 랜더링 후 이 타입은 `HTMLInputElement`  
인 것을 내가 알고 있는 경우 타입 단언 문법인 `as`를 사용하여 이 뒤에 타입을 지정해주면 된다

### Not Null

```ts
function convertFixed(num?: number | null) {
  console.log(num!.toFixed()); // not Error
}
```

위의 경우 `num`이 `null` 일수도 있음에도 Not Null 연산자인 `!`에 의해 `null`이 아님을 단언했다  
이처럼 명시적으로 `null`과 `undefined`를 검사하지 않고도 사용할 수 있으나  
이 연산자는 반드시 `null`과 `undefined`가 아닌 경우에만 사용해야 한다  
자주 사용하지 않는것이 좋다

---

이 외에 타입스크립트에 대한 좀 더 깊은 내용은 아래 참고 자료를 이용해보면 좋다

- [Typescript Handbook](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html)

이외에도 위에 작성된 참고 자료 링크들은 이곳에도 남겨두겠다

- [forEach](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [템플릿 리터럴](https://ko.javascript.info/string#ref-281)
- [옵셔널 체이닝](https://ko.javascript.info/optional-chaining)

# React + Typescript

리엑트를 자바스크립트로 쓸때와 타입스크립트로 쓸 때의 차이점은  
타입이 추가되는 것을 제외하면 크게 달라지는것이 없다

아래의 예시들은 자바스크립트와 타입스크립트의 작성방식을 비교하며  
자주 사용하는 문법들에 대해 나열해보겠다

작성 방식은 모두 React Hooks (함수형 커포넌트) 방식으로 작성했다

## Component

```jsx
export default function SomeComponent() {

   . . .

   return (
      <div>Hello World!</div>
   )
}
```

컴포넌트 작성에는 필수적인 규칙으로 첫 글자를 대문자로 작성해야하는 규칙이 존재한다

```jsx
export default const SomeComponent = () => {

   . . .

   return (
      <div>Hello World!</div>
   )
}
```

화살표 함수를 활용해서 컴포넌트를 만들 수 있다

```jsx
export default function SomeComponent() {

   . . .

   return (
      <div>Hello</div>
      <div>World!</div>
   )
}
```

컴포넌트는 반드시 하나의 `Element`로 묶여서 나가야한다 위 예의 경우 에러가 발생한다

```jsx
export default function SomeComponent() {

   . . .

   return (
      <>
         <div>Hello</div>
         <div>World</div>
      </>
   )
}

// or

export default function SomeComponent() {

   . . .

   return (
      <React.Fragment>
         <div>Hello</div>
         <div>World</div>
      </React.Fragment>
   )
}
```

만약 하나로 묶어야하나 표시되어야할 부모 `Element`가 없어야할 경우 Fragment를 사용해 묶어주면  
실제로는 부모에 묶이지 않은 상태로 내보낼 수 있다

### Props

```tsx
// ParentComponent.tsx

import ChildComponent from "./ChildComponent";

export default function ParentComponent() {
  const someNumber = 0;
  const hello = "Hello World!";

  return (
    <div>
      <ChildComponent someProps={someNumber} anyProps={hello} />
    </div>
  );
}

// ChildComponent.tsx

type PropsType = {
  someProps: number;
  anyProps: string;
};

export default function ChildComponent(props: PropsType) {
  console.log(props); // output {someProps: 0, anyProps: "Hello World!"}
  console.log(props.someProps); // output 0

  return <div>{props.anyProps}</div>;
}

// or

type PropsType = {
  someProps: number;
  anyProps: string;
};

export default function ChildComponent({ someProps, anyProps }: PropsType) {
  console.log(someProps); // output 0

  return <div>{anyProps}</div>;
}
```

다른 컴포넌트에 상태를 전달하는 방법으로 부모 컴포넌트에서 자식 컴포넌트에 `props`를 추가하며  
이름은 임의로 지어도 된다 여기서 props의 이름은 `someProps`, `anyProps`라는 이름으로 지어줬다

전달한 `props`는 객채로 묶여서 나가게 된다  
많이 햇갈리는 부분인데 컴포넌트는 하나 `props`객체만 받을 수 있다

`ChildComponent`의 아래 예시는 하나의 `props`객체를 [구조분해할당(Destructuring assignment)](https://ko.javascript.info/destructuring-assignment#ref-281)을  
이용해 인자를 받아온 것일 뿐이다 자주 사용하는 문법이라 익혀두면 요긴하게 잘 쓴다

### Prop Drilling

```tsx
// ParentComponent.tsx

import ChildComponent from "./ChildComponent";

export default function ParentComponent() {
  const data = "Hello, prop drilling!";

  return (
    <div>
      <ChildComponent data={data} />
    </div>
  );
}

// ChildComponent.tsx

import GrandchildComponent from "./GrandchildComponent";

export default function ChildComponent({ data }) {
  return (
    <div>
      <GrandchildComponent data={data} />
    </div>
  );
}

// GrandchildComponent.tsx

export default function GrandchildComponent({ data }) {
  return <div>{data}</div>;
}
```

하위의 하위 컴포넌트까지 `props`를 전달하는 현상을 `Prop Drilling`이라고 부른다  
`props`를 사용하지 않는 `ChildComponent`에서까지 전달받아 넘겨주기 때문에  
코드로 보기에도 지저분해보이고 애플리케이션 크기가 커질 수록 복잡하고 이해하기 힘들어진다  
이런 현상을 잘 표현한 쇼츠를 하나 보면서 머리를 식히자 [리엑트로 코드 짜는 방법](https://youtube.com/shorts/u86KSUc9Ngg?si=mmHOgJOhfEPnjAEW)

`Prop Drilling`문제를 해결하기 위해 사용하는 것이 상태 관리 라이브러리들이고  
많이 사용하는 상태 관리 라이브러리는 다음과 같다

- [Redux](https://redux.js.org/)
- [Recoil](https://recoiljs.org/ko/)
- [Zustand](https://zustand-demo.pmnd.rs/)

위 세가지 중 `Zustand`, `Recoil`이 쉽게 다룰수 있어 편했다

하위의 하위 컴포넌트에 상태를 반드시 전달해야 하는 경우에만  
상태 관리 라이브러리를 사용하는것을 추천한다

대부분의 상황에서는 구조를 잘 짜두면 굳이 사용하지 않아도 되는경우가 많고  
하위에 한번만 전달하는 정도로 정리되는 경우도 많다

## Render

```jsx
export default function SomeComponent() {
  // render
  return <div>Hello World!</div>;
}
```

컴포넌트에서 예시로 많이 보여졌지만 `return` 부분이 랜더부분이다  
`jsx`, `tsx` 형식의 파일은 반드시 `return`을 통해 `Element`를 내보내야 한다  
작성된 html 태그들이 표시되는 부분이며 여기선 react와 html의 차이점만 간략히 설명한다

```html
<div class="example">Hello World!</div>
```

```jsx
export default function SomeComponent() {
  return <div className="example">Hello World!</div>;
}
```

클래스 이름을 지정할 때 사용하는 속성명이 다르다

```jsx
export default function SomeComponent() {
  const [example, setExample] = useState(true);

  return example ? <div>is True</div> : <div>is False</div>;
}
```

조건부 랜더링이 가능하다  
여기선 삼항연산자를 사용해 조건부 랜더링을 시키고 있다  
`example`이 true일 경우 `?` 뒤의 is True만, false일 경우 `:` 뒤의 is False만 내보낸다

## State

```jsx
// jsx
const [state, setState] = useState(0);
```

```tsx
// tsx
const [state, setState] = useState<number>(0);

// tsx
const [state, setState] = useState(0);
```

상태 지정 방식에서도 타입 추론이 충분히 잘 되어 따로 타입을 지정하지 않아도된다  
다만, 내 경우 타입 지정을 명확히 해두는것을 선호해 최대한 타입을 지정해두는 편

명칭을 `state`, `setState`로 지었을 뿐 변수 이름짓듯 이름을 지으면 된다  
다만 `setState`의 경우 제일 앞에 반드시 `set` 키워드를 붙여 햇갈리지 않도록 한다  
또한, `camelCase` 방식으로 이름을 짓는다

예시) `const [memberList, setMemberList] = useState()`

```jsx
const [state, setState] = useState < number > 0;

const handleSetState = () => {
  setState(5);
};
```

상태값을 변경할 때에는 `setState`를 이용해 할당할 값을 넣어준다

```jsx
const [state, setState] = useState < number > 0;

const handleSetState = () => {
  setState(prev => prev + 1);
};
```

이전값을 참조해 사용할 때에는 콜백함수를 사용한다 인자값은 이전에 할당된 값이다

```jsx
const [state, setState] = useState < number > 0;

const handleSetState = () => {
  setState(state + 1);
};
```

이전값을 참조할 때 이런식의 사용도 가능하다  
다만 성능적으로는 위의 방식이 좋다고 한다

```ts
type ResType = {
   name: string;
   age: number;
}

export default function SomeComponent() {
   const [response, setResponse] = useState<ResType>();

   const someFetch = async () => {
      try {
         const res = await axios.get<ResType>("https://example.com");

         setResponse(res);
      } catch (error) {
         throw error;
      }
   }

   . . .
}
```

요청을 통해 객체 형태의 값을 받아온 경우 상태로 지정하는 방법이다  
`ResType`이라는 제네릭 타입을 지정한 뒤 랜더링 시 값을 할당하지 않고  
요청을 통해 응답받은 데이터를 `setResponse` 액션 함수를 이용해 값을 할당한다

## useEffect

리액트의 생명주기에 따라 함수를 실행할 때 사용한다  
클래스 컴포넌트의 경우 주로 세가지 생명주기를 이용했었는데  
함수형 컴포넌트에선 useEffect 하나를 사용해 생명주기를 이용한다

```tsx
import { useEffect } from "react";

. . .

export default function SomeComponent() {
   const [state, setState] = useState<ResType>();

// useEffect 메소드는 콜백함수, dependency 리스트를 인자로 받는다
   useEffect(() => {
      someFetch()

      // dependency가 빈 리스트일 경우 컴포넌트가 처음 등장(랜더링) 시에만 콜백함수 실행한다
      // 클래스 컴포넌트에서의 componentDidMount()에 해당한다
   }, [])

   useEffect(() => {
      someFetch()

      // dependency에 지정한 변수(이 경우 state)에 사이드이팩트가 발생할 경우에 콜백함수를 실행한다(리랜더링)
      // dependency는 리스트 타입이기 때문에 여러개 넣어도 된다
      // 클래스 컴포넌트에서의 componentDidUpdate()에 해당한다
   }, [state])

   useEffect(() => {
      // return에서도 콜백함수를 사용해야 한다, 컴포넌트가 퇴장(언마운트)할 때 콜백함수를 실행한다
      // 자주 사용하는일은 없으며, 어떤 값을 참조, 구독중인 이벤트를 해제할 때 사용한다 예시) document.removeEventListener("click")
      // 클래스 컴포넌트에서의 componentDidUnmount()에 해당한다
      return () => {
         setState(undefined);
      }
   }, [])

   const someFetch = () => {
      . . .
   }

   . . .
}
```

## useRef

리액트에서 `Element`에 직접 접근하는 방법  
코어 자바스크립트로 html에 접근할 때 사용하는 `document.querySelect('.some-class')`와 같은 방식
많이 사용되진 않으나 사용할일은 반드시 있음

```tsx
import { useRef } from "react";

export default function SomeComponent() {
  // 선언 시에는 랜더링 되기 전이기에 초기값은 null, 랜더링 후 지정된 Element 참조
  const someRef = useRef<HTMLElement | null>(null);

  return <div ref={someRef}>example</div>;
}
```

기본적인 html에는 없는, jsx, tsx 형식에서만 존재하는 html 속성인 ref를 이용해 참조할 `Element`를 지정  
이렇게하면 지정된 `Element`에 접근이 가능하며 [Element](https://developer.mozilla.org/en-US/docs/Web/API/element) 속성들을 이용할 수 있다

이 외에도 리랜더링이 되어도 값이 유실되지 않는 특징을 이용해 상태와는 다른 변수처럼 사용이 가능하며  
사용 방법은 찾아보면 여러가지 형태로 이용 가능하다

## 프로젝트에서 사용중인 파일구조

### 폴더구조

```
├──.env                    # 환경변수 폴더
├──public                  # 이미지 파일 저장 폴더
├──src                     # 소스코드 폴더
│   ├──assets              # 공통 이미지, 공통 css 폴더
│   ├──api                 # api 통신 함수 폴더 (추가예정)
│   ├──components          # 공통 컴포넌트 폴더 (추가예정)
│   ├──hooks               # 공통 사용 hooks 폴더
│   ├──layouts             # 레이아웃 컴포넌트 폴더
│   ├──pages               # 라우팅 페이지 폴더
│   ├──routes              # 라우트 폴더
│   ├──types               # 공통 type 파일 폴더 (추가예정)
│   ├──utils               # 기타 유용한 함수 폴더
│   ├──App.tsx             # 컴포넌트 단일 진입점
│   ├──main.tsx            # react render 파일
│   └──vite-env.d.ts       # vite 환경변수 타입파일
├──.gitignore              # gitignore
├──.prettierrc             # prettier 설정 파일 (코드 포맷터)
├──index.html              # html 베이스 핵심파일
├──package.json            # 프로젝트 정보 파일
├──package-lock.json       # 프로젝트 패키지 정보 파일
├──README.md               # 이거 작성된 파일임
├──tsconfig.app.json       # 타입스크립트 설정파일
├──tsconfig.json           # 타입스크립트 설정파일
├──tsconfig.node.json      # 타입스크립트 설정파일
└──vite.config.ts          # vite 설정파일
```

### pages 폴더

pages 폴더 내의 폴더 이름은 라우팅될 pathName과 동일한 이름으로 이름을 지음  
페이지 내에서 사용하는 컴포넌트의 경우 폴더 이름도 동일하게 대문자로 시작

예시)

```
├──pages
│   ├──post                # 게시글 페이지
│   │    └──Intro          # 인사말 컴포넌트
│   │    │    ├──index.tsx # 인사말 컴포넌트의 파일
│   │    │    └──style.tsx # 인사말 컴포넌트의 스타일 파일
│   ├──index.tsx           # 게시글 페이지의 파일
│   └──style.tsx           # 게시글 페이지의 스타일 파일
```

이 경우 라우팅은 `localhost:5173/post`가 된다

### index.tsx

컴포넌트 파일의 구성은 어느정도 비슷한 컨벤션을 가지도록 만듦

```tsx
// 패키지 import 구간
import { useEffect } from "react";

// 스타일 import 구간
import "./style.scss"

// 컴포넌트 import 구간
import SomeComponent from "@/components/SomeComponent"

// 기타 필요한 것들 import
import { someType } from "@/types/someType"

// ! /src의 경로를 vite 설정파일을 통해 @ 로 변경해둠

// 이 파일에서만 사용하는 type 지정 구간
// 공통 타입의 경우 types 폴더에서 import해서 사용

type ResType = {
   . . .
}

// 메인 파일 시작 구간
export default function MainPageExample() {
   // 상태 지정 구간
   const [state, setState] = useState(0);

   // 생명주기는 상태 다음에 위치시켜 가독성을 높임
   useEffect(() => {
      . . .
   }, [])

   // 필요한 기능 함수 작성
   const handleExample = () => {
      . . .
   }

   // render 구간
   return (
      <div>example</div>
   )
}
```

```tsx
// 주석을 모두 없애면 이런 코드가 완성됨

import { useEffect } from "react";

import "./style.scss"

import SomeComponent from "@/components/SomeComponent"
import { someType } from "@/types/someType"

type ResType = {
   . . .
}

export default function MainPageExample() {
   const [state, setState] = useState(0);

   useEffect(() => {
      . . .
   }, [])

   const handleExample = () => {
      . . .
   }

   return (
      <div>example</div>
   )
}
```

---

위 내용의 참고 자료들에대한 링크를 이곳에 모아두겠다

- [React Tutorial Your First Component](https://react.dev/learn/your-first-component)
- [MDN HTML Element Properties](https://developer.mozilla.org/en-US/docs/Web/API/element)
- [구조분해할당(Destructuring assignment)](https://ko.javascript.info/destructuring-assignment#ref-281)
- [Youtube Shorts 리엑트로 코드 짜는 방법](https://youtube.com/shorts/u86KSUc9Ngg?si=mmHOgJOhfEPnjAEW)
- [Redux](https://redux.js.org/)
- [Recoil](https://recoiljs.org/ko/)
- [Zustand](https://zustand-demo.pmnd.rs/)

# React-Router-Dom

`react-router-dom`은 `Client Side Routing`을 활성화시키는 라이브러리이다

기존 웹사이트는 브라우저가 웹 서버에서 문서를 요청하고, CSS, javascript를 다운받은 뒤  
서버에서 전송한 html을 렌더링하는 방식이다

클라이언트측 라우팅을 사용하면 앱에서 서버에 별다른 문서를 요청하지 않고 URL을 업데이트할 수 있고  
즉시 새 UI를 렌더링하고 `fetch`를 통해 새 정보로 페이지를 업데이트 한다

이런 방식을 통해 브라우저는 새 문서를 서버에 요청할 필요 없어 더 빠른 사용자 경험을 제공한다

아래 예시는 내가 세팅한 프로젝트의 파일의 구조를 예로 설명한다

```tsx
// /routes/index.tsx

import { createBrowserRouter } from "react-router-dom";
import { pages } from "./routes";

const router = createBrowserRouter(pages);
export default router;
```

`Client Side Routing`을 활성화하기 위한 라우터를 생성하는 과정이다  
생성 시 인자로 `pages`를 넘기는데 이부분은 후술하겠다
이렇게 생성된 모듈을 `export default router;`로 내보내준다

`createBrowserRouter`는 모든 리엑트 라우터 웹 프로젝트에 권장되는 라우터이다  
이외에도 `createHashRouter`, `createMemoryRouter`도 존재한다

```tsx
// App.tsx

import { RouterProvider } from "react-router-dom";
import router from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

`Client Side Routing`을 활성화하는 과정이다 생성된 라우팅을  
`<RouterProvider>`에 router를 전달하는 것으로 활성화 한다

이렇게 클라이언트측 라우팅이 활성화된 상태에서 내부의 컴포넌트에서만  
`<Link />`, `useNavigate`와 같은 기능이 사용 가능하다

```tsx
// /routes/routes.tsx

import { RouteObject } from "react-router-dom";
import Main from "../pages/main";
import DesktopLayout from "@/layouts/DesktopLayout";

export const pages: RouteObject[] = [
  {
    element: <DesktopLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
    ],
  },
];
```

`pages`는 라우팅될 페이지들을 트리구조의 객체 리스트로 내보내진다  
`element`는 내보내질 컴포넌트, `children`은 하위 페이지들이다

```ts
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
```

`RouteObject`를 구성하는 타입들이다 이 중 `path`, `children`, `element` 이 3가지를 주로 사용한다

#### `path`

이 값이 URL과 일치시킬 경로 패턴이다

#### `children`

중첩시킬 하위 페이지에 대한 라우트이다

#### `element`

URL경로가 일치할 때 렌더링할 리엑트 노드

## Outlet

이 프로젝트에선 단일 경로를 이용해 하위 페이지들을 구성할 예정이고  
`children` 노드들의 `element`는 `<Outlet />`에 위치하게 된다

```tsx
// /layouts/DesktopLayout

import { Outlet } from "react-router-dom";
import MobileView from "../MobileView";

import "./style.scss";

export default function DesktopLayout() {
  return (
    <div className="main-container">
      <MobileView>
        <Outlet />
      </MobileView>
    </div>
  );
}

// 예시
// localhost:5173

export default function DesktopLayout() {
  return (
    <div className="main-container">
      <MobileView>
        <Main /> // Outlet
      </MobileView>
    </div>
  );
}
```

레이아웃에 맞춰 특정 box안에 페이지를 표시하고 싶을 때 사용하는것이 `<Outlet />`이다

## Dynamic Segments

동적 세그먼트를 사용해 URL에 매개변수를 넘길수 있다

```tsx
export const pages: RouteObject[] = [
  {
    element: <DesktopLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      // example
      {
        path: "/user/:id"
        element: <User />
      }
    ],
  },
];
```

`path`의 시작이 `:`으로 시작할 경우 동적 경로가 된다  
경로가 일치할 경우 동적 세그먼트가 파싱되어 매개변수로 제공된다

```tsx
// pages/user example
// localhost:5173/user/{임의 id값}

import { useParams } from "react-router-dom";

export default function User() {
  const params = useParams();
  // const { id } = useParams();

  return <div>User ID is {params.id}</div>;
}
```

이 경우 react-router-dom의 `useParmas`를 사용해 매개변수를 사용할 수 있다  
이를 활용해 id 값을 사용한 사용자 조회등의 기능도 구현해볼 수 있다

## `<Link>`

```tsx
import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div>
      <Link to={"/example"}>example</Link>
    </div>
  );
}
```

react-router-dom 에서 제공하는 `<Link>` 컴포넌트를 이용해  
사용자에게 다른 페이지로 넘어갈 수 있게 만들 수 있다

`to` 속성에 입력한 path값이 클릭 시 사용자가 넘어갈 path가 된다

렌더링 시에는 `<Link>` 태그가 `<a>`태그로 렌더링되는 특징이 있다

## useNavigate

```tsx
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/example")}>example</button>;
}
```

컴포넌트가 아닌 함수를 사용해 사용자에게 다른 페이지로 넘어갈 수 있게 만들 수 있다  
넘어갈 페이지의 path 값을 인자로 넘겨주면 된다

### state

```tsx
import { useNavigate, Link } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/example", {state: {name: "Yongineer"}})
  }

  return (
    <>
      <Link
        to={"/example"}
        state={{
          name: "Pangho",
        }}
      >
        Go to Pangho
      </Link>
      <button onClick={handleNavigate}>Go to Yongineer</button>
    </>
  );
}

// example page

import { useLocation } from "react-router-dom";

export default function Example() {
  const location = useLocation();
  return <div>Hello {location.state?.name}!</div>
}
```

페이지 이동 시 임의의 객체를 하나 같이 보낼 수 있다 `state`라는 이름의 객채로  
이 안에 객체를 하나 담아서 보내면 이동한 페이지에서 이를 `useLocation`을 활용해 이용할 수 있다

타입스크립트 사용 시 주의할 점은 location 객체에 state가  
`undefined`일 수 있기 때문에 판단을 해줘야한다

## useLocation

위에서도 잠깐 언급되었지만 `useLocation`에서는 URL과 관련된 다양한 기능을 수행할 수 있다  
리액트에선 주로 페이지가 변경되었을 때 어떤 부수적인 기능을 수행할 때 주로 사용한다

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics
    ga("send", "pageview");
  }, [location])

  return (
    . . .
  )
}
```

위 예시처럼 페이지가 변경될 때마다 Google Analytics를 이용해 페이지 뷰 통계를 낼 수도 있다


### location.pathname

`/`이니셜 뒤에 URL의 나머지 부분 (`?`까지)의 문자열을 받아온다  
사용법은 Javascript의 URL 인터페이스와 동일하다

- [MDN URL pathname](https://developer.mozilla.org/ko/docs/Web/API/URL/pathname);

### location.search

`?`이니셜 뒤에 `key=value`형식의 쿼리 문자열을 받아온다 값이 없는 경우 `''`을 받게된다  
사용법은 Javascript의 URL 인터페이스와 동일하다

- [MDN URL search](https://developer.mozilla.org/ko/docs/Web/API/URL/search)

### location.state

사용자가 제공하는 임의의 상태 객체이다  
데이터를 URL에 넣지 않고 페이지를 넘어가며 정보를 활용할 때 사용한다

- [MDN History state](https://developer.mozilla.org/ko/docs/Web/API/History/state)

---

위 내용의 참고 자료들에대한 링크를 이곳에 모아두겠다

- [React-Router-Dom V6 Tutorial](https://reactrouter.com/en/main/start/tutorial)  
- [MDN URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)