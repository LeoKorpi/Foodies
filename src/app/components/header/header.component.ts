import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  viewState = signal<'Visitor' | 'Admin'>('Visitor');

  toggleView() {
    this.viewState.update((state) =>
      state === 'Visitor' ? 'Admin' : 'Visitor'
    );
  }
}
