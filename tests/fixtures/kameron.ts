import { IPerson } from '../../src';

export const personOkData: IPerson = {
  personId: 'person-id-1',
  type: 'I',
  country: 'FR',
  civility: '1',
  firstName: 'firstName',
  lastName: 'lastName',
  idp: {
    idpId: 'idpId',
    idpType: 'GIGYA',
    idpStatus: 'ACTIVE',
    login: 'email@email.com',
    loginType: 'EMAIL',
    lastLoginDate: '2020-11-16T11:43:52Z',
    termsConditionAcceptance: true,
    termsConditionLastAcceptanceDate: '2019-04-29T20:39:37.153608Z',
    termsConditionLastModificationDate: '2019-04-29T20:39:37.153608Z',
  },
  emails: [
    {
      emailType: 'MAIN',
      emailValue: 'email@email.com',
      validityFlag: true,
      createdDate: '2019-04-29T20:39:37.162651Z',
      lastModifiedDate: '2019-04-29T20:39:37.162654Z',
      functionalCreationDate: '2019-04-29T20:39:37.162651Z',
      functionalModificationDate: '2019-04-29T20:39:37.162654Z',
    },
  ],
  phones: [
    {
      phoneType: 'MOBILE',
      phoneValue: 'phoneValue',
      areaCode: '33',
      createdDate: '2019-06-17T09:47:14.745555Z',
      lastModifiedDate: '2019-06-17T09:47:14.745730Z',
      functionalCreationDate: '2019-06-17T09:47:14.745555Z',
      functionalModificationDate: '2019-06-17T09:47:14.745730Z',
    },
  ],
  myrRequest: false,
  accounts: [
    {
      accountId: 'account-id-1',
      accountType: 'MYRENAULT',
      accountStatus: 'ACTIVE',
      country: 'FR',
      personId: 'person-id-1',
      relationType: 'OWNER',
      externalId: 'externalId',
    },
    {
      accountId: 'account-id-2',
      externalId: 'externalId',
      accountType: 'SFDC',
      accountStatus: 'ACTIVE',
      country: 'FR',
      personId: 'person-id-1',
      relationType: 'OWNER',
    },
  ],
  partyId: 'partyId',
  mdmId: 'mdmId',
  createdDate: '2019-04-29T20:39:37.163635Z',
  lastModifiedDate: '2020-11-16T11:43:57.658639Z',
  functionalCreationDate: '2019-04-29T20:39:37.162578Z',
  functionalModificationDate: '2020-11-16T11:29:48.631544Z',
  locale: 'locale',
  migrationCode: 'migrationCode',
  childPersonsLinks: [],
  lastName2: 'lastName2',
  parentPersonsLinks: [],
  trackingId: 'trackingId',
  preferredDealers: [],
  agreements: [],
  firstName2: 'firstName2',
  addresses: [],
  stopCommunications: [],
};
