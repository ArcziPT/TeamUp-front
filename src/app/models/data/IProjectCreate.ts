import {IRole} from './IRole';

export interface IProjectCreate{
  name: string;
  briefDescription: string;
  description: string;
  role: IRole;
  urls: string[];
}
