"use strict";
// npm init -y : package.json 설치
// npm i typescript : 타입스크립트 설치
// npx tsc : TypeScript Compiler 설치
// npx tsc --init : tsconfig.json 설치
let a = "hello";
let b = 5;
let c = true;
let d = undefined;
let e = null;
let f = true; //any는 쓰지말자 웬만해선, 타입스크립트의 주목적은 any를 없앤다
//타입 고정 방법
const g = "hello";
//함수 타입 사용
function add(x, y) { return x + y; }
;
function add2(x, y) {
    return x + y;
}
const arrowAdd = (x, y) => x + y;
() => {
    (x, y) => ;
};
const arrowAdd2 = (x, y) => x + y;
//객체 사용
const obj = {
    id: 'cmjj0824',
    name: 'minjae',
    age: 29,
};
//배열 사용
const arr = ['hi', 'hello'];
const arr2 = [123, 456];
//튜플 사용
const arr3 = [123, 456, 'hi'];
//빈 배열일때 타입은 never가 된다
const arr4 = [];
arr4.push("hello");
//querySelector 에서 타입설정은, document라고 생각해도 되겠네, Element Interface 사용
const head = document.querySelector();
if (head) {
    head.innerHTML = "hello world!";
    console.log(head);
}
// 마지막에 느낌표를 붙이는 문법 : 타입이 null이 아니라 값이 있고 타입이 있다는 확신을 붙일때 ! 사용
// 하지만, 절대라는 것은 없기에 웬만하면 !사용 자제, 위의 코드처럼 if로 값이나 타입을 처리하자
const head2 = document.querySelector();
const enumA = 1 /* EDirection.Up */; // 1
const enumC = "hello" /* EDirection.Right */; // "hello"
// 객체에서 상수로 타입을 잘 남기고 싶다 할때는 as const 사용 : 엄격히 타입설정
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: "hello",
};
// | : Union, 유니온, 또는 이라고 부름, type에서 or 기능, But 타입추론이 제대로 안됨, x+y 빨간줄 확인
function union(x, y) {
    return x + y;
}
union(1, 2);
union('1', '2');
union(1, '2');
const andA = { hello: 'world', cha: "minjae" };
const andA2 = { hello: 'world' }; // & 이라 타입 에러
const andB = { hello: 'world', cha: "minjae" };
const andB2 = { hello: "world" }; // | 이라 타입 만족
