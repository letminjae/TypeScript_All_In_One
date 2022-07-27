// void : 아무것도 없이 공허함을 뜻하는 타입, return할 자료가 없는 함수의 타입
// return 방지 장치를 주고 싶을 때 사용하는 타입

//그런데.....
interface Human {
    talk : () => void;
}

const human : Human = {
    talk() { return 'abc'; }
}

// 이건 왜됨?!
// 메서드의 void와, callback의 void와, 함수에서 선언한 return값 void는 다 다르다
// 하지만 타입이 이상해지기에 void는 return을 줄때는 쓰지말자

//실전 예시
//declare : 외부에서 만들어진 코드를 타입선언할 때
declare function forEach(arr: number[], callback: (el: number) => void) : void; //callback void, return void

let target: number[] = [];
forEach([1, 2, 3], el => { target.push(el) });
forEach([1, 2, 3], el => target.push(el));

// unknown과 any의 차이점
// any는 타입선언을 포기하는것
// unknown은 당장 타입을 모르겠고 나중에 타입을 알때 사용, 직접 타입을 정해줘야함
try {
    console.log("hi")
} catch (error) {
    (error as Error).message //error는 대표적인 unknown
}

// 타입가드!

function numOrStr(a : number | string) {
    if(typeof a === 'string'){ // 타입가드, 타입이 string 이라면! 이라고 조건 정의 해줌
        a.split(',')
    } else { // else로 타입스크립트가 number라고 인식
        a.toFixed(1);
    }
}

numOrStr('123');
numOrStr(1);

function numOrNumArray(a : number | number[]) {
    if(Array.isArray(a)){ // 타입가드, 타입이 array라면! 이라고 조건 정의 해줌
        a.concat(4)
    } else { // else로 타입스크립트가 number라고 인식
        a.toFixed(1);
    }
}

// class의 타입정의
class classA {
    aaa() {}
}
class classB {
    bbb() {}
}

function aOrB(param : classA | classB) {
    if(param instanceof classA) {
        param.aaa();
    }
}

aOrB(new classA());
aOrB(new classB());

// 객체를 쓸때는 무조건 타입을 걸어놓는 습관을 지니자
const minjae = { type: 'minjae' };

if(a.type === 'minjae'){
    console.log("hello minjae")
}

// return값에 is가 들어 있는 경우가 있는데, 이 경우는 custom 타입가드 이다.

interface Cat { meow: number }
interface Dog { bow: number }
function catOrDog(a: Cat | Dog): a is Dog { //a의 타입이 Dog
    //타입 판별을 직접 만들기
    if ((a as Cat).meow) { return false } // a가 Cat 타입이라면 return false ㅇㅇ 맞는말
    return true
}

function pet(a: Cat | Dog){
    if(catOrDog(a)){ // 커스텀 타입가드 사용
        console.log(a.bow)
    }
    if('meow' in a) { // 기본적 JS 조건문 타입가드 사용
        console.log(a.meow)
    }
}

//readonly에 대해
interface readonlyA {
    readonly a: string;
    b: string;
}
// 속성 바꾸는 것을 막아줌
const aaaa: A = { a: 'hello', b: 'world' };

// implements : 구현하다. interface에 맞춰 class 구현

interface impleA {
    readonly a : string;
    b: string;
    c : string;
}

class impleB implements impleA {
    private a: string = '123'; // 클래스B안에 있어야 사용 가능, 밖에서는 못씀
    protected b: string = 'world'; // 마찬가지로 클래스B안에 있어야 사용 가능, 밖에서는 못씀, 상속클래스에서는 사용가능
    public c: string = "hi" // 퍼블릭, 그냥 c와 같음 다쓸수있음
}

class impleC extends impleB {}
new impleC().a;
new impleC().b;
new impleC().c;

//                  public                      protected                 private
//클래스 내부          O                            O                        O
//인스턴스             O                            X                        X 
//상속 클래스          O                            O                        X


// 옵셔널 : 있어도 되고 없어도 된다
function abc(a : number, b?: number, c?: number) {}
abc(1)
abc(1,2)
abc(1,2,3)

let optionalObj : {
    a: string,
    b?: string
} = { a: 'hello', b: 'world'}

optionalObj = { a: "hello" }

//---------------------------------------------------- 220728 -----------------------------------------

//제네릭은 왜 필요한가??

function unionAdd(x: string | number, y: string | number) : string | number { return x + y };

// unionAdd(1, "2"), unionAdd("1", 2) 가 될 가능성이 있기에 unionAdd 함수는 잘못되었다.

// 안되게 하려면??? 방법을 고안하다 타입스크립트는 제네릭을 만들었고, 제네릭을 사용해야 해결가능
// 지금 현재 타입이 무엇인지는 모르겠으나 나중에 정할 수 있게 만듬
// 제네릭 사용법 = 꺽쇠 사용해서 타입을 꺽쇠 안 문자로 만들어준다

function genericAdd<T>(x : T, y: T): T {
    return x + y
};

genericAdd(1, 2);
genericAdd("1", "2");

// T가 같은 타입인건 알겠는데,, 그럼 이럴때는?
genericAdd(true, false); //같은 불린이라 타입은 맞지만 리턴값은 ???

// 이런것을 방지하기 위해 우리는 제네릭에 조건을 걸수 있다 => extends 사용!
function genericAdd2<V extends string | number>(x: V, y: V) : V {
    return x + y
}

// 제네릭 실전예제
interface genericArray<K> {
    forEach(callbackfn : (value : K, index : number, array: K[]) => void, thisArg? : any) : void;
    //결국 forEach는 forEach(callbackfn, thisArg) 인데 타입 설정을 해놓아서 복잡할 뿐, 모든 제네릭은 잘 찾아서 타입만 추론한다면 쉽고 편리한 기능이다
}

[1,2,3].forEach((value) => { console.log(value) }); // 1,2,3 number 타입 감지
['1','2','3'].forEach((value) => { console.log(value) }); // '1','2','3' string 타입 감지
[true,false,true].forEach((value) => { console.log(value) }); // boolean 타입 감지
['123',123,true].forEach((value) => { console.log(value) }); // string, number, boolean 타입 감지


