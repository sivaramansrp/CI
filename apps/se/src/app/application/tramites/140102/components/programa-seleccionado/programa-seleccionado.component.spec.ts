import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramaSeleccionadoComponent } from './programa-seleccionado.component';

describe('ProgramaSeleccionadoComponent', () => {
  let component: ProgramaSeleccionadoComponent;
  let fixture: ComponentFixture<ProgramaSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaSeleccionadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramaSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
