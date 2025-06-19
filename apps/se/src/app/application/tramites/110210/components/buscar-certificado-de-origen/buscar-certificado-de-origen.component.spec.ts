import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BuscarCertificadoDeOrigenComponent } from './buscar-certificado-de-origen.component';
import { Tramite110210Query } from '../../estados/queries/tramite110210.query';
import { Tramite110210Store } from '../../estados/store/tramite110210.store';
import { BuscarCertificadoDeOrigenService } from '@ng-mf/data-access-user';

describe('BuscarCertificadoDeOrigenComponent', () => {
  let component: BuscarCertificadoDeOrigenComponent;
  let fixture: ComponentFixture<BuscarCertificadoDeOrigenComponent>;

  const tramite110210QueryMock = {
    selectTramite110210$: of({
      paisBloqueClave: '',
      tratadoAcuerdoClave: '',
      cveRegistroProductor: '123456789012',
      solicitud: {
        idSolicitud: null,
        idSolicitudProductor: '',
        
      }
    })
  };

  const tramite110210StoreMock = {
    setCveRegistroProductor: jest.fn(),
    setPaisBloqueClave: jest.fn(),
    setTratadoAcuerdoClave: jest.fn()
  };

  const serviceMock = {
    getPaisBloque: jest.fn().mockReturnValue(of([])),
    getTratadoAcuerdo: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BuscarCertificadoDeOrigenComponent,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Tramite110210Query, useValue: tramite110210QueryMock },
        { provide: Tramite110210Store, useValue: tramite110210StoreMock },
        { provide: BuscarCertificadoDeOrigenService, useValue: serviceMock },
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

  it('should initialize the form with default values from store', () => {
    expect(component.buscarCertificadoDeOrigenFrom).toBeDefined();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.value).toBe('123456789012');
    expect(component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.value).toBeNull();
    expect(component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitudProductor')?.value).toBe('');
    expect(component.buscarCertificadoDeOrigenFrom.get('paisBloqueClave')?.value).toBe('');
    expect(component.buscarCertificadoDeOrigenFrom.get('tratadoAcuerdoClave')?.value).toBe('');
  });

  it('should return true if control is invalid', () => {
    const control = component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor');
    control?.markAsTouched();
    control?.setValue('');
    expect(component.esInvalido('cveRegistroProductor')).toBe(true);
  });

  it('should return false if control is valid', () => {
    const control = component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor');
    control?.markAsTouched();
    control?.setValue('validValue');
    expect(component.esInvalido('cveRegistroProductor')).toBe(false);
  });

  it('should enable cveRegistroProductor if idSolicitud is null', () => {
    component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.setValue(null);
    component.actualizaGridComercializadoresProductos();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.enabled).toBe(true);
  });

  it('should disable cveRegistroProductor if idSolicitud is not null', () => {
    component.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.setValue(999);
    component.actualizaGridComercializadoresProductos();
    expect(component.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.disabled).toBe(true);
  });

  it('should call setValoresStore with correct values', () => {
    const form = component.buscarCertificadoDeOrigenFrom;
    form.get('cveRegistroProductor')?.setValue('XYZ123');
    component.setValoresStore(form, 'cveRegistroProductor', 'setCveRegistroProductor');
    expect(tramite110210StoreMock.setCveRegistroProductor).toHaveBeenCalledWith('XYZ123');
  });

  it('should call getValoresStore and patch the form', () => {
    const spy = jest.spyOn(component, 'getValoresStore');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should fetch paisBloque and tratadoAcuerdo data on init', () => {
    component.ngOnInit();
    expect(serviceMock.getPaisBloque).toHaveBeenCalled();
    expect(serviceMock.getTratadoAcuerdo).toHaveBeenCalled();
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
