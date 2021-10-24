import { IAccountJWT, IAccountLogin, IGigyaJWTPayload } from '../../src';

export const accountLoginDataOK: IAccountLogin = {
  callId: 'callId',
  errorCode: 0,
  apiVersion: 1,
  statusCode: 200,
  statusReason: 'OK',
  time: '2020-01-01T01:01:01.000Z',
  registeredTimestamp: 1609459261,
  UID: 'UID',
  UIDSignature: 'UIDSignature',
  signatureTimestamp: '1635083716',
  created: '2018-07-19T02:50:32.012Z',
  createdTimestamp: 1609459261,
  isActive: true,
  isRegistered: true,
  isVerified: true,
  lastLogin: '2020-01-01T01:01:01.000Z',
  lastLoginTimestamp: 1609459261,
  lastUpdated: '2020-01-01T01:01:01.000Z',
  lastUpdatedTimestamp: 1609459261000,
  loginProvider: 'site',
  oldestDataUpdated: '2020-01-01T01:01:01.000Z',
  oldestDataUpdatedTimestamp: 1609459261000,
  profile: {
    firstName: 'firstName',
    lastName: 'lastName',
    country: 'country',
    email: 'test@test.com',
  },
  registered: '2020-01-01T01:01:01.000Z',
  socialProviders: 'site',
  verified: '2020-01-01T01:01:01.000Z',
  verifiedTimestamp: 1609459261000,
  newUser: false,
  sessionInfo: {
    cookieName: 'cookieLoginTokenName',
    cookieValue: 'cookieLoginTokenValue',
  },
};

export const accountJWTOkData: IAccountJWT = {
  callId: 'callId',
  errorCode: 0,
  apiVersion: 2,
  statusCode: 200,
  statusReason: 'OK',
  time: '2020-01-01T01:01:01.000Z',
  ignoredFields: '',
  id_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGlLZXkiLCJpYXQiOjE1Nzc4NDA0NjEsImV4cCI6NDczMzUxNDA2MSwiYXVkIjoiIiwic3ViIjoic3ViIiwiYXBpS2V5IjoiYXBpS2V5IiwiZGF0YS5wZXJzb25JZCI6IjIxYjc4NjRkLWU3MTItNDQxZS1hY2UwLWRkZjgxOTM2YTM0YSIsImRhdGEuZ2lneWFEYXRhQ2VudGVyIjoiZXUxLmdpZ3lhLmNvbSJ9.vtTIr9H6iOgnYKyZ1QLNc-LyjnFiU2GB_AfxDoAoJL4',
};

export const gigyaJWTPayloadOkData: IGigyaJWTPayload = {
  iss: 'apiKey',
  iat: 1577840461,
  exp: 4733514061,
  aud: '',
  sub: 'sub',
  apiKey: 'apiKey',
  personId: '21b7864d-e712-441e-ace0-ddf81936a34a',
  gigyaDataCenter: 'eu1.gigya.com',
};
