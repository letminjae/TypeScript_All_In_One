// 타입 만들기 feat.제네릭
interface Arr<T> {
    forEach(callback: (item: T, index: number) => void): void;
    map<S>(callback: (v: T) => S): S[];
    filter<S extends T>(callback: (v: T) => v is S): S[];
}

const m: Arr<number> = [1,2,3];
m.forEach((item) => {
    console.log(item)
})

m.forEach((item) => {
    console.log(item);
    return '3';
})

const n: Arr<string> = ['1','2','3'];
n.forEach((item) => {
    console.log(item)
})

n.forEach((item) => {
    console.log(item);
    return '3';
})

const x: Arr<number> = [1,2,3];
const y = x.map((v) => v + 1); //[2, 3, 4]
const z = x.map((v) => v.toString()); // ['2','3','4']; string[];
const r = x.map((v) => v % 2 === 0); // [false, true, false] boolean[];

const F = x.filter((v): v is number => v % 2 === 0); // [2] number[];

const X : Arr<number | string> = [1, '2', 3, '4', 5];
const G = X.filter((v): v is string => typeof v === 'string'); // ['2','4'] string[];


//공변성과 반공변성, 이변성과 불변성
//함수간에 서로 대입할수 있냐 없냐?

function varience(x: string): number {
    return +x;
}
varience('1'); // 1

type Var = (x: string) => number | string; // 리턴값은 더넓은 타입으로 대입이 가능하다, 반대의 상황에서는 X
// 매개변수는 더 좁은 타입으로 대입 가능
const vari: Var = varience; //???????????????????


// 타입스크립트는 잘 까먹어서 변수를 지정해줘야할 때가 있다. as는 unknown 일때 쓰자, 웬만하면 쓰지말고.

interface Axios {
    get(): void;
}

interface CustomError extends Error {
    response?: {
        data : any;
    }
}

declare const axios : Axios;

(async () => {
    try {
        await axios.get();
    } catch (err: unknown){
        const customError = err as CustomError // 변수지정해서 as를 한번만 쓰게함
        console.error((customError).response?.data);
        customError.response?.data
    }
})();

//infer는 타입 내에서 추론된 값으로 다시 새로운 타입을 만드는 것(밑에 utility types 참고).
//타입스크립트는 건망증이 심하다
try {
  await axios.get();
} catch (err) {
  console.error(err.response?.data);
}

//유틸리티 타입스
interface Profile {
    name: string,
    age: number,
    married: boolean,
}

const minjaeCha: Profile = {
    name: 'minjaeCha',
    age: 29,
    married: false,
}

//파샬 : 타입(프로필)을 옵셔널로 만들어준다
const newMinjae: Partial<Profile> = {
    name: 'minjaeCha',
    age: 29,
}
type Partial<T> = {
    [P in keyof T]?: T[P];
};
//파셜은 좋은게아님. 옵셔널되면 헷갈리기때문. 그래서 Pick과 Omit을 쓴다.

//픽 : 알려진 타입만 지정
const newMinjaePick: Pick<Profile, 'name' | 'age'> = {
    name: 'minjaeCha',
    age: 29,
}
//Pick
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

//오밋 : 픽의 반대, 제외시킬 타입 지정
const newMinjaeOmit: Omit<Profile, 'married'> = {
    name: 'minjaeCha',
    age: 29,
}
//Omit
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;


interface optionalProfile {
    name?: string,
    age?: number,
    married?: boolean,
}

//Required : 누군가 타입이나 인터페이스를 옵셔널로 해놓았는데, 필수로 지정하고 싶을때
type Required<T> = {
    [P in keyof T]-?: T[P];
}; // -? : 모디파이어 = 옵셔널들을 전부 제거하라 라는 표시
const newMinjaeRequired: Required<optionalProfile> = {
    name: 'minjaeCha',
    age: 29,
    married: false,
}

//ReadOnly : 수정못하게 막고 싶음
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
const newMinjaeReadOnly: Readonly<Profile> = {
    name: 'minjaeCha',
    age: 29,
    married: false,
}
newMinjaeReadOnly.name = 'manjae'; // 읽기 전용속성 에러

//Record : 객체를 표현하는 한가지 방법
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
const R : Record<string, number> = { a: 3, b: 5, c: 8 };

//Exclude : 키를 제외
type Exclude<T, U> = T extends U ? never : T;
//Extract : 키를 추출 (Exclude의 반대 삼항연산자 확인)
type Extract<T, U> = T extends U ? T : never;

type Animal = 'Cat' | 'Dog' | 'Human';
type Mammal = Exclude<Animal, 'Human'>;
type Man = Extract<Animal, 'Human'>;

//NonNullable : 타입 또는 인터페이스에 null이나 undefined가 있을 때 null, undefined를 빼고 가져옴
type NonNullable<T> = T extends null | undefined ? never : T;
type nullAndUndefined = string | null | undefined | number | boolean;
type noneNullAndUndefined = NonNullable<nullAndUndefined>;

//Parameters : 함수에 있는 파라미터의 타입을 꺼내올수 있음
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never; // 인퍼 = 추론하다
function zip( x: number, y: string, z: boolean ) : {x : number, y: string, z: boolean} {
    return {x, y, z}
}
type Params = Parameters<typeof zip>;
type First = Params[0]

//ReturnType : 함수에 있는 리턴값의 타입을 꺼내올수 있음
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any; // 잘보면 Parameters의 인퍼 추론 위치만 바꿈
type Returns = ReturnType<typeof zip>;


//abstract new~ 를 보면 생성자 관련 타입스 인걸 알수 있다
class cons {
    a: string = "123";
    b: number = 123;
    c: boolean = true;
    constructor(a: string, b: number , c:boolean ) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
const c = new cons('123', 456, true);
//ConstructorParameters : constructor의 파라미터 타입을 꺼내올수 있음
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
type ConstructorParametersC = ConstructorParameters<typeof cons>

//InstanceType : instance의 타입을 꺼내올 수 있음
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
type I = InstanceType<typeof cons>
