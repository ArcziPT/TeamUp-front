import {IRole} from './IRole';

export interface IProjectInvitationCreate {
  projectName: string;
  username: string;
  role: IRole;
}
