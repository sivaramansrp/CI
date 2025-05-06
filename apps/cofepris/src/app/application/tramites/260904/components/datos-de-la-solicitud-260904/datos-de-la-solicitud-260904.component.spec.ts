import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitud260904Component } from './datos-de-la-solicitud-260904.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite260904Store, Tramite260904State} from '../../estados/tramite260904.store';
import { Tramite260904Query } from '../../estados/tramite260904.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('DatosDeLaSolicitud260904Component', () => {
  let component: DatosDeLaSolicitud260904Component;
  let fixture: ComponentFixture<DatosDeLaSolicitud260904Component>;
  let storeMock: Partial<Tramite260904Store>;
  let queryMock: Partial<Tramite260904Query>;

  beforeEach(async () => {
    storeMock = {
      setTramite260904State: jest.fn()
    };

    queryMock = {
      selectTramite260904$: of({
        btonDeRadio: '',
        justificacion: '',
        rfcDel: 'RFC123',
        denominacion: 'Empresa S.A.',
        correo: 'correo@test.com',
        codigoPostal: '',
        estado: null,
        municipioOAlcaldia: '',
        localidad: '',
        colonias: '',
        calle: '',
        lada: '',
        telefono: '',
        avisoCheckbox: '',
        regimen: null,
        aduanasEntradas: null,
        aifaCheckbox: '',
        manifests: '',
        acuerdoPublico: '',
        rfc: '',
        claveDeReferencia: '',
        cadenaPagoDependencia: '',
        clave: '',
        llaveDePago: '',
        fecPago: '',
        impPago: '',
       
      } as Tramite260904State)
    };
    

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosDeLaSolicitud260904Component,
        AlertComponent,
        InputRadioComponent,
        TituloComponent
      ],
      providers: [
        FormBuilder,
        { provide: Tramite260904Store, useValue: storeMock },
        { provide: Tramite260904Query, useValue: queryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitud260904Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.datosDelEstablecimiento).toBeDefined();
  });

  it('should toggle colapsable state', () => {
    const initial = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('should enable disabled form controls', () => {
    component.datosDelEstablecimiento.get('rfcDel')?.disable();
    component.datosDelEstablecimiento.get('correo')?.disable();
    component.toggleFormControls();
    expect(component.datosDelEstablecimiento.get('rfcDel')?.enabled).toBe(true);
    expect(component.datosDelEstablecimiento.get('correo')?.enabled).toBe(true);
  });

  it('should call setTramite260904State on setValorStore()', () => {
    component.datosDelEstablecimiento.patchValue({ rfcDel: 'NEW123' });
    component.setValorStore(component.datosDelEstablecimiento, 'rfcDel');
    expect(storeMock.setTramite260904State).toHaveBeenCalledWith({ rfcDel: 'NEW123' });
  });

  it('should set estadoSeleccionado from store', () => {
    expect(Object.keys(component.estadoSeleccionado)).toEqual(
      expect.arrayContaining(['rfcDel', 'denominacion', 'correo'])
    );
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
