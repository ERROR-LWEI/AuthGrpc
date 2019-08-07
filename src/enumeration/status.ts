/**
<<<<<<< HEAD
 * 正常状态码
 */
export enum SuccessStatus {
    normalOk = 1,
    normalErr = -1,
}

/**
 * 返回信息类型
 */
export enum ResType {
    normalOk = 'SUCCESS',
    normalErr = 'ERROR',
}

/**
 * 程序异常
=======
 *  10段状态为应用异常
 *  20段状态为业务异常
>>>>>>> 4957faa56a5871e08e17524f7cb52665675b5fcf
 */
export enum WarnStatus {
    addwarn = 1001,
    biwarn = 2002, // 业务异常
}

/**
<<<<<<< HEAD
 * 程序错误状态
=======
 *  30 段为应用错误
 *  40 段为业务错误
>>>>>>> 4957faa56a5871e08e17524f7cb52665675b5fcf
 */
export enum ErrorStatus {
    apperror = 3001, // 应用错误
    bierror = 4002, // 业务异常
}