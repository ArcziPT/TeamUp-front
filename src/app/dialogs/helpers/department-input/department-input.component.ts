import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {INameAndID} from '../../../models/data/INameAndID';
import {ProjectService} from '../../../services/project.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-department-input',
  templateUrl: './department-input.component.html',
  styleUrls: ['./department-input.component.css']
})
export class DepartmentInputComponent implements OnInit{

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  departmentCtrl = new FormControl();
  filteredDepartments: Observable<string[]>;
  @Input() chosenDepartments: string[];
  @Input() projectId: number;
  departments: INameAndID[];

  @ViewChild('departmentInput') departmentInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getDepartments(this.projectId).subscribe(departments => this.departments = departments);

    this.filteredDepartments = this.departmentCtrl.valueChanges.pipe(
      map((department: string | null) => department ? this._filter(department) : this.departments.map(dep => dep.name).slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const i = this.departments.findIndex(dep => dep.name === value.trim().toString());
      this.chosenDepartments.push(this.departments[i].name);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.departmentCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.chosenDepartments.findIndex(dep => dep === fruit);

    if (index >= 0) {
      this.chosenDepartments.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const i = this.departments.findIndex(dep => dep.name === event.option.viewValue.toString());
    this.chosenDepartments.push(this.departments[i].name);
    this.departmentInput.nativeElement.value = '';
    this.departmentCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departments.filter(dep => dep.name.toLowerCase().indexOf(filterValue) === 0).map(dep => dep.name);
  }
}
