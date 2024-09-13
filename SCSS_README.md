# SCSS

SASS라고도 불리우는 CSS 전처리기로 CSS보다 확장된 기능들을 사용해  
좀 더 편하게 CSS를 작성하는 스크립트 언어이다

작동 방식을 간략하게 설명하면 SCSS로 작성된 스타일 시트를  
CSS파일로 컴파일해주는 역활을 한다

### SCSS? SASS?

둘의 차이는 작문법과 확장자의 차이만 있을 뿐 별다른 차이가 없다

```sass
<!-- style.sass -->
body
  background-color: blue
  font-size: 20px
```

```scss
// style.scss
body {
  background-color: blue;
  font-size: 20px;
}
```

`SASS`는 들여쓰기를 기준으로 구분하여 작성되고  
`SCSS`는 중괄호를 기준으로 구분되어 사용한다

개인적으로는 `SASS`보다 `SCSS`가 더 가독성이 좋아보인다

CSS를 작성하는 것과 동일한 방식으로 작성하면 된다  
때문에 익히기 쉽고 `SCSS`를 사용하다보면 자연적으로 `CSS`도 익혀지게 된다  
이런 이유로 이번 프로젝트에선 `styled-component`, `tailwind`가 아닌 `SCSS`를 사용하게 되었다

## Variables

```scss
$color-primary: #1877f2;
$border-radius: 12px;

. . . .main-container {
  color: $color-primary;
  border-radius: $border-radius;
}
```

`SCSS`에서는 `$`기호를 사용해 변수를 만들 수 있다 변수를 사용하여 공통적으로 들어가는 값들을 지정해두고  
필요한 곳에서 사용하는 것으로 동일한 값을 일제히 바꿀 수 있다

## Nesting

`CSS`와 `SCSS`의 큰 차이점 중 하나는 중첩 방법이다  
아래 예시에선 `CSS`와 `SCSS`에서 HTML 구조를 서로 어떻게 중첩하는지 살펴보자

```html
<section class="main-container">
  <article class="top">article-1</article>
  <article class="middle">article-2</article>
  <article class="bottom">article-3</article>
</section>
```

```scss
// scss
.main-container {
  margin: 0px;
  padding: 0px;

  .top {
    background-color: skyblue;
  }

  .middle {
    background-color: steelblue;
  }

  .bottom {
    background-color: blue;
  }
}
```

```css
/* css */
.main-container {
  margin: 0px;
  padding: 0px;
}

.main-container .top {
  background-color: skyblue;
}

.main-container .middle {
  background-color: steelblue;
}

.main-container .bottom {
  background-color: blue;
}
```

`HTML`만 봤을 때 `<section>`안에 중첩되어있는 `<article>`들을 확인할 수 있다  
다만, `CSS`사용 시 중첩구문이 명확하지 않아 가독성이 좋지 않은 단점이 있다

`SCSS`사용 시 `HTML`을 따라 `.main-container` 안에서 깔끔하게 중첩할 수 있는 차이가 있다  
주의할 점은 지나치게 깊은 중첩은 오히려 유지보수에 어려울 수 있으니 이를 유의해야 한다

## Mixin

```scss
@mixin display-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin typography($font-size, $font-weight) {
  font-size: $font-size;
  font-weight: $font-weight;
}

.main-container {
  @include display-center;
  @include typography(16px, 700);
}
```

자주 재사용되는 CSS를 묶어서 하나의 함수로 사용할 수 있다  
이 예시는 우리 프로젝트에서도 사용 중인 `mixin`으로, 자주 사용되는 속성들을 묶어두고  
사용할 곳에서 `@include {KEYWORD}` 형식으로 사용할 수 있다

인자를 전달해 값을 입력하도록 만들수도 있다 `typography` 함수는 폰트 크기와 굵기를  
입력받은 값으로 넣을 수 있다

mixin을 잘 활용하면 좀 더 깔끔하게 작성하면서 반복적으로 작성하는 피곤함을 덜어낼 수 있다

## 프로젝트 style 폴더 구조

`SCSS`의 사용은 위의 내용으로 충분히 사용할 수 있고 이 외에는 전부 `CSS`와 관련되어있다  
`CSS` 속성에 관한 내용에 들어가기 앞서 프로젝트에서 내가 세팅한 파일들의 구조를 살펴보자

```
assets                            # 공통 이미지, 공통 CSS 폴더
  ├──images                       # 이미지 폴더
  ├──styles                       # 공통 CSS 폴더
  │    ├──abstracts               # scss 함수, 변수 폴더
  │    │      ├──_mixins.scss     # 공통 mixin 함수 파일
  │    │      └──_variables.scss  # 공통 변수 파일
  │    ├──base                    # reset, font 파일 폴더
  │    │    ├──_reset.scss        # 초기 스타일 속성 reset 파일
  │    │    └──_font.scss         # 폰트 파일 (추후 추가 예정)
  │    ├──_abstracts.scss         # abstracts 폴더 단일 진입점
  │    ├──_base.scss              # base 폴더 단일 진입점
  │    └──index.scss              # styles 폴더 단일 진입점
```

모든 파일은 단일 진입점을 통해 `index.scss` 하나의 파일에 import 되어있음  
vite 설정을 통해 각 컴포넌트, 페이지의 `style.scss` 파일은 styles/index.scss 파일을 import해서 사용함  
이를 통해 모든 `styles.scss` 파일은 공통 변수, 함수에 접근 가능하도록 세팅

*reset.scss 파일의 역활은 브라우저의 기본 css값들을 초기화 시키는 파일이며   
더 자세한 내용이 궁금하다면 [이쪽](https://meyerweb.com/eric/tools/css/reset/)을 참고하시라*