export interface LoginFields {
  email?: string;
  password?: string;
}

export interface RegisterFields extends Partial<LoginFields> {
  username?: string;
}

export interface DecodedJWT {
  /**
   * **sub is 'id' of the user**
   */
  sub: string;
  email: string;
  username: string;
}

export interface LoginAndRegisterResponse {
  token: string;
}
