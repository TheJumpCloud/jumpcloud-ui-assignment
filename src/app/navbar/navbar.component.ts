import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'navbar-field',
    templateUrl: 'navbar.component.html',
    
})
export class NavbarComponent {
    public isCollapsed = true;

    toggleMenu() {
       this.isCollapsed = !this.isCollapsed;
     }
}