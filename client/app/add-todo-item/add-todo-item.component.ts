import { Component, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../models/todo';

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
      private todoService: TodoService,
      private renderer: Renderer
  ) { }

  addItem = () => {
    if (!this.description) {
      return;
    }

    let reenableInput = () => {
      this.isEditable = true;
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
      }, 5);
    };

    this.isEditable = false;
    this.todoService.createTodo(this.description).then((newTodo) => {
      this.created.emit(newTodo);
      this.description = '';
      reenableInput();
    }).catch((error) => {
      reenableInput();
    });
  }

}
