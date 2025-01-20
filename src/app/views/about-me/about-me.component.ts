import { Component } from '@angular/core';
import { AboutMeInfoComponent } from '../../components/about-me-info/about-me-info.component';
import { AboutMeContactComponent } from '../../components/about-me-contact/about-me-contact.component';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeInfoComponent, AboutMeContactComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {}
