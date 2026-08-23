export interface User {
  id: number;
  name: string;
  email: string;
}

export interface IotTelematic {
  id?: number;
  car_id: number;
  latitude: number;
  longitude: number;
  fuel_level: number;
  engine_status: string;
  raw_payload?: Record<string, unknown> | null;
  recorded_at?: string;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  category: string;
  price_per_day: number;
  status: string;
  specs?: Record<string, unknown>;
  latest_telematics?: IotTelematic;
}

export interface Booking {
  id: number;
  user_id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  total_cost: number;
  status: string;
  car?: Car;
}

export interface AuthResponse {
  token: string;
  user: User;
}
