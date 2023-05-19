type ID = string;
type Email = string;
type Store = any;

type Nullable<T> = null | T;

type RequestData<D, E = unknown> = [true, E] | [false, D];

type PromiseRequestData<T, E = unknown> = Promise<RequestData<T, E>>;

type int = number;

type IsAny<T> = 0 extends 1 & T ? true : T;
type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K];
};
type IsEmptyObject<T extends Record<PropertyKey, unknown>> = [keyof T] extends [never] ? true : false;

type ObjectKeys<T> = IsAny<T> extends true
  ? string[]
  : T extends object
  ? IsEmptyObject<KnownKeys<T>> extends true
    ? string[]
    : (keyof KnownKeys<T>)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

type ObjectValues<T> = IsAny<T> extends true
  ? any
  : T extends object
  ? IsEmptyObject<KnownKeys<T>> extends true
    ? unknown
    : KnownKeys<T>[keyof KnownKeys<T>][]
  : T extends Array<any>
  ? T[number]
  : T extends number
  ? []
  : T extends string
  ? string[]
  : never;

type ObjectEntries<T extends object> = T extends object
  ? { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E
    ? E extends [infer K, infer V]
      ? K extends string | number
        ? [`${K}`, V]
        : never
      : never
    : never
  : never;

declare global {
  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
    values<T>(o: T): ObjectValues<T>;
    entries<T>(o: T): ObjectEntries<T>;
  }
}

