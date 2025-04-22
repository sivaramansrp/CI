import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodospasosComponent } from './todos-pasos.component';

describe('TodospasosComponent', () => {
  let component: TodospasosComponent;
  let fixture: ComponentFixture<TodospasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodospasosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodospasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
