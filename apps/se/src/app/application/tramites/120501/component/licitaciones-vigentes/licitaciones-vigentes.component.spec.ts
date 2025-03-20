/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicitacionesVigentesComponent } from './licitaciones-vigentes.component';

import { LicitacionesDisponiblesService, RespuestaCatalogos, TablaSeleccion } from '@ng-mf/data-access-user';

import { FormBuilder } from '@angular/forms';

import { WizardComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('LicitacionesVigentesComponent', () => {
  let component: LicitacionesVigentesComponent;
  let fixture: ComponentFixture<LicitacionesVigentesComponent>;
  let service: LicitacionesDisponiblesService;
  let fb: FormBuilder;
  let wizardComponent: WizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LicitacionesVigentesComponent, WizardComponent],
      providers: [
        LicitacionesDisponiblesService,
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacionesVigentesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LicitacionesDisponiblesService);
    fb = TestBed.inject(FormBuilder);
    wizardComponent = TestBed.createComponent(WizardComponent).componentInstance;
    component.wizardComponent = wizardComponent;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las propiedades correctamente', () => {
    expect(component.indice).toBe(1);
    expect(component.tableradio).toBe(TablaSeleccion.UNDEFINED);
    expect(component.selectedRow).toBe(1);
    expect(component.datosPasos).toBeDefined();
    expect(component.formulario).toBeDefined();
    expect(component.detalledelalicitacionForm).toBeDefined();
    expect(component.adquiriente).toBeDefined();
  });

  it('debería llamar a los servicios en ngOnInit', () => {
    spyOn(component, 'entidadFederativa');
    spyOn(component, 'representacionFederal');
    spyOn(component, 'getDetallesdelalicitacion');
    spyOn(component, 'getAdquiriente');
    component.ngOnInit();
    expect(component.entidadFederativa).toHaveBeenCalled();
    expect(component.representacionFederal).toHaveBeenCalled();
    expect(component.getDetallesdelalicitacion).toHaveBeenCalled();
    expect(component.getAdquiriente).toHaveBeenCalled();
  });

  it('debería obtener la lista de entidades federativas', () => {
    const MOCKRESPONSE = { data: [{ id: 1, nombre: 'Estado 1' }] };
    spyOn(service, 'getEntidadfederativa').and.returnValue(of(MOCKRESPONSE));
    component.entidadFederativa();
    expect(component.entidadfederativa).toEqual(MOCKRESPONSE.data);
  });

  it('debería obtener la lista de representaciones federales', () => {
    const MOCKRESPONSE: RespuestaCatalogos = {
      code: 200,
      message: 'Success',
      data: [
          { id: 1, descripcion: 'Descripción 1' },
          { id: 2, descripcion: 'Descripción 2' },
      ]
  };
    jest.spyOn(service, 'getRepresentacionfederal').mockReturnValue(of(MOCKRESPONSE));
    component.representacionFederal();
    expect(component.representacionfederal).toEqual(MOCKRESPONSE.data);
});

  it('debería actualizar el índice y llamar a wizardComponent.siguiente() cuando se llama a getValorIndice con la acción "cont"', () => {
    const E = { accion: 'cont', valor: 2 };
    component.getValorIndice(E);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debería actualizar el índice y llamar a wizardComponent.atras() cuando se llama a getValorIndice con la acción "atras"', () => {
    const E = { accion: 'atras', valor: 1 };
    component.indice = 2; // Establecer el índice inicial a 2
    component.getValorIndice(E);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debería actualizar el índice ni llamar a los métodos de wizardComponent cuando se llama a getValorIndice con un valor inválido', () => {
    const E = { accion: 'cont', valor: 0 };
    const INITIALINDEX = component.indice;
    component.getValorIndice(E);
    expect(component.indice).toBe(INITIALINDEX);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('debería obtener y establecer los detalles de la licitación', () => {
    const MOCKRESPONSE = {
      numeradelicitacion: '123',
      fechadeleventodelicitacion: '2024-01-01',
      descripciondelproducto: 'Producto 1',
      unidadtarifaria: 'Unidad 1',
      regimenaduanero: 'Regimen 1',
      fraccionarancelaria: 'Fraccion 1',
      fechadeiniciodevigenciadelcupo: '2024-01-01',
      fechadefindevigenciadelcupo: '2024-12-31',
      observaciones: 'Observaciones',
      bloquecomercial: 'Bloque 1',
      paises: 'Pais 1',
      montoadjudicado: 100,
      montodisponible: 50,
      montomaximo: 200,
    };
    jest.spyOn(service, 'getDetallesdelalicitacion').mockReturnValue(of(MOCKRESPONSE));
    component.getDetallesdelalicitacion();
    expect(component.detalledelalicitacionForm.value).toEqual(MOCKRESPONSE);
  });

  it('debería obtener y establecer los datos del adquiriente', () => {
    const MOCKRESPONSE = {
      rfc: 'RFC123',
      montodisponible: 50,
      montorecibir: 25,
    };
    jest.spyOn(service, 'getAdquiriente').mockReturnValue(of(MOCKRESPONSE));
    component.getAdquiriente();
    expect(component.adquiriente.value).toEqual(MOCKRESPONSE);
  });

  it('debería marcar un control del formulario adquiriente como inválido si es inválido y ha sido tocado', () => {
    component.adquiriente.get('rfc')?.markAsTouched();
    component.adquiriente.get('rfc')?.setErrors({ required: true });
    expect(component.isInvalid('rfc')).toBe(true);
  });

  it('debería retornar null si el control del formulario adquiriente es válido', () => {
    expect(component.isInvalid('rfc')).toBeNull();
  });
});