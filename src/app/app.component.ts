import { Component, NgZone, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'blog-project';
  loginVisible = signal(true);
  mobileMaxWidth: number = 430;

  constructor(private viewportRuler: ViewportRuler, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.updateLoginVisible();

    this.viewportRuler
      .change(100)
      .subscribe(() => this.ngZone.run(() => this.updateLoginVisible()));
  }

  private updateLoginVisible(): void {
    let isSmallDisplay =
      this.viewportRuler.getViewportSize().width < this.mobileMaxWidth;
    this.loginVisible.set(!isSmallDisplay);
  }
}
