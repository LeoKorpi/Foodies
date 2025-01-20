import { Component, Input, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconChangeCircleComponent } from '../icons/icon-change-circle.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IconChangeCircleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  viewState = signal<'Visitor' | 'Admin'>('Visitor');

  @Input() loginVisible!: Signal<boolean>;

  toggleView() {
    this.viewState.update((state) =>
      state === 'Visitor' ? 'Admin' : 'Visitor'
    );
  }
}
