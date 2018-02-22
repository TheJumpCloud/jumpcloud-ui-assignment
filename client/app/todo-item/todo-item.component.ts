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
  isUpdating = false;

  constructor(
      private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  toggleCheckbox = () => {
    this.isUpdating = true;
    this.todoService.setTodoDone(this.todo, !this.todo.done).then((newTodo) => {
      this.update.emit(newTodo);
      this.isUpdating = false;
    });
  }

}
