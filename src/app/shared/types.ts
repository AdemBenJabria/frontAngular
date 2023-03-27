export interface LoginRequest {
    email: string;
    password: string;
}

export enum IFilterParam {
    NO_FILTER = '',
    RETURNED_ONLY = 'true',
    NOT_RETURNED_ONLY = 'false'
}