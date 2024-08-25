import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService { 
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);
  allTask = this.tasks.asReadonly();
  constructor() { }

  addTask(taskData:{title:string,description:string}){
    const newTask:Task = {
      ...taskData,
      id: Math.random().toString(),
      status:'OPEN'
    }
    this.tasks.update(oldTask=>{
      return [...oldTask, newTask];
    });
    this.loggingService.log(`task added with the title ${newTask.title}`);
  }

  updateTaskStatus(taskId:string,newStatus:TaskStatus){
    this.tasks.update((oldTasks)=> oldTasks.map(task => task.id === taskId ? {...task, status:newStatus} : task));
    this.loggingService.log(`change task status to ${newStatus}`);
  }
}
