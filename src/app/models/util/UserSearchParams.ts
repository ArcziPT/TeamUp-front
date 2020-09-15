export class UserSearchParams{
  username: string;
  projects: string[];
  skills: string[];

  constructor() {
    this.username = '';
    this.projects = [];
    this.skills = [];
  }

}
