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

