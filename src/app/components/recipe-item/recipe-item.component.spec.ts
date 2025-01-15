import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeItemComponent } from './recipe-item.component';
import { provideRouter } from '@angular/router';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
