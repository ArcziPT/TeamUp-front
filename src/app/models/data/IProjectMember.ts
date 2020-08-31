import {INameAndID} from './INameAndID';
import {IRole} from './IRole';

export interface IProjectMember{
  user: INameAndID;
  project: INameAndID;
  role: IRole;
  admin: boolean;
}
