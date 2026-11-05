import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTaskCompleted]',
  standalone: true
})
export class TaskCompletedDirective {
  @Input() appTaskCompleted = false;

  // Updates the task appearance when its completion state changes.
  @HostBinding('style.text-decoration')
  get textDecoration(): string {
    return this.appTaskCompleted ? 'line-through' : 'none';
  }

  @HostBinding('style.opacity')
  get opacity(): string {
    return this.appTaskCompleted ? '0.6' : '1';
  }
}