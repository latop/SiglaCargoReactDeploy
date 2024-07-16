export interface ReleaseDriverInterface {
  saida: string;
  entrega: string;
  destino: string;
  demanda: string;
  motoristaPlan: string;
  veiculoPlan: string;
  motoristaLiberado?: boolean;
  veiculoLiberado?: boolean;
  dtCheckList?: Date;
  dtLiberacao?: Date;
  dailyTripSectionId: string;
}
