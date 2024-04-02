export interface Driver {
  driverId: string;
  name: string;
  lastName: string;
  nickName: string;
  registration: string;
  seniority: number;
  identification: string;
  genre: string;
  birthdate: string;
  driverBase: string;
  driverSubBase: string;
  admission: string;
  resign: string | null;
  address: string;
  zipCode: string;
  district: string;
  cityId: string;
  stateId: string;
  countryId: string;
  email: string;
  phone1: string;
  phone2: string;
  note: string;
  isActive: boolean;
  integrationCode: string;
  integrationCodeGPS: string;
  urlPhoto: string | null;
  password: string | null;
}

export interface Position {
  code: string;
  description: string;
  id: string;
  priority: number;
}
