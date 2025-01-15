import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details.component';

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetailsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
