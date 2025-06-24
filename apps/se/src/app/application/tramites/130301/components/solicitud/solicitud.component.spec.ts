import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { of } from 'rxjs';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockService: Partial<SolicitudProrrogaService>;

  beforeEach(async () => {
    mockService = {
      obtenerFormDatos: jest.fn().mockReturnValue(of({
        data: [
          {
            folio: '12345',
            fechaInicio: '2023-01-01',
            estatusSolicitud: 'Pendiente',
            folioResolucion: '67890',
          },
        ],
      })),
    };

    await TestBed.configureTestingModule({
      imports: [SolicitudComponent, ReactiveFormsModule],
      providers: [
        { provide: SolicitudProrrogaService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.solicitudForm.value).toEqual({
      folio: '',
      fechaInicio: '',
      estatusSolicitud: '',
      folioResolucion: '',
    });
  });

  it('should call ngOnDestroy and complete destroyNotifier$', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});
