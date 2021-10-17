export interface IVehicles {
  accountId: string;
  country: string;
  vehicleLinks: {
    connectedDriver: {
      role: string;
      createdDate: string;
      lastModifiedDate: string;
    };
    createdDate: string;
    vehicleDetails: {
      firstRegistrationDate: string;
      engineEnergyType: string;
      engineType: string;
      connectivityTechnology: string;
      engineRatio: string;
      battery: { code: string; label: string; group: string };
      registrationCountry: { code: string };
      retrievedFromDhs: boolean;
      easyConnectStore: boolean;
      assets: {
        assetRole?: string;
        description?: string;
        title?: string;
        renditions: {
          resolutionType?: string;
          url: string;
        }[];
        assetType: string;
      }[];
      vcd: string;
      registrationDate: string;
      vin: string;
      model: { code: string; label: string; group: string };
      gearbox: { code: string; label: string; group: string };
      deliveryDate: string;
      brand: { label: string };
      energy: { code: string; label: string; group: string };
      modelSCR: string;
      yearsOfMaintenance: number;
      tcu: { code: string; label: string; group: string };
      electrical: boolean;
      radioCode: string;
      version: { code: string };
      rlinkStore: boolean;
      navigationAssistanceLevel: { code: string; label: string; group: string };
      registrationNumber: string;
      deliveryCountry: { code: string; label: string };
      family: { code: string; label: string; group: string };
      radioType: { code: string; label: string; group: string };
    };
    garageBrand: string;
    lastModifiedDate: string;
    cancellationReason: {};
    vin: string;
    linkType: string;
    brand: string;
    startDate: string;
    ownershipStartDate: string;
    status: string;
  }[];
}

export interface IVehicleLocation {
  gpsLongitude: number;
  id: string;
  gpsLatitude: number;
  lastUpdateTime: string;
}
