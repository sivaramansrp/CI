import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasSeleccionadasFormComponent } from './mercancias-seleccionadas-form.component';

describe('MercanciasSeleccionadasFormComponent', () => {
  let component: MercanciasSeleccionadasFormComponent;
  let fixture: ComponentFixture<MercanciasSeleccionadasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercanciasSeleccionadasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasSeleccionadasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
