import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/components/topBar/topBar.component';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent],
  standalone: true,
  templateUrl: './app.html',
})
export class App {
  private store = inject(Store);
  constructor() {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
