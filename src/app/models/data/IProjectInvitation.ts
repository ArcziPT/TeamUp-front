import {INameAndID} from './INameAndID';
import {IRole} from './IRole';

export interface IProjectInvitation{
  id: number;
  project: INameAndID;
  role: IRole;
  user: INameAndID;
  status: string;
}
