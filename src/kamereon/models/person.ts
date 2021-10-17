export interface IPerson {
  migrationCode: string;
  country: string;
  lastName: string;
  addresses: {
    country: string;
    createdDate: string;
    city: string;
    lastModifiedDate: string;
    addressType: string;
    postalCode: string;
    functionalCreationDate: string;
    addressLine1: string;
    addressLine2: string;
    functionalModificationDate: string;
    addressLine3: string;
    addressLine4: string;
  }[];
  myrRequest: boolean;
  civility: string;
  firstName2: string;
  phones: {
    phoneType: string;
    phoneValue: string;
    areaCode: string;
    createdDate: string;
    lastModifiedDate: string;
    functionalCreationDate: string;
    functionalModificationDate: string;
  }[];
  functionalModificationDate: string;
  type: string;
  locale: string;
  emails: {
    createdDate: string;
    emailType: string;
    lastModifiedDate: string;
    emailValue: string;
    functionalCreationDate: string;
    validityFlag: boolean;
    functionalModificationDate: string;
  }[];
  functionalCreationDate: string;
  childPersonsLinks: any[];
  lastName2: string;
  parentPersonsLinks: any[];
  partyId: string;
  mdmId: string;
  trackingId: string;
  preferredDealers: any[];
  lastModifiedDate: string;
  agreements: any[];
  stopCommunications: {
    stopCommunicationType: string;
    createdDate: string;
    lastModifiedDate: string;
    functionalCreationDate: string;
    functionalModificationDate: string;
    stopCommunicationValue: boolean;
  }[];
  firstName: string;
  createdDate: string;
  idp: {
    termsConditionLastAcceptanceDate: string;
    idpStatus: string;
    loginType: string;
    idpId: string;
    idpType: string;
    lastLoginDate: string;
    login: string;
    termsConditionAcceptance: boolean;
    termsConditionLastModificationDate: string;
  };
  personId: string;
  accounts: {
    accountStatus: string;
    relationType: string;
    accountId: string;
    country: string;
    accountType: string;
    externalId: string;
    personId: string;
  }[];
}
