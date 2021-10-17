export interface IAccountLogin {
  socialProviders: string;
  sessionInfo: { cookieValue: string; cookieName: string };
  lastLogin: string;
  isVerified: boolean;
  errorCode: number;
  registered: string;
  UIDSignature: string;
  isActive: boolean;
  oldestDataUpdatedTimestamp: number;
  lastUpdated: string;
  apiVersion: number;
  statusReason: string;
  verifiedTimestamp: number;
  oldestDataUpdated: string;
  callId: string;
  lastUpdatedTimestamp: number;
  created: string;
  createdTimestamp: number;
  profile: {
    firstName: string;
    lastName: string;
    country: string;
    email: string;
  };
  verified: string;
  registeredTimestamp: number;
  loginProvider: string;
  signatureTimestamp: string;
  lastLoginTimestamp: number;
  UID: string;
  newUser: boolean;
  isRegistered: boolean;
  time: string;
  statusCode: number;
}

export interface IAccountJWT {
  callId: string;
  apiVersion: number;
  statusReason: string;
  ignoredFields: string;
  // eslint-disable-next-line camelcase
  id_token: string;
  errorCode: number;
  time: string;
  statusCode: number;
}
