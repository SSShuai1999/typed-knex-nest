export const isArray = (o: any): o is Array<any> =>
  Object.prototype.toString.call(o) === '[object Array]';
export const isObject = (o: any): o is Record<string, any> =>
  Object.prototype.toString.call(o) === '[object Object]';
export const isFunction = (o: any): o is Function =>
  Object.prototype.toString.call(o) === '[object Function]';
export const isNull = (o: any) => o === null;
export const isUndefined = (o: any) => o === undefined;
export const isString = (o: any) => typeof o === 'string';
export const isNumber = (o: any) => typeof o === 'number' && !Number.isNaN(o);
export const isBoolean = (o: any) => o.toString() === 'true' || o.toString() === 'false';
export const isGT1 = (o: any[]) => o.length >= 1;
export const isSafe = <A>(o: A | undefined): o is A => !!o;
