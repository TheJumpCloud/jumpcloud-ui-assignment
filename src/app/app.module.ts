import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoItemListComponent } from './components/todo-item-list/todo-item-list.component';
import { TodoItemFormComponent } from './components/todo-item-form/todo-item-form.component';
import { TodoService } from './services/todo.service';
import { ConfirmModalComponent } from './components/ui-controls/custom-confirm-modal/confirm.component';
import { NavbarComponent } from './components/ui-controls/navbar/navbar.component';
import { HeroComponent } from './components/ui-controls/hero/hero.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoItemListComponent,
    TodoItemFormComponent,
    ConfirmModalComponent,
    NavbarComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
