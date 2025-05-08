import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasTramiteComponent } from './tareas-tramite.component';

describe('TareasTramiteComponent', () => {
  let component: TareasTramiteComponent;
  let fixture: ComponentFixture<TareasTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasTramiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TareasTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
