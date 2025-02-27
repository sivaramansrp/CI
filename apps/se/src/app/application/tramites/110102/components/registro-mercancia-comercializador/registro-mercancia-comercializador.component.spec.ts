/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { RegistroMercanciaComercializadorComponent } from './registro-mercancia-comercializador.component';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

import { MercanciaasociadaService } from 'libs/shared/data-access-user/src/core/services/110102/mercanciaasociada/mercanciaasociada.service';

describe('RegistroMercanciaComercializadorComponent', () => {
  let component: RegistroMercanciaComercializadorComponent;
  let fixture: ComponentFixture<RegistroMercanciaComercializadorComponent>;
  let service: MercanciaasociadaService;

  beforeEach(async () => {
    const SERVICE_MOCK = {
      getregistroMercanciaComercializadorFrom: jest.fn().mockReturnValue(of({
        Formdata: {
          nombreComercial: 'Comercial',
          nombreIngles: 'English Name',
          nombreTecnico: 'Technical Name',
          fraccionArancelaria: { clave: '1234', descripcion: 'Description' },
          fraccionNALADI: { clave: '5678', descripcion: 'Description' },
          fraccionNALADISA93: { clave: '91011', descripcion: 'Description' },
          fraccionNALADISA96: { clave: '1213', descripcion: 'Description' },
          fraccionNALADISA02: { clave: '1415', descripcion: 'Description' },
          descripcionJuego: 'Game Description',
          unidadAdministrativaRepresentacionFederal: { clave: 'Clave' }
        },
        Formvisiblity: {
          mostrarDatosMercanciaProductor: true,
          mostrarNombreIngles: true,
          mostrarClasificacionNaladi: true,
          mostrarClasificacionNaladisa93: true,
          mostrarClasificacionNaladisa96: true,
          mostrarClasificacionNaladisa02: true,
          mostrarJuegosSurtidos: true
        }
      }))
    };

    await TestBed.configureTestingModule({
      imports: [RegistroMercanciaComercializadorComponent, CommonModule, ReactiveFormsModule, TituloComponent],
      providers: [
        { provide: MercanciaasociadaService, useValue: SERVICE_MOCK }
      ]
    }).compileComponents();

    service = TestBed.inject(MercanciaasociadaService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMercanciaComercializadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.registroMercanciaComercializadorFrom).toBeDefined();
    expect(component.registroMercanciaComercializadorFrom.get('nombreComercial')?.value).toBe('');
    expect(component.registroMercanciaComercializadorFrom.get('nombreIngles')?.value).toBe('');
    expect(component.registroMercanciaComercializadorFrom.get('nombreTecnico')?.value).toBe('');
  });

  it('should fetch and patch form values on init', () => {
    component.ngOnInit();
    expect(service.getMercanciaAsociada).toHaveBeenCalled();
    expect(component.registroMercanciaComercializadorFrom.get('nombreComercial')?.value).toBe('Comercial');
    expect(component.registroMercanciaComercializadorFrom.get('nombreIngles')?.value).toBe('English Name');
    expect(component.registroMercanciaComercializadorFrom.get('nombreTecnico')?.value).toBe('Technical Name');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionArancelaria.clave')?.value).toBe('1234');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionArancelaria.descripcion')?.value).toBe('Description');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADI.clave')?.value).toBe('5678');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADI.descripcion')?.value).toBe('Description');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA93.clave')?.value).toBe('91011');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA93.descripcion')?.value).toBe('Description');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA96.clave')?.value).toBe('1213');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA96.descripcion')?.value).toBe('Description');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA02.clave')?.value).toBe('1415');
    expect(component.registroMercanciaComercializadorFrom.get('fraccionNALADISA02.descripcion')?.value).toBe('Description');
    expect(component.registroMercanciaComercializadorFrom.get('descripcionJuego')?.value).toBe('Game Description');
    expect(component.registroMercanciaComercializadorFrom.get('unidadAdministrativaRepresentacionFederal.clave')?.value).toBe('Clave');
  });

  it('should configure visibility of fields based on data', () => {
    component.ngOnInit();
    expect(component.mostrarDatosMercanciaProductor).toBe(true);
    expect(component.mostrarNombreIngles).toBe(true);
    expect(component.mostrarClasificacionNaladi).toBe(true);
    expect(component.mostrarClasificacionNaladisa93).toBe(true);
    expect(component.mostrarClasificacionNaladisa96).toBe(true);
    expect(component.mostrarClasificacionNaladisa02).toBe(true);
    expect(component.mostrarJuegosSurtidos).toBe(true);
  });

  it('should complete destroyed$ subject on destroy', () => {
    const NEXT_SPY = jest.spyOn(component['destroyed$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});