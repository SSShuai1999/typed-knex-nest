import { HttpCodeStatus, HttpMsgStatus, HttpStatus } from './enum';

export type HttpRetStruct = {
  data: any;
  code: HttpStatus;
  message: HttpMsgStatus;
};

// 返回的结构体
export const HttpRetStruct = (struct: HttpRetStruct) => {
  return {
    data: struct.data,
    code: struct.code,
    message: struct.message,
  };
};

HttpRetStruct({
  data: {},
  code: HttpStatus.ACCEPTED,
  message: HttpMsgStatus.PARTIAL_CONTENT,
});

export const HttpRetError = (code: HttpCodeStatus, errorMessage?: string) => {
  return HttpRetStruct({
    data: null,
    code: HttpStatus[code],
    //@ts-expect-error
    message: errorMessage || HttpMsgStatus[code],
  });
};

// 请求成功
export const HttpRetSuccess = (data: any) => {
  return HttpRetStruct({
    data: data,
    code: HttpStatus[HttpCodeStatus.OK],
    message: HttpMsgStatus[HttpCodeStatus.OK],
  });
};
