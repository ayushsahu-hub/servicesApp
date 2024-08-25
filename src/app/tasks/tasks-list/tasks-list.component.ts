import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent]
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  taskService = inject(TasksService);
  tasks = computed(()=>{
    switch (this.selectedFilter()) {
      case 'all':
        return this.taskService.allTask();
      case 'open':
        return this.taskService.allTask().filter(task => task.status ==='OPEN'); 
      case 'in-progress':
        return this.taskService.allTask().filter(task => task.status ==='IN_PROGRESS');
      case 'done':
        return this.taskService.allTask().filter(task => task.status ==='DONE');
      default:
      return this.taskService.allTask();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
