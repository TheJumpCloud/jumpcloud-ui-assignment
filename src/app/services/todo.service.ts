import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class TodoService {
    todosUrl = 'http://localhost:8004/api/todos';
    constructor(private http: HttpClient) {}
    
    /** GET all todos */
    getTodos (): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.todosUrl)
            .pipe(
                tap(todos => console.log('fetched todo Items')),
                catchError(this.handleError('getTodos', []))
            );
    }

    /** GET single todo-item by id. Will 404 if id not found */
    getTodo(id: number): Observable<Todo> {
        const url = `${this.todosUrl}/${id}`;
        return this.http.get<Todo>(url).pipe(
            tap(_ => console.log(`fetched todo id=${id}`)),
            catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.todosUrl, todo, httpOptions)
        .pipe(
            tap((todo: Todo) => console.log(`added todo item with id=${todo.id}`)),
            catchError(this.handleError<Todo>('addTodo'))
        );
    }

    /** DELETE: delete the todo item on the server */
    deleteTodo (todo: Todo | number): Observable<Todo> {
        const id = typeof todo === 'number' ? todo : todo.id;
        const url = `${this.todosUrl}/${id}`;

        return this.http.delete<Todo>(url, httpOptions).pipe(
        tap(_ => console.log(`deleted todo item id=${id}`)),
        catchError(this.handleError<Todo>('deleteTodo'))
        );
    }

    /** PUT: update the todo item on the server */
    updateTodo (todo: Todo): Observable<any> {
        const id = typeof todo === 'number' ? todo : todo.id;
        const url = `${this.todosUrl}/${id}`;
        return this.http.put(url, todo, httpOptions).pipe(
        tap(_ => console.log(`updated todo id=${todo.id}`)),
        catchError(this.handleError<any>('updateTodo'))
        );
    }

    /* Get todos by boolean done */
    toggleTodosByDone (done: boolean): Observable<Todo[]> {
        return this.http.get<Todo[]>(`this.todosUrl?done=${done}`).pipe(
        tap(_ => console.log(`found heroes matching "${done}"`)),
        catchError(this.handleError<Todo[]>('toggleTodosByDone', []))
        );    
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // Ideally, we'd send the error to remote logging infrastructure
        console.error(error); // for now, log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

}