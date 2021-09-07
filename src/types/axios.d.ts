
export interface RespResult<T = any> {
    code: number;
    msg?: string;
    data?: string;
    list?: T;
    pager?: {
      total: number,
      page: number,
      size: number,
    }
  }