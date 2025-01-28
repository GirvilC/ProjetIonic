import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskManagerComponent } from './task-manager/task-manager.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  public TaskList: CustomTask[] = [];
  public isLoaded: boolean = false;

  constructor(private dialog: MatDialog) {
    const cTask: CustomTask = {
      label: 'Georges',
      description: 'Wouhouhouhou',
      status: 'OnGoing',
      limitDate: 'Demain'
    }
    this.TaskList.push(cTask);
    this.TaskList.push(cTask);
    this.isLoaded = true
  }

  public ngOnInit(): void {
    
  }

  public onCreateTask() {
    const dialogData: DialogTaskData = {
      customTask: new CustomTask(),
      isNew: true
    }
    const dialogRef = this.dialog.open(TaskManagerComponent, { disableClose: true, data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoaded = false;
        this.TaskList.push(result.customTask);
        setTimeout(() => {
          this.isLoaded = true
        }, 50);
      }
    });
  }

}


export class CustomTask {
  public label: string = '';
  public description: string = '';
  public status: string = '';
  public limitDate: string = '';
}

export interface DialogTaskData {
  customTask: CustomTask;
  isNew: boolean
}