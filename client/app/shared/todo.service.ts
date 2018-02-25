import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private apiBaseUrl = 'http://localhost:8004/api/todos/';

  constructor(
    private http: HttpClient
  ) {}

  getTodos(): Promise<Todo[]> {
    return this.http.get<Todo[]>(this.apiBaseUrl).toPromise();
  }

  setTodoDone(todo: Todo, done: boolean): Promise<Todo> {
    return this.http.put<Todo>(
      this.apiBaseUrl + `${todo.id}/`,
      {
        'done': done
      }
    ).toPromise();
  }

  setTodoDescription(todo: Todo, description: string): Promise<Todo> {
    return this.http.put<Todo>(
      this.apiBaseUrl + `${todo.id}/`,
      {
        'description': description
      }
    ).toPromise();
  }

  deleteTodo(todo: Todo): Promise<boolean> {
    return this.http.delete<boolean>(this.apiBaseUrl + `${todo.id}/`).toPromise();
  }

  createTodo(description: string): Promise<Todo> {
    return this.http.post<Todo>(
      this.apiBaseUrl,
      {
        'description': description
      }
    ).toPromise();
  }
}
