import type { SafeParseSuccess } from 'zod';
import * as AllEnum from '../constants/enum';
import type { AllCheckTypeKeys, EnumString } from '../typings';
import { isNull } from './';
import { isArray, isBoolean, isNumber, isObject, isString, isUndefined } from './is';

export const checkSignleList = {
  Array: (o: unknown) => isArray(o),
  Number: (o: unknown) => isNumber(o),
  String: (o: unknown) => isString(o),
  Object: (o: unknown) => isObject(o),
  Boolean: (o: unknown) => isBoolean(o),
};

type CSL = keyof typeof checkSignleList;

export const checkType = (value: CSL, type: 'Single' | 'Multple' | 'Enum' | 'Optional') => {
  if (type === 'Single') {
    if (!isUndefined(checkSignleList[value])) {
      return true;
    } else {
      return false;
    }
  }

  if (type === 'Multple') {
    if (value.startsWith('[') && !value.startsWith('[?,') && value.endsWith(']')) {
      return true;
    } else {
      return false;
    }
  } else if (type === 'Enum') {
    if (value.startsWith('Enum:')) {
      return true;
    } else {
      return false;
    }
  } else if (type === 'Optional') {
    if (value.startsWith('[?,') && value.endsWith(']')) {
      return true;
    } else {
      return false;
    }
  }
};

// 检查是否是 「 单一 」 类型
export const checkIsSignleType = (value: CSL) => {
  return checkType(value, 'Single');
};

// 检查是否是 「 多 」 类型
export const checkIsMultpleType = (value: CSL) => {
  return checkType(value, 'Multple');
};

// 检查是否是 「 枚举 」 类型
export const checkIsEnumType = (value: CSL) => {
  return checkType(value, 'Enum');
};

// 检查是否是 「 可选 」 类型
export const checkIsOptionalType = (value: any): value is EnumString => {
  return checkType(value, 'Optional')!;
};

export const checkBodyColumns = (
  columnsTyep: Record<string, AllCheckTypeKeys>,
  body: any,
): boolean => {
  const entries = Object.entries(columnsTyep);

  return entries.every((item) => {
    const [k, v] = item;
    const bodyKey = body[k];

    // 如果是 「 单一 」 类型
    if (checkIsSignleType(v as CSL)) {
      //@ts-expect-error
      return checkSignleList[v](bodyKey);
    }

    // 如果是 「 多 」 类型
    else if (checkIsMultpleType(v as CSL)) {
      const start = v.indexOf('[') + 1;
      const end = v.lastIndexOf(']');
      const valueMap = v.slice(start, end).split(',');

      return valueMap.some((si: any) => {
        return checkBodyColumns({ [k]: si }, { [k]: bodyKey });
      });
    }

    // 如果是 「 枚举 」 类型
    else if (checkIsEnumType(v as CSL)) {
      try {
        return v
          .split(`Enum:`)[1]
          .split('|')
          .some((item) => {
            const fixPreItem = item.trimStart().trimEnd();

            // 如果是已经存在的枚举
            //@ts-expect-error
            if (AllEnum[item]) {
              //@ts-expect-error
              const enumValues = Object.values(AllEnum[item]);
              if (enumValues.includes(bodyKey)) {
                return true;
              } else {
                return false;
              }
            }

            // 我们应该判断是否是 true 和 false
            else if (checkIsTrueOrFalse(fixPreItem, bodyKey)) {
              const FS = fixPreItem.toString();
              const BS = bodyKey.toString();

              return FS === BS;
            } else if (fixPreItem === bodyKey) {
              return true;
            } else if (Number(fixPreItem) === Number(bodyKey)) {
              return true;
            }
          });
      } catch (err) {
        throw new Error(`格式错误 >>> ${err}`);
      }
    }

    // 如果是 「 可选 」 类型
    else if (checkIsOptionalType(v)) {
      try {
        return checkNullOrSpecificType(body, k, v);
      } catch (err) {
        throw new Error(`格式错误 >>> ${err}`);
      }
    }
  });
};

// 可选或者具体类型
export const checkNullOrSpecificType = (body: any, k: string, value: EnumString) => {
  try {
    const bodyKey = body[k];
    const type = value.split('[?,')[1].split(']')[0] as AllCheckTypeKeys;

    if (
      isUndefined(bodyKey) ||
      isNull(bodyKey) ||
      checkBodyColumns({ [k]: type }, { [k]: bodyKey })
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    throw new Error(`解析错误 >>> ${err}`);
  }
};

export const checkIsTrueOrFalse = (fixPreItem: string, bodyKey: string) => {
  const FS = fixPreItem.toString();
  const BS = bodyKey.toString();

  if (FS.toString() === 'true' || FS.toString() === 'false') {
    return true;
  } else if (BS.toString() === 'true' || BS.toString() === 'false') {
    return true;
  } else {
    return false;
  }
};

export const checkZodParamsIsSafe = (result: any): result is SafeParseSuccess<typeof result> => {
  if (result.success) {
    return true;
  } else {
    return false;
  }
};
