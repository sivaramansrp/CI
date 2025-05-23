import { TestBed } from '@angular/core/testing';
import { RegistroMercanciaComercializadorComponent } from './registro-mercancia-comercializador.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MercanciaasociadaService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistroMercanciaComercializadorComponent', () => {
  let component: RegistroMercanciaComercializadorComponent;
  let mockService: any;

  const MOCK_FORM_DATA = {
    nombreComercial: 'Producto X',
    nombreIngles: 'Product X',
    nombreTecnico: 'Tech X',
    fraccionArancelaria: { clave: '123', descripcion: 'Desc 123' },
    fraccionNALADI: { clave: '456', descripcion: 'Desc 456' },
    fraccionNALADISA93: { clave: '789', descripcion: 'Desc 789' },
    fraccionNALADISA96: { clave: '101', descripcion: 'Desc 101' },
    fraccionNALADISA02: { clave: '202', descripcion: 'Desc 202' },
    descripcionJuego: 'Juego especial',
    unidadAdministrativaRepresentacionFederal: { clave: 'UA01' }
  };

  const MOCK_FORM_VISIBLITY = {
    mostrarDatosMercanciaProductor: true,
    mostrarNombreIngles: true,
    mostrarClasificacionNaladi: true,
    mostrarClasificacionNaladisa93: false,
    mostrarClasificacionNaladisa96: false,
    mostrarClasificacionNaladisa02: true,
    mostrarJuegosSurtidos: false
  };

  beforeEach(async () => {
    mockService = {
      getMercanciaAsociada: jest.fn().mockReturnValue(of({
        Formdata: MOCK_FORM_DATA,
        Formvisiblity: MOCK_FORM_VISIBLITY
      }))
    };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RegistroMercanciaComercializadorComponent],
      providers: [
        FormBuilder,
        { provide: MercanciaasociadaService, useValue: mockService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(RegistroMercanciaComercializadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe llamar a recuperaValores', () => {
    const SPY = jest.spyOn(component, 'recuperaValores');
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('recuperaValores debe llenar el formulario y configurar visibilidad', () => {
    component.recuperaValores();
    expect(component.registroMercanciaComercializadorFrom.get('nombreComercial')?.value).toBe('Producto X');
    expect(component.registroMercanciaComercializadorFrom.get('nombreIngles')?.value).toBe('Product X');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionArancelaria.clave')?.value).toBe('123');
    expect(component.mostrarDatosMercanciaProductor).toBe(true);
    expect(component.mostrarNombreIngles).toBe(true);
    expect(component.mostrarClasificacionNaladi).toBe(true);
    expect(component.mostrarClasificacionNaladisa93).toBe(false);
    expect(component.mostrarClasificacionNaladisa02).toBe(true);
  });

  it('ngOnDestroy debe completar el subject destroyed$', () => {
    const SPY_NEXT = jest.spyOn((component as any).destroyed$, 'next');
    const SPY_COMPLETE = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(SPY_NEXT).toHaveBeenCalled();
    expect(SPY_COMPLETE).toHaveBeenCalled();
  });

  it('configurarVisibilidadCampos debe actualizar las banderas de visibilidad', () => {
    const DATA = {
      mostrarDatosMercanciaProductor: false,
      mostrarNombreIngles: false,
      mostrarClasificacionNaladi: false,
      mostrarClasificacionNaladisa93: true,
      mostrarClasificacionNaladisa96: true,
      mostrarClasificacionNaladisa02: false,
      mostrarJuegosSurtidos: true
    };

    component['configurarVisibilidadCampos'](DATA);
    expect(component.mostrarDatosMercanciaProductor).toBe(false);
    expect(component.mostrarNombreIngles).toBe(false);
    expect(component.mostrarClasificacionNaladi).toBe(false);
    expect(component.mostrarClasificacionNaladisa93).toBe(true);
    expect(component.mostrarClasificacionNaladisa96).toBe(true);
    expect(component.mostrarClasificacionNaladisa02).toBe(false);
    expect(component.mostrarJuegosSurtidos).toBe(true);
  });
});