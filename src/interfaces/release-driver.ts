export interface ReleaseDriverInterface {
  saida: string;
  entrega: string;
  destino: string;
  demanda: string;
  motoristaPlan: string;
  veiculoPlan: string;
  motoristaLiberado: boolean;
  veiculoLiberado?: boolean;
  dtCheckList?: Date;
  dtLiberacao?: Date;
  dailyTripSectionId: string;
}

export interface ReleaseDriverResponse {
  hasNext: boolean;
  currentPage: number;
  drivers: ReleaseDriverInterface;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
}
