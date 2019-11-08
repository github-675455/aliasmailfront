import { ApiError } from './api-error';

export class LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  errors: ApiError[];
}
