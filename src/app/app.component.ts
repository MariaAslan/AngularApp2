import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from './task';
import { TruncatePipe } from './truncate.pipe';
import { TaskCompletedDirective } from './task-completed.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    DatePipe,
    TruncatePipe,
    TaskCompletedDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Angular supplies the shared service through dependency injection.
  private readonly taskService = inject(TaskService);

  // The template uses async pipe to subscribe and unsubscribe automatically.
  readonly tasks$ = this.taskService.tasks$;

  title = '';
  description = '';
  dueDate = '';
  priority: Task['priority'] = 'Medium';
  error = '';

  // Validates the form and sends the new task to the service.
  addTask(): void {
    if (!this.title.trim() || !this.dueDate) {
      this.error = 'Please enter a task title and due date.';
      return;
    }

    this.taskService.addTask({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority
    });

    this.title = '';
    this.description = '';
    this.dueDate = '';
    this.priority = 'Medium';
    this.error = '';
  }

  // Delegates completion changes to the service.
  toggleCompleted(id: number): void {
    this.taskService.toggleCompleted(id);
  }
}