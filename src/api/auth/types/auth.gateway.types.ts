import type { IUser } from '@/types/models/user';

export namespace IAuthGateway {
  export namespace SignIn {
    export interface Params {
      username: string
      phone: number | string
    }

    export type ApiResponse = IUser.Model[] | undefined
  }
}
