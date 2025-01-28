import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomTask, DialogTaskData } from '../home.page';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  standalone: false,
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent  implements OnInit {

  @ViewChild("taskForm", { static: true }) public taskForm!: NgForm;

  public customTask: CustomTask = new CustomTask();

  constructor(public dialogRef: MatDialogRef<TaskManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogTaskData
  ) { }

  ngOnInit() {
    if(this.data.isNew) {

    }
  }

  public onSubmitTask() {
    this.customTask.status = 'OnGoing';
    this.customTask.limitDate = 'Demain';
    this.data.customTask = this.customTask;
    this.dialogRef.close(this.data);
  }


  public onCancel() {
    this.dialogRef.close();
  }
}
