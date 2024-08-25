import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // if we add private modifier to any variable then it is not accessible in the template.
  constructor(private tasksService:TasksService){}

  onAddTask(title: string, description: string) {
    this.formEl()?.nativeElement.reset();
    this.tasksService.addTask({title,description});
  }
}
