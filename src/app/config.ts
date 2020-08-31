import { environment } from '../environments/environment';

export class Config{
  static backendURL = environment.backendUrl;
  static apiURL = environment.backendUrl + '/api';

  static pageSize = 20;

  static maxNumOfURLs = 5;
}
