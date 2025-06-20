import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let storeMock: any;
  let queryMock: any;
  let serviceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    storeMock = { setTipoDeEmpresa: jest.fn() };
    queryMock = {
      selectTipoDeEmpresa$: of('EMPRESA'),
      selectActividadEconomicaClave$: of('CLAVE')
    };
    serviceMock = {
      obtenerEstado: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Empresa 1' }]))
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: Tramite120601Store, useValue: storeMock },
        { provide: Tramite120601Query, useValue: queryMock },
        { provide: DatosEmpresaService, useValue: serviceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on init', () => {
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('tipoDeEmpresa')).toBeDefined();
    expect(component.solicitudForm.get('actividadEconomicaClave')).toBeDefined();
  });

  it('should patch tipoDeEmpresa and actividadEconomicaClave from query observables', () => {
    expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toBe('EMPRESA');
    expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe('CLAVE');
  });

  it('should get tipoDeEmpresa from service', () => {
    component.getTipoDeEmpresa();
    expect(serviceMock.obtenerEstado).toHaveBeenCalled();
    expect(component.tipoDeEmpresa).toEqual([{ id: 1, descripcion: 'Empresa 1' }]);
  });

  it('should call store.setTipoDeEmpresa on docSeleccionado', () => {
    component.solicitudForm.get('tipoDeEmpresa')?.setValue('EMPRESA');
    component.docSeleccionado({} as any);
    expect(storeMock.setTipoDeEmpresa).toHaveBeenCalledWith('EMPRESA');
  });

  it('should disable/enable fields based on esFormularioSoloLectura', () => {
    component.esFormularioSoloLectura = true;
    component.ngOnInit();
    expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(true);
    expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(true);

    component.esFormularioSoloLectura = false;
    component.ngOnInit();
    expect(component.solicitudForm.get('tipoDeEmpresa')?.enabled).toBe(true);
    expect(component.solicitudForm.get('actividadEconomicaClave')?.enabled).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});