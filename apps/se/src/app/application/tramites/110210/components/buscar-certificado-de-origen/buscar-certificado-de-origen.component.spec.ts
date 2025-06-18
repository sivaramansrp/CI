import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BuscarCertificadoDeOrigenComponent } from './buscar-certificado-de-origen.component';

describe('BuscarCertificadoDeOrigenComponent', () => {
  let component: BuscarCertificadoDeOrigenComponent;
  let fixture: ComponentFixture<BuscarCertificadoDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BuscarCertificadoDeOrigenComponent,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideHttpClientTesting()
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.buscarCertificadoDeOrigenFrom).toBeDefined();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.value).toBe('');
    expect(component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.value).toBeNull();
    expect(component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitudProductor')?.value).toBe('');
    expect(component.paisBloque).toBeFalsy()
  });

  it('should return true if a control is invalid', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.buscarCertificadoDeOrigenFrom.get(CONTROL_NAME)?.markAsTouched();
    component.buscarCertificadoDeOrigenFrom.get(CONTROL_NAME)?.setValue('');
    expect(component.esInvalido(CONTROL_NAME)).toBe(true);
  });

  it('should return false if a control is valid', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.buscarCertificadoDeOrigenFrom.get(CONTROL_NAME)?.markAsTouched();
    component.buscarCertificadoDeOrigenFrom.get(CONTROL_NAME)?.setValue('valid value');
    expect(component.esInvalido(CONTROL_NAME)).toBe(false);
  });

  it('should enable cveRegistroProductor if idSolicitud is null', () => {
    component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.setValue(null);
    component.actualizaGridComercializadoresProductos();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.enabled).toBe(true);
  });

  it('should disable cveRegistroProductor if idSolicitud is not null', () => {
    component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.setValue(1);
    component.actualizaGridComercializadoresProductos();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.disabled).toBe(true);
  });

  it('should call getValoresStore on initialization', () => {
    const spy = jest.spyOn(component, 'getValoresStore');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroyed$ = (component as any).destroyed$;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});