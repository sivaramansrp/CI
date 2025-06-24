import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockService: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockStore = {
      setTramite110218State: jest.fn()
    };
    mockQuery = {
      selectTramite110218State$: of({
        nombre: 'Juan',
        primerApellido: 'Pérez',
        segundoApellido: 'García',
        numeroderegistroFiscal: '12345',
        razonSocial: 'Empresa SA',
        calle: 'Calle 1',
        numeroLetra: '10A',
        ciudad: 'CDMX',
        correoElectronico: 'test@mail.com',
        fax: '1234567',
        telefono: '5555555'
      })
    };
    mockService = {};
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [DestinatarioComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create datosDelDestinatario form with correct values', () => {
    component.estadoSeleccionado = {
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      numeroderegistroFiscal: '12345',
      razonSocial: 'Empresa SA'
    } as any;
    component.crearFormularioDatosDelDestinatario();
    expect(component.datosDelDestinatario.get('nombre')?.value).toBe('Juan');
    expect(component.datosDelDestinatario.get('primerApellido')?.value).toBe('Pérez');
    expect(component.datosDelDestinatario.get('segundoApellido')?.value).toBe('García');
    expect(component.datosDelDestinatario.get('numeroderegistroFiscal')?.value).toBe('12345');
    expect(component.datosDelDestinatario.get('razonSocial')?.value).toBe('Empresa SA');
  });

  it('should create domicilioDelDestinatario form with correct values', () => {
    component.estadoSeleccionado = {
      calle: 'Calle 1',
      numeroLetra: '10A',
      ciudad: 'CDMX',
      correoElectronico: 'test@mail.com',
      fax: '1234567',
      telefono: '5555555'
    } as any;
    component.crearFormularioDomicilioDelDestinatario();
    expect(component.domicilioDelDestinatario.get('calle')?.value).toBe('Calle 1');
    expect(component.domicilioDelDestinatario.get('numeroLetra')?.value).toBe('10A');
    expect(component.domicilioDelDestinatario.get('ciudad')?.value).toBe('CDMX');
    expect(component.domicilioDelDestinatario.get('correoElectronico')?.value).toBe('test@mail.com');
    expect(component.domicilioDelDestinatario.get('fax')?.value).toBe('1234567');
    expect(component.domicilioDelDestinatario.get('telefono')?.value).toBe('5555555');
  });

  it('should enable both forms if esSoloLectura is false', () => {
    component.crearFormularioDatosDelDestinatario();
    component.crearFormularioDomicilioDelDestinatario();
    component.esSoloLectura = false;
    component.habilitarDeshabilitarFormulario();
    expect(component.datosDelDestinatario.enabled).toBe(true);
    expect(component.domicilioDelDestinatario.enabled).toBe(true);
  });

  it('should disable both forms if esSoloLectura is true', () => {
    component.crearFormularioDatosDelDestinatario();
    component.crearFormularioDomicilioDelDestinatario();
    component.esSoloLectura = true;
    component.habilitarDeshabilitarFormulario();
    expect(component.datosDelDestinatario.disabled).toBe(true);
    expect(component.domicilioDelDestinatario.disabled).toBe(true);
  });

  it('should update store with setValorStore', () => {
    component.crearFormularioDatosDelDestinatario();
    component.datosDelDestinatario.get('nombre')?.setValue('Pedro');
    component.setValorStore(component.datosDelDestinatario, 'nombre');
    expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ nombre: 'Pedro' });
  });

  it('should update estadoSeleccionado on getValorStore', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual(expect.objectContaining({
      nombre: 'Juan',
      primerApellido: 'Pérez'
    }));
  });

  it('should clean up destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});