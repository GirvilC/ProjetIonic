import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomTask } from './home/home.page';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl: string = "http://localhost:3500/tasks";

  constructor(private http: HttpClient) { }

  //Récupérer toutes les tâches
  public getTasks(): Observable<CustomTask[]> {
    return this.http.get<CustomTask[]>(this.apiUrl);
  }

  //Récupère une tâche via l'id
  public getTaskById(id: number): Observable<CustomTask> {
    return this.http.get<CustomTask>(`${this.apiUrl}/${id}`);
  }

  //Créer une tâche
  public createTask(task: CustomTask): Observable<CustomTask> {
    return this.http.post<CustomTask>(this.apiUrl, task);
  }

  //Met à jour une tâche
  public updateTask(id: number, task: CustomTask): Observable<CustomTask> {
    return this.http.put<CustomTask>(`${this.apiUrl}/${id}`, task);
  }

  //Supprime une tâche
  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
