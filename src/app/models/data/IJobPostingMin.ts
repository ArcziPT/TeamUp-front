import {INameAndID} from './INameAndID';
import {IRole} from './IRole';

export interface IJobPostingMin{
  title: string;
  project: INameAndID;
  role: IRole;
}
