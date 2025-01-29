import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CustomTask, DialogTaskData } from '../home/home.page';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  standalone: false,
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent  implements OnInit {

  @ViewChild("taskForm", { static: true }) public taskForm!: NgForm;

  public customTask: CustomTask = new CustomTask();
  public errorMessage: string = '';
  public successMessage: string = '';

  constructor(public dialogRef: MatDialogRef<TaskManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogTaskData
  ) { }

  ngOnInit() {
    if(this.data.customTask) {
      this.customTask = this.data.customTask
    }
  }

  //Soumets une tâche à la validation
  public onSubmitTask() {
    if(this.customTask.label && this.customTask.description && this.customTask.limitDate && this.customTask.status){
      if(this.data.isNew){
        this.customTask.status = 'OnGoing';
      }
      this.data.customTask = this.customTask;
      this.dialogRef.close(this.data);
    } else {
      this.errorMessage = 'Fill all fields please';
    }
  }


  //Ferme la dialogue en abandonnant les données renseignées
  public onCancel() {
    this.dialogRef.close();
  }

  //Ajoute la localisation à la tâche
  public async addLocation() {
    try{
      const position = await Geolocation.getCurrentPosition();
      this.customTask.lattitude = position.coords.latitude;
      this.customTask.longitude = position.coords.longitude;
      this.successMessage = 'Location added';
    } catch (error) {
      this.errorMessage = "Impossible to get location"
      console.log('Erreur de géolocalisation : ', error)
    }
  }
}
