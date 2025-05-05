import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { PASOS } from '@libs/shared/data-access-user/src';
import { ALERTA_COM } from '@libs/shared/data-access-user/src/tramites/constantes/260104/certificado.enum';
import { PermisoSanitarioProductosService } from '../../services/permiso-sanitario-productos.service';
import { HttpClientModule } from '@angular/common/http';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [SolicitudPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });
  
  it('should update indice and navigate to the next step when getValorIndice is called with "cont"', () => {
    component.wizardComponent = { siguiente: jest.fn() } as any;
    const accion = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
  
  it('should update indice and navigate to the previous step when getValorIndice is called with "atras"', () => {
    component.wizardComponent = { atras: jest.fn() } as any;
    const accion = { accion: 'atras', valor: 1 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });
  
  it('should not update indice if the value is out of range', () => {
    const initialIndice = component.indice;
    const accion = { accion: 'cont', valor: 6 }; // Out of range
    component.getValorIndice(accion);
    expect(component.indice).toBe(initialIndice);
  });
  
  it('should call collectFormValues from the service when getValorIndice is called', () => {
    const mockPayload = { datosSolicitud: [] };
    jest.spyOn(component.service, 'collectFormValues').mockReturnValue(mockPayload);
    const accion = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);
    expect(component.service.collectFormValues).toHaveBeenCalled();
    expect(component.payload).toEqual(mockPayload);
  });
  
  it('should handle undefined payload gracefully in getValorIndice', () => {
    const accion = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);
    expect(component.payload).toBeUndefined();
  });
  it('should initialize pasos with the correct values from PASOS', () => {
    expect(component.pasos).toBe(PASOS);
  });
  it('should initialize alerta with the correct value from ALERTA_COM', () => {
    expect(component.alerta).toBe(ALERTA_COM);
  });
  it('should initialize indice with the default value of 1', () => {
    expect(component.indice).toBe(1);
  });
  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });
  it('should initialize payload with an empty object', () => {
    expect(component.payload).toEqual({});
  });
  it('should inject PermisoSanitarioProductosService in the constructor', () => {
    expect(component.service).toBeInstanceOf(PermisoSanitarioProductosService);
  });
});
