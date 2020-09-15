export class PostingSearchParams{
  title: string;
  project: string;
  roleName: string;
  departments: string[];

  constructor() {
    this.title = '';
    this.project = '';
    this.roleName = '';
    this.departments = [];
  }
}
