import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { of, BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

// Usamos BehaviorSubject para mantener el estado
const stateSubject = new BehaviorSubject<any>({});

const mockSolicitudDatosService = {
  getDatosConsulta: jest.fn().mockImplementation(() => of({})),
  actualizarEstadoFormulario: jest.fn()
};

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockConsultaioQuery: any;

  beforeEach(async () => {

    mockConsultaioQuery = {
      selectConsultaioState$: of({ update: true }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PasoUnoComponent],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    
    // Inicializar el componente correctamente
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Resetear el estado entre pruebas
    stateSubject.next({});
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario al cargar', () => {
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('folioDeDesistimiento')).toBeTruthy();
    expect(component.solicitudForm.get('folioOriginal')).toBeTruthy();
    expect(component.solicitudForm.get('folioDeDesistimiento')?.disabled).toBe(true);
    expect(component.solicitudForm.get('folioOriginal')?.disabled).toBe(true);
  });

  it('debería cambiar la pestaña activa', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
    
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('debería mostrar contenido solo cuando esDatosRespuesta es true', () => {
    component.esDatosRespuesta = false;
    component.indice = 2;
    fixture.detectChanges();
    
    let contenido = fixture.debugElement.query(By.css('app-solicitud-datos'));
    expect(contenido).toBeNull();

    component.esDatosRespuesta = true;
    fixture.detectChanges();
    
    contenido = fixture.debugElement.query(By.css('app-solicitud-datos'));
    expect(contenido).toBeTruthy();
  });

  it('debería manejar ngOnDestroy correctamente', () => {
    // Espiar en el subject original del componente
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    
    component.ngOnDestroy();
    
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería renderizar el solicitante en la pestaña 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    
    const solicitante = fixture.debugElement.query(By.css('solicitante'));
    expect(solicitante).toBeTruthy();
  });

  it('debería mantener las suscripciones activas durante la vida del componente', fakeAsync(() => {
    // Configurar mock de respuesta
    const mockResponse = { success: true, datos: {} };
    mockSolicitudDatosService.getDatosConsulta.mockReturnValue(of(mockResponse));
    
    // Primera emisión - actualización requerida
    stateSubject.next({ update: true });
    fixture.detectChanges();
    tick();
    
    expect(mockSolicitudDatosService.getDatosConsulta).toHaveBeenCalledTimes(1);
    
    // Destruir componente para cancelar suscripciones
    component.ngOnDestroy();
    
    // Segunda emisión - no debería procesarse
    stateSubject.next({ update: true });
    fixture.detectChanges();
    tick();
    
    // Verificar que no se llamó nuevamente al servicio
    expect(mockSolicitudDatosService.getDatosConsulta).toHaveBeenCalledTimes(1);
  }));
});