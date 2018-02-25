import { Component, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';

import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent {
  @Output() created = new EventEmitter<Todo>();
  @ViewChild('newDescriptionInput') input: ElementRef;
  isEditable = true;
  description = '';

  constructor(
    private renderer: Renderer,
    private todoService: TodoService
  ) {}

  addItem = () => {
    if (!this.description) {
      return;
    }

    this.isEditable = false;
    this.todoService.createTodo(this.description).then((newTodo) => {
      this.created.emit(newTodo);
      this.description = '';
    }).finally(() => {
      this.isEditable = true;
      // Need to wait a digest cycle before trying to re-focus input.
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
      }, 5);
    });
  }
}
