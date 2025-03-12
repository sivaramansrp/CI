import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarSolicitudComponent } from './capturar-solicitud.component';

describe('CapturarSolicitudComponent', () => {
  let component: CapturarSolicitudComponent;
  let fixture: ComponentFixture<CapturarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturarSolicitudComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice with default value 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change indice value when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});