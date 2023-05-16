export type IApiError = {
  code: string;
  error: string;
  description: string;
};

export type IErrorLimit = {
  limitType: string;
  limitValue?: number;
};
