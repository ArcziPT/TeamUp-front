import {Component, Input, OnInit} from '@angular/core';
import {INameAndID} from '../../../models/data/INameAndID';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ProjectService} from '../../../services/project.service';
import {map, startWith} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.css']
})
export class ProjectSelectionComponent implements OnInit {

  @Input() public userId: number;
  @Input() public selectedProjects: INameAndID[];

  public options: INameAndID[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getManagedProjects(this.userId).subscribe(projects => this.options = projects);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.myControl.valueChanges.subscribe(value => {
      const found = this.options.find(option => option.name === value.toString());

      if (typeof found !== 'undefined') {
        this.selectedProjects[0] = found;
      } else {
        this.selectedProjects[0] = null;
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.map(option => option.name).filter(option => option.toLowerCase().includes(filterValue));
  }
}
