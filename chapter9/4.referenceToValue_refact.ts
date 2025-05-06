
// TelephoneNumber 클래스 (값 객체)
class TelephoneNumber {
    private _areaCode;
    private _number;

    constructor(areaCode, number) {
        this._areaCode = areaCode;
        this._number = number;
        Object.freeze(this); // 불변 객체로 만듦
    }

    get areaCode() {
        return this._areaCode;
    }

    get number() {
        return this._number;
    }

    toString() {
        return `(${this._areaCode}) ${this._number}`;
    }

    equals(other) {
        return (
            other instanceof TelephoneNumber &&
            this.areaCode === other.areaCode &&
            this.number === other.number
        );
    }
}

// Person 클래스
class Person {
    private _name;
    private _telephoneNumber;

    constructor(name, telephoneNumber) {
        this._name = name;
        this._telephoneNumber = telephoneNumber;
    }

    get name() {
        return this._name;
    }

    get telephoneNumber() {
        return this._telephoneNumber.toString();
    }

    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }

    get officeNumber() {
        return this._telephoneNumber.number;
    }

    set officeAreaCode(arg) {
        console.log(this.officeNumber);
        this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }

    set officeNumber(arg) {
        this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
    }
}

// 🔍 테스트
const phone = new TelephoneNumber('02', '1234-5678');
const person = new Person('홍길동', phone);

// console.log(person.name); // 홍길동
// console.log(person.telephoneNumber); // (02) 1234-5678

// 전화번호 수정
person.officeAreaCode = '031';
person.officeNumber = '9876-5432';

console.log(person.telephoneNumber); // (031) 9876-5432

// 원래 phone 객체는 그대로 유지됨
console.log(phone.toString()); // (02) 1234-5678
console.log(phone)