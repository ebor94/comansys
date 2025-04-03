export interface LoginCredentials {
  usuario: string;
  codvend: string;
  password: string;
}

export interface UserParameter {
  parid: string;
  parva: string;
  partxt: string;
}

export interface LoginResponse {
  succes: boolean;
  token: string;
  data: UserParameter[];
}