import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegistroMercanciaComercializadorComponent } from './registro-mercancia-comercializador.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MercanciaasociadaService } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DatosTratadosAcuerdosComponent } from '../datos-tratados-acuerdos/datos-tratados-acuerdos.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistroMercanciaComercializadorComponent', () => {
  let component: RegistroMercanciaComercializadorComponent;
  let fixture: ComponentFixture<RegistroMercanciaComercializadorComponent>;
  let mercanciaServiceMock: jest.Mocked<MercanciaasociadaService>;

  const mockFormData = {
    nombreComercial: 'Producto A',
    nombreIngles: 'Product A',
    nombreTecnico: 'Técnico A',
    fraccionArancelaria: { clave: '1234', descripcion: 'Desc Arancelaria' },
    fraccionNALADI: { clave: 'NALADI1', descripcion: 'Desc Naladi' },
    fraccionNALADISA93: { clave: 'NAL93', descripcion: 'Desc Naladisa93' },
    fraccionNALADISA96: { clave: 'NAL96', descripcion: 'Desc Naladisa96' },
    fraccionNALADISA02: { clave: 'NAL02', descripcion: 'Desc Naladisa02' },
    descripcionJuego: 'Juego de prueba',
    unidadAdministrativaRepresentacionFederal: { clave: 'UA1' }
  };

  const mockFormVisibility = {
    mostrarDatosMercanciaProductor: true,
    mostrarNombreIngles: true,
    mostrarClasificacionNaladi: true,
    mostrarClasificacionNaladisa93: true,
    mostrarClasificacionNaladisa96: true,
    mostrarClasificacionNaladisa02: true,
    mostrarJuegosSurtidos: true
  };

  beforeEach(async () => {
    mercanciaServiceMock = {
      getMercanciaAsociada: jest.fn(() => of({ Formdata: mockFormData, Formvisiblity: mockFormVisibility }))
    } as any;

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TituloComponent,
        DatosTratadosAcuerdosComponent,
        RegistroMercanciaComercializadorComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: MercanciaasociadaService, useValue: mercanciaServiceMock },
        { provide: 'HttpCoreService', useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMercanciaComercializadorComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con controles deshabilitados', () => {
    expect(component.registroMercanciaComercializadorFrom).toBeDefined();
    expect(component.registroMercanciaComercializadorFrom.get('nombreComercial')?.disabled).toBe(true);
    expect(component.registroMercanciaComercializadorFrom.get('nombreIngles')?.disabled).toBe(true);
    expect(component.registroMercanciaComercializadorFrom.get('nombreTecnico')?.disabled).toBe(true);
  });

  it('debe llamar a recuperaValores en ngOnInit', () => {
    const spy = jest.spyOn(component, 'recuperaValores');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe actualizar el formulario y establecer las banderas de visibilidad cuando se llama a recuperaValores', () => {
    mercanciaServiceMock.getMercanciaAsociada.mockReturnValue(
      of({ Formdata: mockFormData, Formvisiblity: mockFormVisibility })
    );

    component.recuperaValores();

    expect(component.registroMercanciaComercializadorFrom.get('nombreComercial')?.value).toBe('Producto A');
    expect(component.registroMercanciaComercializadorFrom.get('nombreIngles')?.value).toBe('Product A');
    expect(component.registroMercanciaComercializadorFrom.get('nombreTecnico')?.value).toBe('Técnico A');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionArancelaria.clave')?.value).toBe('1234');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionArancelaria.descripcion')?.value).toBe('Desc Arancelaria');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADI.clave')?.value).toBe('NALADI1');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADI.descripcion')?.value).toBe('Desc Naladi');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA93.clave')?.value).toBe('NAL93');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA93.descripcion')?.value).toBe('Desc Naladisa93');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA96.clave')?.value).toBe('NAL96');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA96.descripcion')?.value).toBe('Desc Naladisa96');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA02.clave')?.value).toBe('NAL02');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA02.descripcion')?.value).toBe('Desc Naladisa02');
    expect(component.registroMercanciaComercializadorFrom.get('descripcionJuego')?.value).toBe('Juego de prueba');
    expect(component.registroMercanciaComercializadorFrom.get('unidadAdministrativaRepresentacionFederal.clave')?.value).toBe('UA1');

    expect(component.mostrarDatosMercanciaProductor).toBe(true);
    expect(component.mostrarNombreIngles).toBe(true);
    expect(component.mostrarClasificacionNaladi).toBe(true);
    expect(component.mostrarClasificacionNaladisa93).toBe(true);
    expect(component.mostrarClasificacionNaladisa96).toBe(true);
    expect(component.mostrarClasificacionNaladisa02).toBe(true);
    expect(component.mostrarJuegosSurtidos).toBe(true);
  });

  it('debe desuscribirse de destroyed$ en ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyed$ as Subject<void>;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe establecer correctamente las banderas de visibilidad en configurarVisibilidadCampos', () => {
    const data = {
      mostrarDatosMercanciaProductor: false,
      mostrarNombreIngles: true,
      mostrarClasificacionNaladi: false,
      mostrarClasificacionNaladisa93: true,
      mostrarClasificacionNaladisa96: false,
      mostrarClasificacionNaladisa02: true,
      mostrarJuegosSurtidos: false
    };
    (component as any).configurarVisibilidadCampos(data);
    expect(component.mostrarDatosMercanciaProductor).toBe(false);
    expect(component.mostrarNombreIngles).toBe(true);
    expect(component.mostrarClasificacionNaladi).toBe(false);
    expect(component.mostrarClasificacionNaladisa93).toBe(true);
    expect(component.mostrarClasificacionNaladisa96).toBe(false);
    expect(component.mostrarClasificacionNaladisa02).toBe(true);
    expect(component.mostrarJuegosSurtidos).toBe(false);
  });
});