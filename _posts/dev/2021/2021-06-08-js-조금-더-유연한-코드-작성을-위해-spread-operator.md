---
layout: post
title: "[JS] 조금 더 유연한 코드 작성을 위해. Spread Operator"
date: 2021-06-08
categories: dev
---

ES6에는 `...`라는 특이한 형태의 문법이 추가되었습니다.

점 3개가 연달아 붙어있는 이 표시는 Spread Operator(전개 구문, 스프레드 연산자)를 나타내는 것으로, 배열, 함수, 객체 등을 다루는 데 있어서 매우 편리한 기능을 제공합니다.

특히 **연결, 복사 등의 용도로 활용도가 높습니다.**

---

# 1. 배열에서의 Spread Operator

## 1-1. 배열 병합 (Array Concatenation)

### 기존 방식과의 비교

두 개의 배열을 결합하는 데 있어서 기존에는 `concat` 메서드를 사용했었습니다.

ES6에서는 전개 구문을 이용하여 좀 더 깔끔한 배열 병합이 가능합니다.

```js
// 기존 방식
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let arr = arr1.concat(arr2);
console.log(arr); // [1, 2, 3, 4, 5, 6]

// ES6 Spread Operator
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let arr = [...arr1, ...arr2];
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

### 다양한 형태의 배열 병합

전개 구문을 이용하면 다양한 형태의 배열 병합을 비교적 간단하게 수행할 수 있습니다.

```js
// push와 함께 사용
let arr1 = [1, 2, 3]; 
let arr2 = [4, 5, 6]; 
arr1.push(...arr2);

console.log(arr1); // [1, 2, 3, 4, 5, 6]

// 배열 중간에 삽입
let arr1 = [1, 2];
let arr2 = [0, ...arr1, 3, 4];

console.log(arr2); // [0, 1, 2, 3, 4]
```

## 1-2. 배열 복사 (Copying Arrays)

### JavaScript의 배열 참조 특성

JavaScript에서 배열을 새로운 변수에 할당하는 경우, 새로운 변수는 기존 배열을 **참조**합니다.

따라서 새로운 변수를 통해 배열을 변경하는 경우 원본 배열 역시 변경됩니다.


```js
// 단순 변수 할당 (참조)
let arr1 = ['철수', '영희']; 
let arr2 = arr1; 

arr2.push('바둑이'); 
console.log(arr2); // ["철수", "영희", "바둑이"]
// 원본 배열도 변경됩니다.
console.log(arr1); // ["철수", "영희", "바둑이"]
```

### 기존의 배열 복사 방법

위와 같은 성질 때문에 배열 참조가 아닌 배열 복사를 위해서 기존에는 `slice` 또는 `map`을 이용하여 배열을 복사했습니다.

```js
// slice를 이용한 복사
let arr1 = ['철수', '영희']; 
let arr2 = arr1.slice();

arr2.push('바둑이'); 
console.log(arr2); // ["철수", "영희", "바둑이"]
// 원본 배열은 변경되지 않습니다.
console.log(arr1); // ["철수", "영희"]

// map을 이용한 복사
let arr1 = ['철수', '영희']; 
let arr2 = arr1.map((item) => item);

arr2.push('바둑이'); 
console.log(arr2); // ["철수", "영희", "바둑이"]
// 원본 배열은 변경되지 않습니다.
console.log(arr1); // ["철수", "영희"]
```

### Spread Operator를 이용한 복사

이제 ES6의 전개 구문을 사용하면 다음과 같이 새로운 복사된 배열을 생성할 수 있습니다.

```js
// ES6 Spread Operator를 이용한 복사
let arr1 = ['철수', '영희']; 
let arr2 = [...arr1]; 

arr2.push('바둑이'); 

console.log(arr2); // ["철수", "영희", "바둑이"]
// 원본 배열은 변경되지 않습니다.
console.log(arr1); // ["철수", "영희"]
```

### 주의사항: 얕은 복사 (Shallow Copy)

**중요:** 전개 구문을 이용한 복사는 얕은 복사(Shallow Copy)를 수행합니다.

따라서 **배열 안에 객체가 있는 경우에는 객체 자체가 복사되지 않고 객체의 참조만 복사됩니다.**

이 경우 원본 배열 내의 객체를 변경하면 복사된 배열 내의 객체 값도 변경됩니다.

```js
let arr1 = [{name: '철수', age: 10}]; 
let arr2 = [...arr1]; 

arr2[0].name = '영희';

console.log(arr1); // [{name: '영희', age: 10}]
console.log(arr2); // [{name: '영희', age: 10}]
```

깊은 복사(Deep Copy)가 필요한 경우에는 별도의 방법을 사용해야 합니다.

---

# 2. 함수에서의 Spread Operator

## 2-1. Rest Parameter

### Rest Parameter란?

함수를 정의할 때 매개변수(parameter)를 전개 구문으로 작성한 형태를 Rest Parameter라고 부릅니다.

Rest Parameter를 사용하면 함수의 매개변수로 전달되는 값들을 "**배열**"로 수집합니다.

이를 통해 보다 더 깔끔한 함수 표현을 적용할 수 있습니다.

```js
function add(...rest) {
  let sum = 0;
  for (let item of rest) {
    sum += item;
  }
  return sum;
}

console.log(add(1));          // 1
console.log(add(1, 2));       // 3
console.log(add(1, 2, 3));    // 6
```

위의 결과에서 볼 수 있듯이, Rest Parameter를 이용하면 인자의 개수에 상관없이 모든 인자를 더하는 함수를 쉽게 구현할 수 있습니다.

### 일반 매개변수와 함께 사용하기

다음과 같이 일반 매개변수와 Rest Parameter를 섞어서 사용하는 방법도 가능합니다.

```js
function addMul(method, ...rest) { 
  if (method === 'add') {
    let sum = 0;
    for (let item of rest) {
      sum += item;
    }    
    return sum;    
  } else if (method === 'multiply') {
    let mul = 1;
    for (let item of rest) {
      mul *= item;
    }
    return mul;    
  }
} 

console.log(addMul('add', 1, 2, 3, 4));        // 10
console.log(addMul('multiply', 1, 2, 3, 4));   // 24
```

### Rest Parameter 사용 시 주의사항

**중요:** Rest Parameter는 **항상 매개변수의 마지막에 위치해야 합니다.**

```js
// ❌ 잘못된 사용
function addMul(...rest, method) {} // SyntaxError

// ✅ 올바른 사용
function addMul(method, ...rest) {}
```

Rest Parameter 뒤에 다른 매개변수가 올 수 없습니다. 그 이유는 나머지 모든 인자를 수집하는 역할이기 때문입니다.

### 참고: arguments 객체와의 차이

기존 JavaScript에서는 `arguments` 객체를 이용하여 가변 인자를 처리할 수 있었습니다. 하지만 `arguments`는 유사 배열 객체이므로 배열 메서드를 직접 사용할 수 없다는 단점이 있었습니다. Rest Parameter는 실제 배열이므로 배열 메서드를 바로 사용할 수 있어 더 편리합니다.

## 2-2. 함수 호출 시 인자로 사용

### 배열을 개별 인자로 전달하기

함수를 호출할 때도 전개 구문을 사용할 수 있습니다.

기존에는 배열로 되어있는 내용을 함수의 인자로 넣어주려면 직접 하나하나 풀어서 넣어주거나 `apply`를 이용해야 했습니다. 하지만 전개 구문을 이용하면 배열 형태에서 바로 함수 인자로 전달할 수 있습니다.

```js
let numbers = [9, 4, 7, 1]; 
Math.min(...numbers); // 1
```

### 응용 예제

이를 조금 더 응용하면 다음과 같이 사용할 수 있습니다.

```js
let input = [
  {name: '철수', age: 12}, 
  {name: '영희', age: 12}, 
  {name: '바둑이', age: 2}
];

// 가장 어린 나이 구하기
let minAge = Math.min(...input.map((item) => item.age));
console.log(minAge); // 2
```

`map`과 전개 구문을 함께 사용하면 위와 같이 간결하게 표현할 수 있습니다.

### 생성자 함수와 함께 사용

또한 `new`를 사용해 생성자를 호출할 때, 배열과 `apply`를 직접 사용하는 것은 불가능했는데, 전개 구문을 이용하면 배열을 손쉽게 `new`와 함께 사용할 수 있습니다.

```js
let dateFields = [1970, 0, 1];  // 1 Jan 1970
let d = new Date(...dateFields);
```

---

# 마치며

전개 구문은 배열 조작과 함수 호출에서 특히나 유용합니다.

다만 얕은 복사의 특성을 이해하고 사용해야 하며, Rest Parameter의 위치 제약도 기억해야 합니다.

앞으로 다양하게 써보며 더 숙지할 예정입니다.