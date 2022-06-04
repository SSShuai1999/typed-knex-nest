export enum HttpStatus {
  OK = 200, //成功响应
  CREATED = 201, // 该请求已成功，并因此创建了一个新的资源。这通常是在POST请求，或是某些PUT请求之后返回的响应。
  ACCEPTED = 202, // 请求已经接收到，但还未响应，没有结果
  PARTIAL_CONTENT = 206, // 服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。
  AMBIGUOUS = 300, // 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。
  MOVED_PERMANENTLY = 301, //被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一
  FOUND = 302, // 请求的资源现在临时从不同的 URI 响应请求。
  SEE_OTHER = 303, // 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。
  NOT_MODIFIED = 304, // 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。
  BAD_REQUEST = 400, // 语义有误，当前请求无法被服务器理解；请求参数有误。
  UNAUTHORIZED = 401, // 当前请求需要用户验证。
  FORBIDDEN = 403, // 服务器已经理解请求，但是拒绝执行它。
  NOT_FOUND = 404, // 请求失败，请求所希望得到的资源未被在服务器上发现。
  METHOD_NOT_ALLOWED = 405, // 请求行中指定的请求方法不能被用于请求相应的资源
  PROXY_AUTHENTICATION_REQUIRED = 407, //与401响应类似，只不过客户端必须在代理服务器上进行身份验证。
  REQUEST_TIMEOUT = 408, // 请求超时
  CONFLICT = 409, // 由于和被请求的资源的当前状态之间存在冲突，请求无法完成。
  INTERNAL_SERVER_ERROR = 500, // 服务器遇到了不知道如何处理的情况。
  NOT_IMPLEMENTED = 501, // 此请求方法不被服务器支持且无法被处理。
  BAD_GATEWAY = 502, // 此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。
  SERVICE_UNAVAILABLE = 503, // 服务器没有准备好处理请求。
  GATEWAY_TIMEOUT = 504, // 当服务器作为网关，不能及时得到响应时返回此错误代码。
  HTTP_VERSION_NOT_SUPPORTED = 505, // 服务器不支持请求中所使用的HTTP协议版本。
}

export enum HttpCodeStatus {
  OK = 'OK', //成功响应
  CREATED = 'CREATED', // 该请求已成功，并因此创建了一个新的资源。这通常是在POST请求，或是某些PUT请求之后返回的响应。
  ACCEPTED = 'ACCEPTED', // 请求已经接收到，但还未响应，没有结果
  PARTIAL_CONTENT = 'PARTIAL_CONTENT', // 服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。
  AMBIGUOUS = 'AMBIGUOUS', // 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。
  MOVED_PERMANENTLY = 'MOVED_PERMANENTLY', //被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一
  FOUND = 'FOUND', // 请求的资源现在临时从不同的 URI 响应请求。
  SEE_OTHER = 'SEE_OTHER', // 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。
  NOT_MODIFIED = 'NOT_MODIFIED', // 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。
  BAD_REQUEST = 'BAD_REQUEST', // 语义有误，当前请求无法被服务器理解；请求参数有误。
  UNAUTHORIZED = 'UNAUTHORIZED', // 当前请求需要用户验证。
  FORBIDDEN = 'FORBIDDEN', // 服务器已经理解请求，但是拒绝执行它。
  NOT_FOUND = 'NOT_FOUND', // 请求失败，请求所希望得到的资源未被在服务器上发现。
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED', // 请求行中指定的请求方法不能被用于请求相应的资源
  PROXY_AUTHENTICATION_REQUIRED = 'PROXY_AUTHENTICATION_REQUIRED', //与401响应类似，只不过客户端必须在代理服务器上进行身份验证。
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT', // 请求超时
  CONFLICT = 'CONFLICT', // 由于和被请求的资源的当前状态之间存在冲突，请求无法完成。
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', // 服务器遇到了不知道如何处理的情况。
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED', // 此请求方法不被服务器支持且无法被处理。
  BAD_GATEWAY = 'BAD_GATEWAY', // 此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE', // 服务器没有准备好处理请求。
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT', // 当服务器作为网关，不能及时得到响应时返回此错误代码。
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP_VERSION_NOT_SUPPORTED', // 服务器不支持请求中所使用的HTTP协议版本。
}

export enum HttpMsgStatus {
  OK = '成功响应', //成功响应
  CREATED = '该请求已成功，并因此创建了一个新的资源。这通常是在POST请求，或是某些PUT请求之后返回的响应。', // 该请求已成功，并因此创建了一个新的资源。这通常是在POST请求，或是某些PUT请求之后返回的响应。
  ACCEPTED = '请求已经接收到，但还未响应，没有结果', // 请求已经接收到，但还未响应，没有结果
  PARTIAL_CONTENT = '服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。, // 服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。',
  AMBIGUOUS = '被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。', // 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。
  BAD_REQUEST = '语义有误，当前请求无法被服务器理解；请求参数有误。', // 语义有误，当前请求无法被服务器理解；请求参数有误。
  UNAUTHORIZED = '当前请求需要用户验证。', // 当前请求需要用户验证。
  FORBIDDEN = '服务器已经理解请求，但是拒绝执行它。', // 服务器已经理解请求，但是拒绝执行它。
  NOT_FOUND = '请求失败，请求所希望得到的资源未被在服务器上发现。', // 请求失败，请求所希望得到的资源未被在服务器上发现。
  METHOD_NOT_ALLOWED = '请求行中指定的请求方法不能被用于请求相应的资源', // 请求行中指定的请求方法不能被用于请求相应的资源
  INTERNAL_SERVER_ERROR = '服务器遇到了不知道如何处理的情况。', // 服务器遇到了不知道如何处理的情况。
}

export enum Bool {
  'Y' = 'Y',
  'N' = 'N',
}

export enum Gender {
  'Male' = '男',
  'FeMal' = '女',
}

export enum BizStatus {
  'DRK' = '待入库',
  'ZK' = '在库',
  'YCK' = '已出库',
}

export enum NameTypDispatch {
  'PS' = '配送',
  'ZT' = '自提',
}

export enum RecentOprType {
  '3PLXTTS' = '3PL系统推送',
  'RGDR' = '人工导入',
  'GYLXTTS' = '供应链系统推送',
  'JS' = '拒收',
  'RKCX' = '入库撤销',
  'ZKDRK' = '转库待入库',
  'JGDRK' = '加工待入库',
  'JGTKDRK' = '加工退库(部)待入库',
  'RK' = '入库',
  'TK' = '退库',
  'ZKRK' = '转库入库',
  'JGRK' = '加工入库',
  'JGTK' = '加工退库 (整)',
  'JGTKRK' = '加工退库(部)入库',
  'CK' = '出库',
  'ZKCK' = '转库出库',
  'JGCK' = '加工出库',
}

export enum GenerateCodeType {
  'FHJH' = '发货计划',
  'PCJH' = '配车计划',
}
