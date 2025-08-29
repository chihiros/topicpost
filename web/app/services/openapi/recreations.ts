// Temporary recreation API types and functions until OpenAPI client is working
export interface Recreation {
  id: number;
  title: string;
  description?: string;
  target_age_min?: number;
  target_age_max?: number;
  participant_count_min?: number;
  participant_count_max?: number;
  duration_minutes?: number;
  required_items?: string;
  rules: string;
  tips?: string;
  prefecture?: string;
  category: string[];
  location_type: 'indoor' | 'outdoor';
  image_url?: string;
  poster_name?: string;
  created_at: string;
  updated_at: string;
}

export interface RecreationRequest {
  title: string;
  description?: string;
  target_age_min?: number;
  target_age_max?: number;
  participant_count_min?: number;
  participant_count_max?: number;
  duration_minutes?: number;
  required_items?: string;
  rules: string;
  tips?: string;
  prefecture?: string;
  category: string[];
  location_type: 'indoor' | 'outdoor';
  image_url?: string;
  poster_name?: string;
}

export interface RecreationListResponse {
  data: Recreation[];
  total: number;
  page: number;
  per_page: number;
  message: string;
}

export interface RecreationResponse {
  data: Recreation;
  message: string;
}

// Recreation API functions
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.topicpost.net' 
  : 'http://localhost:8080';

export class RecreationApi {
  async getRecreations(params: {
    page?: number;
    per_page?: number;
    category?: string[];
    location_type?: string;
    prefecture?: string;
    q?: string;
    sort?: string;
  } = {}): Promise<RecreationListResponse> {
    const url = new URL(`${API_BASE_URL}/v1/recreations`);
    
    if (params.page) url.searchParams.set('page', params.page.toString());
    if (params.per_page) url.searchParams.set('per_page', params.per_page.toString());
    if (params.category) {
      params.category.forEach(cat => url.searchParams.append('category', cat));
    }
    if (params.location_type) url.searchParams.set('location_type', params.location_type);
    if (params.prefecture) url.searchParams.set('prefecture', params.prefecture);
    if (params.q) url.searchParams.set('q', params.q);
    if (params.sort) url.searchParams.set('sort', params.sort);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch recreations: ${response.statusText}`);
    }
    return response.json();
  }

  async getRecreation(id: number): Promise<RecreationResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/recreations/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recreation: ${response.statusText}`);
    }
    return response.json();
  }

  async createRecreation(recreation: RecreationRequest): Promise<RecreationResponse> {
    const response = await fetch(`${API_BASE_URL}/v1/recreations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recreation),
    });
    if (!response.ok) {
      throw new Error(`Failed to create recreation: ${response.statusText}`);
    }
    return response.json();
  }
}