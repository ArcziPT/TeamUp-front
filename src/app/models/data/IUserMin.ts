import {INameAndID} from './INameAndID';

export interface IUserMin{
  user: INameAndID;
  skills: string[];
  rating: number;
  briefDescription: string;
}
