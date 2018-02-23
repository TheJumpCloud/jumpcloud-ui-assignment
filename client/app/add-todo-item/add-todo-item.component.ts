import { Component, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.css']
})
export class AddTodoItemComponent {
  @Output() created = new EventEmitter<Todo>();
  @ViewChild('newDescriptionInput') input: ElementRef;
  isEditable = true;
  description = '';
  hasError = false;

  constructor(
      private todoService: TodoService,
      private renderer: Renderer
  ) { }

  addItem = () => {
    let reenableInput = () => {
      this.isEditable = true;
      setTimeout(() => {
        console.log(this.input);
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
      }, 5);
    };

    this.isEditable = false;
    this.hasError = false;
    this.todoService.createTodo(this.description).then((newTodo) => {
      this.created.emit(newTodo);
      this.description = '';
      reenableInput();
    }).catch((error) => {
      this.hasError = true;
      reenableInput();
      console.log(error);
    });
  }

}
