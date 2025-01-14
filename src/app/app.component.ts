import { Component, NgZone, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'blog-project';

  loginVisible = signal(true);

  constructor(private viewportRuler: ViewportRuler, private ngZone: NgZone) {
    this.viewportRuler
      .change(100)
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.ngZone.run(() => {
          var isMobile = this.viewportRuler.getViewportSize().width < 400;
          this.loginVisible.update(() => !isMobile);
        })
      );
  }
}
