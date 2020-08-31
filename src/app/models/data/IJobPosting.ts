import {INameAndID} from './INameAndID';
import {IRole} from './IRole';

export interface IJobPosting{
  id: number;
  posting: INameAndID;
  project: INameAndID;
  role: IRole;
  applicationsCount: number;
  hasApplied: boolean;
}
