/**
 * 状态码
 */
export enum Status {
    normalOk = 0, // 正常返回
    normalWARN = 999999, // 服务错误码
    normalERROR = 1, // 业务异常
}

/**
 * 返回信息类型
 */
export enum Type {
    normalOk = 'SUCCESS',
    normalErr = 'ERROR',
    normalWarn = 'WARN',
}

export enum Message {
    normalOk = "成功",
    normalErr = "错误",
    normalWarn = "异常"
}