export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  thumbnailUrl?: string;
}

export interface Rental {
  id: string;
  carId: string;
  userId: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  totalPriceCents: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
}

export interface Telematics {
  vehicleId: string;
  latitude: number;
  longitude: number;
  speedKph?: number;
  batteryLevelPercent?: number;
  timestamp: string; // ISO
}
