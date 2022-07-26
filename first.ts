// npm init -y : package.json 설치
// npm i typescript : 타입스크립트 설치
// npx tsc : TypeScript Compiler 설치
// npx tsc --init : tsconfig.json 설치

let a: string = "hello";
let b: number = 5;
let c: boolean = true;
let d: undefined = undefined;
let e: null = null;
let f: any = true; //any는 쓰지말자 웬만해선, 타입스크립트의 주목적은 any를 없앤다

//타입 고정 방법
const g: "hello" = "hello"

//함수 타입 사용
function add(x: number, y: number): number {return x + y};

//함수 타입 사용 2, 타입과 선언을 따로
function add2(x: number, y: number) : number;
function add2(x, y){
    return x + y
}

//간단하게 타입 설정하고 싶으면 type, 객체지향적으로 설계하고 싶다면 interface

//type 사용
type Add = (x: number, y: number) => number
const arrowAdd: Add = (x, y) => x + y; 

//interface 사용
interface interfaceAdd() {
    (x: number, y: number): number
}
const arrowAdd2: interfaceAdd = (x, y) => x + y;

//객체 사용
const obj : {id : string, name: string, age: number} = {
    id : 'cmjj0824',
    name : 'minjae',
    age : 29,
}

//배열 사용
const arr: string[] = ['hi', 'hello'];
const arr2: number[] = [123, 456];
//튜플 사용
const arr3: [number, number, string] = [123, 456, 'hi'];

//빈 배열일때 타입은 never가 된다
const arr4 = [];
arr4.push("hello");

//querySelector 에서 타입설정은, document라고 생각해도 되겠네, Element Interface 사용
const head : Element = document.querySelector(#head);
if(head){
    head.innerHTML = "hello world!"
    console.log(head)
}

// 마지막에 느낌표를 붙이는 문법 : 타입이 null이 아니라 값이 있고 타입이 있다는 확신을 붙일때 ! 사용
// 하지만, 절대라는 것은 없기에 웬만하면 !사용 자제, 위의 코드처럼 if로 값이나 타입을 처리하자
const head2 = document.querySelector(#head)!;

//타입 고정 방법을 이용해 백틱을 활용할 수도 있다.
type World = "world";
//type Greeting = "hello world"
type Greeting = `hello ${World}`;

//변수들의 타입을 하나의 그룹으로 묶고 싶을때 enum 사용

// JS로 컴파일 될때 enum은 사라짐, 그래서 컴파일 될때 사라지게 하고싶으면 enum, 상관없다하면 그냥 객체로 써도 괜찮음
const enum EDirection {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = "hello",
}

const enumA = EDirection.Up; // 1
const enumC = EDirection.Right; // "hello"

// 객체에서 상수로 타입을 잘 남기고 싶다 할때는 as const 사용 : 엄격히 타입설정

const ODirection= {
    Up: 0,
    Down : 1,
    Left : 2,
    Right : "hello",
} as const

// | : Union, 유니온, 또는 이라고 부름, type에서 or 기능, But 타입추론이 제대로 안됨, x+y 빨간줄 확인
function union(x: number|string, y: number|string) : string|number {
    return x + y
}
union(1,2)
union('1','2')
union(1,'2')

// & : Intersection, 앤드라고 부름, 둘다 타입을 만족해야할때, string이나 number같은 곳에는 못쓰이고 객체 타입 때 많이 쓰인다.
type A = { hello: 'world'} & { cha : 'minjae'}
const andA : A = { hello: 'world', cha: "minjae"};
const andA2: A = { hello: 'world'}; // & 이라 타입 에러

// & 을 만족하면 | 도 만족하지만,,, type 정의가 완전 달라지니 주의하자
type B = { hello: 'world'} | { cha : 'minjae'}
const andB : B = { hello: 'world', cha: "minjae"};
const andB2: B = { hello: "world"}; // | 이라 타입 만족