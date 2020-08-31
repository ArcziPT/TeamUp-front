import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IJobPosting} from '../../../models/data/IJobPosting';
import {JobPostingService} from '../../../services/job-posting.service';
import {SearchResult} from '../../../models/data/SearchResult';
import {IJobApplication} from '../../../models/data/IJobApplication';
import {Config} from '../../../config';

@Component({
  selector: 'app-inspect-job-applications-dialog',
  templateUrl: './inspect-job-applications-dialog.component.html',
  styleUrls: ['./inspect-job-applications-dialog.component.css']
})
export class InspectJobApplicationsDialogComponent implements OnInit {

  public postingId: number;
  public posting: IJobPosting;

  public i = 0;
  public jobApplications: IJobApplication[];

  public currentPage = 0;
  public totalPages = 0;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private jobPostingService: JobPostingService) {
    this.postingId = data.postingId;

    this.jobPostingService.getJobPosting(this.postingId).subscribe(posting => this.posting = posting);
    this.jobPostingService.getApplications(this.postingId, 0).subscribe(apps => {
      this.totalPages = apps.totalPages;
      this.jobApplications = apps.result;
    });
  }

  private getNextPage(): void {
    this.jobPostingService.getApplications(this.postingId, this.currentPage).subscribe(apps => {
      this.jobApplications.concat(apps.result);
    });
  }

  ngOnInit(): void {
  }

  updateAppStatus(accepted: boolean): void {
    this.jobPostingService.updateApplicationStatus(this.postingId, this.jobApplications[this.i].id, accepted).subscribe(status => {
      if (status.status){
        alert(accepted ? 'Accepted!' : 'Declined!');
      }
    });
  }

  back(): void {
    if (this.i > 0) {
      this.i -= 1;
    }
  }

  next(): void {
    if (this.i === this.jobApplications.length - 1 && this.i < (Config.pageSize * this.totalPages)){
      this.currentPage += 1;
      this.getNextPage();
    }

    if (this.i < (Config.pageSize * this.totalPages)){
      this.i += 1;
    }
  }
}
