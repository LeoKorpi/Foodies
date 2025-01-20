import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeContactComponent } from './about-me-contact.component';

describe('AboutMeContactComponent', () => {
  let component: AboutMeContactComponent;
  let fixture: ComponentFixture<AboutMeContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
