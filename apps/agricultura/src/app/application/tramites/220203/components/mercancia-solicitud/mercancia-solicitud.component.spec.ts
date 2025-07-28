import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciaSolicitudComponent } from './mercancia-solicitud.component';
import { provideHttpClient } from '@angular/common/http';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { of } from 'rxjs';

// Mock service
const mockService = {
  obtenerDetallesDelCatalogo: jest.fn(() => of({ data: [] })),
  obtenerDatos: jest.fn(() => of({ selectedmercanciaGroupDatos: {} })),
};

describe('MercanciaSolicitudComponent', () => {
  let component: MercanciaSolicitudComponent;
  let fixture: ComponentFixture<MercanciaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercanciaSolicitudComponent], // ✅ import standalone component here
      providers: [
        { provide: ImportacionDeAcuiculturaService, useValue: mockService },
        provideHttpClient(), // ✅ optional if component uses HttpClient directly
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MercanciaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the mercanciaGroup form with required controls', () => {
    expect(component.mercanciaGroup.contains('tipoRequisito')).toBeTruthy();
    expect(component.mercanciaGroup.contains('requisito')).toBeTruthy();
  });
});
