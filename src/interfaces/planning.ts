import { Line } from "./daily-trip";
import { PaginationResponse } from "./pagination";

export interface Scenario {
  id: string | null;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  createAt: string;
  updateAt: string | null;
  userIdCreate: string | null;
  userIdUpdate: string | null;
  isDated: boolean;
  isDefault: boolean;
}

export interface ScenarioCapacity {
  scenarioId: string;
  lineId: string;
  line: Line;
}

export interface ScenarioResponse extends PaginationResponse {
  scenarios: Scenario[];
}
