import { z } from "zod";

// Base schemas for nested objects
const FleetGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // Add other FleetGroup properties as needed
});

const LineSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // Add other Line properties as needed
});

const LocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // Add other Location properties as needed
});

const TripTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // Add other TripType properties as needed
});

const StopTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // Add other StopType properties as needed
});

const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // Add other Company properties as needed
});

const JustificationSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  // Add other Justification properties as needed
});

const TruckSchema = z.object({
  id: z.string().uuid(),
  licensePlate: z.string(),
  serialNumber: z.string(),
  integrationCode: z.string(),
  // Add other Truck properties as needed
});

// DailyTripSection schema
const DailyTripSectionSchema = z.object({
  id: z.string().uuid().optional(),
  createAt: z.string().datetime().nullable().optional(),
  updateAt: z.string().datetime().nullable().optional(),
  userIdCreate: z.string().uuid().nullable().optional(),
  userIdUpdate: z.string().uuid().nullable().optional(),
  dailyTripId: z.string().uuid(),
  section: z.number().int(),
  locationOrigId: z.string().uuid(),
  locationOrig: LocationSchema.optional(),
  locationDestId: z.string().uuid(),
  locationDest: LocationSchema.optional(),
  startPlanned: z.string().datetime(),
  endPlanned: z.string().datetime(),
  startActual: z.string().datetime().nullable().optional(),
  endActual: z.string().datetime().nullable().optional(),
  startEstimated: z.string().datetime().nullable().optional(),
  endEstimated: z.string().datetime().nullable().optional(),
  truckId: z.string().uuid().nullable().optional(),
  truck: TruckSchema.optional(),
  flgStatus: z.string(),
  notes: z.string().nullable().optional(),
  stopTypeId: z.string().uuid().nullable().optional(),
  stopType: StopTypeSchema.optional(),
  locationGroupId: z.string().uuid().nullable().optional(),
});

// Main DailyTrip schema
export const DailyTripSchema = z.object({
  id: z.string().uuid().optional(),
  createAt: z.string().datetime().nullable().optional(),
  updateAt: z.string().datetime().nullable().optional(),
  userIdCreate: z.string().uuid().nullable().optional(),
  userIdUpdate: z.string().uuid().nullable().optional(),
  tripNumber: z.string().min(1),
  tripDate: z.string().datetime(),
  fleetGroupId: z.string().uuid().nullable().optional(),
  fleetGroup: FleetGroupSchema.optional(),
  flgStatus: z.string().min(1),
  notes: z.string().nullable().optional(),
  lineId: z.string().uuid().nullable().optional(),
  line: LineSchema.optional(),
  dt: z.string().nullable().optional(),
  sto: z.string().nullable().optional(),
  locationOrigId: z.string().uuid().nullable().optional(),
  locationOrig: LocationSchema.optional(),
  locationDestId: z.string().uuid().nullable().optional(),
  locationDest: LocationSchema.optional(),
  startPlanned: z.string().datetime().nullable().optional(),
  endPlanned: z.string().datetime().nullable().optional(),
  startActual: z.string().datetime().nullable().optional(),
  endActual: z.string().datetime().nullable().optional(),
  startEstimated: z.string().datetime().nullable().optional(),
  endEstimated: z.string().datetime().nullable().optional(),
  tripTypeId: z.string().uuid().nullable().optional(),
  tripType: TripTypeSchema.optional(),
  stopTypeId: z.string().uuid().nullable().optional(),
  stopType: StopTypeSchema.optional(),
  companyId: z.string().uuid().nullable().optional(),
  company: CompanySchema.optional(),
  justificationId: z.string().uuid().nullable().optional(),
  justification: JustificationSchema.optional(),
  justificationMessage: z.string().nullable().optional(),
  locationGroupId: z.string().uuid().nullable().optional(),
  dailyTripSections: z.array(DailyTripSectionSchema).nullable().optional(),
});

// Schema for the complete request body
export const DailyTripRequestSchema = z.object({
  dailyTrip: DailyTripSchema,
  dailyTripSections: z.array(DailyTripSectionSchema).optional(),
});

// Type exports
export type DailyTrip = z.infer<typeof DailyTripSchema>;
export type DailyTripSection = z.infer<typeof DailyTripSectionSchema>;
export type DailyTripRequest = z.infer<typeof DailyTripRequestSchema>;
