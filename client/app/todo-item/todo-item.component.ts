import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';

import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();
  @ViewChild('descriptionInput') input: ElementRef;
  isUpdating = false;
  isEditable = false;
  description = '';

  constructor(
    private renderer: Renderer,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.description = this.todo.description;
  }

  toggleCheckbox = () => {
    this.isUpdating = true;
    this.todoService.setTodoDone(this.todo, !this.todo.done).then((newTodo) => {
      this.update.emit(newTodo);
    }).catch((error) => {
      alert(`Unable to save item. Please try again.\n${error}`);
    }).finally(() => {
      this.isUpdating = false;
    });
  }

  editDescription = () => {
    this.isEditable = true;
    // Wait until input becomes enabled again before highlighting.
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    }, 5);
  }

  saveDescription = () => {
    this.isEditable = false;
    this.isUpdating = true;
    this.todoService.setTodoDescription(this.todo, this.description).then((newTodo) => {
      this.update.emit(newTodo);
    }).catch((error) => {
      alert(`Unable to save item. Please try again.\n${error}`);
      this.isEditable = true;
    }).finally(() => {
      this.isUpdating = false;
    });
  }

  deleteTodo = () => {
    this.isUpdating = true;
    this.todoService.deleteTodo(this.todo).then(() => {
      this.delete.emit(this.todo);
    }).catch((error) => {
      alert(`Unable to delete item. Please try again.\n${error}`);
      this.isUpdating = false;
    });
  }
}
