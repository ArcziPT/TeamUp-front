import {INameAndID} from './INameAndID';

export interface IJobApplication{
  id: number;
  posting: INameAndID;
  user: INameAndID;
  status: string;
}
