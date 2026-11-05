import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Stores the current task list and emits each update.
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  // Components observe task changes without modifying the subject.
  readonly tasks$ = this.tasksSubject.asObservable();

  private nextId = 1;

  // Creates a task and publishes a new array.
  addTask(data: Omit<Task, 'id' | 'completed'>): void {
    const title = data.title.trim();

    if (!title) {
      return;
    }

    const task: Task = {
      ...data,
      title,
      description: data.description.trim(),
      id: this.nextId++,
      completed: false
    };

    this.tasksSubject.next([
      ...this.tasksSubject.value,
      task
    ]);
  }

  // Toggles completion without changing the existing task objects.
  toggleCompleted(id: number): void {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    this.tasksSubject.next(updatedTasks);
  }
}