import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();
  isUpdating = false;
  isEditable = false;
  description = '';

  constructor(
      private todoService: TodoService
  ) { }

  ngOnInit() {
    this.description = this.todo.description;
  }

  toggleCheckbox = () => {
    this.isUpdating = true;
    this.todoService.setTodoDone(this.todo, !this.todo.done).then((newTodo) => {
      this.update.emit(newTodo);
      this.isUpdating = false;
    });
  }

  editDescription = () => {
    this.isEditable = true;
  }

  saveDescription = () => {
    this.isEditable = false;
    this.isUpdating = true;
    this.todoService.setTodoDescription(this.todo, this.description).then((newTodo) => {
      this.update.emit(newTodo);
      this.isUpdating = false;
    }).catch((error) => {
      this.isEditable = true;
      console.log(error);
    });
  }

  deleteTodo = () => {
    this.isUpdating = true;
    this.todoService.deleteTodo(this.todo).then(() => {
      this.delete.emit(this.todo);
    });
  }
}
