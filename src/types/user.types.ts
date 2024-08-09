import { IMovie } from "./movie.types"
import { IReview } from "./review.types"

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface IUser {
    id:string
    name:string
    email:string
    avatarPath:string
    role:UserRole
    isHasPremium:boolean
    favorites: IMovie[]
    createdAt:any
    reviews:IReview[] | null
}

export interface IUserEditInput  {
  name?:string
  role?:UserRole
  avatarPath?:string,
  isHasPremium?:boolean | string
}
