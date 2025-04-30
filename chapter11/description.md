# 11장 API 리팩터링

### **11.3 프래그 인수 제거하기 (4.28)**

프래그 인수가 있는 경우, 해당하는 함수가 어떤 역할을 하는지 호출하는 쪽에서 명확하게 파악하기 어렵다.

플래그 인수가 있으면 함수들의 기능 차이가 잘 드러나지 않는다.

**프래그 인수?**

호출하는 쪽에서 블리언 값으로 리터럴 값을 건네야 한다.

또한 호출하는 함수는 그 인수를 제어 흐름을 결정하는 데 사용해야 한다.

```jsx
// 호출하는 쪽에서 리터럴 값을 건네고 있다
bookConcert(aCustomer, 'premium') 
```

**절차**

매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.

원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

### **11.4  객체 통째로 넘기기**

함수가 레코드 자체에 의존하기를 원치 않는 경우, 레코드와 함수가 서로 다른 모듈에 속한 상황이면 더욱 그렇다

### **11.5 매개변수를 질의 함수로 바꾸기**

피호출 함수가 스스로 쉽게 결정할 수 있는 값을 매개변수로 건네는 것도 일종의 중복

호출할 때 마다 호출 함수가 결정해야 된다. 이런 경우는 의미가 없고 코드만 복잡해진다.

호출하는 쪽을 간소하게 하자. 물론 피호출 함수가 그 역할을 할 수 있을때만 해야된다.

**하지 말아야 하는 경우?**

피호출 함수에 의존성이 생기는 경우이다. 해당 함수가 알지 못했으면 하는 프로그램 요소에 접근해야 하는 상황이 만들어 지는 경우이다. 

(주로 함수 본문에서 문제의 외부 함수를 호출해야 하거나 나중에 함수 밖에으로 빼내길 원하는 수용 객체 담긴 데이터를 사용해야 할 때 일어남)

**주의사항**

대상 함수가 참조 투명 해야 한다는 것이다.

참조 투명 - 함수에 똑같은 값을 건네 호출하면 항상 똑같이 동작한다.

매개변수를 없애는 대신 가변 전역 변수를 이용하는 일은 하면 안된다.

```jsx
// 리팩토링 전
hasOverlapSubscription(start, end, hospital)

function hasOverlapSubscription(start, end, hospital) {
    const subscriptionStart = start;
    const subscriptionEnd = end;
}

// 리팩토링 후
hasOverlapSubscription(hospital)

function hasOverlapSubscription(hospital) {
    const subscriptionStart = hospital.subscriptionStart;
    const subscriptionEnd = hospital.subscriptionEnd;
}
```