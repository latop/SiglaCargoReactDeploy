import { PaginationResponse } from "./pagination";

export interface Scenario {
  id: string;
  code: string;
  description: string;
  createAt: string;
  updateAt: string | null;
  userIdCreate: string | null;
  userIdUpdate: string | null;
  isDated: boolean;
  isDefault: boolean;
}

export interface ScenarioResponse extends PaginationResponse {
  scenarios: Scenario[];
}
