import axios, { AxiosResponse } from 'axios';

class APIBase {
  protected baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_POKE_API || 'http://localhost:8000/api';
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private getHeaders(): { [key: string]: string } {
    // In case we have an access token
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    }

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    return headers;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      const errorDetails = {
        status: error.response.status,
        message: error.response?.data?.message || error.message
      }
      throw errorDetails;
    }
  }

  // TODO: Here the missing methods will be added

}

export default APIBase;