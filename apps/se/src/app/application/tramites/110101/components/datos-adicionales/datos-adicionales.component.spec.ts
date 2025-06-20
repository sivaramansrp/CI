import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosAdicionalesComponent } from './datos-adicionales.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertComponent, TituloComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { Tramite110101Store } from '../../estados/tramites/solicitante110101.store';

describe('DatosAdicionalesComponent', () => {
  let component: DatosAdicionalesComponent;
  let fixture: ComponentFixture<DatosAdicionalesComponent>;

  const MOCK_STATE = {
    entidad: 'SINALOA',
    representacion: 'CULIACAN',
    rfc: '',
    denominacion: '',
    actividadEconomica: '',
    correoElectronico: '',
    pais: '',
    tratado: '',
    origen: '',
    nombreComercial: '',
    nombreIngles: '',
    fraccionArancelaria: '',
    descripcion: '',
    valorTransaccion: '',
  };

  const mockSolicitanteQuery = {
    selectSolicitante$: of(MOCK_STATE)
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({
      readonly: false
    })
  };

  const mockStore = {
    setEntidad: jest.fn(),
    setRepresentacion: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatosAdicionalesComponent,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent,
        AlertComponent,
        CatalogoSelectComponent
      ],
      providers: [
        FormBuilder,
        { provide: Tramite110101Store, useValue: mockStore },
        { provide: Solicitante110101Query, useValue: mockSolicitanteQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from store', () => {
    component.inicializarFormulario();
    expect(component.formulario.value).toEqual({
      entidad: 'SINALOA',
      representacion: 'CULIACAN'
    });
  });

  it('should disable form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.formulario.disabled).toBe(true);
  });

  it('should enable form when not readonly', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.formulario.enabled).toBe(true);
  });

  it('should load entidad federativa catalog', () => {
    component.getEntidadFederativa();
    expect(component.entidad.length).toBeGreaterThan(0);
  });

  it('should load representacion federal catalog', () => {
    component.getRepresentacionFederal();
    expect(component.representacion.length).toBeGreaterThan(0);
  });

  it('should call store methods with correct values', () => {
    component.inicializarFormulario();
    component.setValoresStore(component.formulario, 'entidad', 'setEntidad');
    component.setValoresStore(component.formulario, 'representacion', 'setRepresentacion');

    expect(mockStore.setEntidad).toHaveBeenCalledWith('SINALOA');
    expect(mockStore.setRepresentacion).toHaveBeenCalledWith('CULIACAN');
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
