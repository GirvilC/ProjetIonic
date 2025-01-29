import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { TaskManagerComponent } from '../task-manager/task-manager.component';
import { ValidationComponent } from '../validation/validation.component';
import config from 'capacitor.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  public TaskList: CustomTask[] = [];
  public isLoaded: boolean = false;

  constructor(private dialog: MatDialog, public tService: TaskService) {
  }

  public ngOnInit(): void {
    this.tService.getTasks().subscribe(tasks => {
      this.TaskList = tasks;
      this.isLoaded= true;
    });
  }

  //Fonction pour ouvrir la dialogue de création et ensuite envoie la requête à l'API
  public onCreateTask() {
    const dialogData: DialogTaskData = {
      customTask: new CustomTask(),
      isNew: true
    }
    const dialogRef = this.dialog.open(TaskManagerComponent, { disableClose: true, data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoaded = false;
        this.tService.createTask(result.customTask).subscribe(task => {
          this.TaskList.push(task);
          this.isLoaded = true;
        });
      }
    });
  }

  //Fonction pour ouvrir la dialogue pour mettre à jour une tâche et envoie la requête à l'API
  public onUpdateTask(task: CustomTask){
    const dialogData: DialogTaskData = {
      customTask: task,
      isNew: false
    }
    const dialogRef = this.dialog.open(TaskManagerComponent, { disableClose: true, data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoaded = false;
        this.tService.updateTask(result.customTask.id, result.customTask).subscribe(task => {
          this.isLoaded = true;
        });
      }
    });
  }

  //Fonction pour ouvrir la dialogue de confirmation de suppression de tâche puis supprime
  public onDeleteTask(id: number | undefined){
    const dialogRef = this.dialog.open(ValidationComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoaded = false;
        if(id){
          this.tService.deleteTask(id).subscribe(() => {
            this.TaskList = this.TaskList.filter(t => t.id !== id);
            this.isLoaded = true;
          })
        }
      }
    })
  }

}

//Class CustomTask
export class CustomTask {
  public id: number | undefined;
  public label: string = '';
  public description: string = '';
  public status: string = '';
  public limitDate: string = '';
  public lattitude: number | undefined;
  public longitude: number | undefined;
}

//Interface de données pour l'ajouter aux dialogues
export interface DialogTaskData {
  customTask: CustomTask;
  isNew: boolean
}