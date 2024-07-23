import type { IAuthGateway } from '@/api/auth/types';

export class AuthGateway {
  public static async getUsers(): Promise<IAuthGateway.SignIn.ApiResponse> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
