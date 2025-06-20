import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { Catalogo, ConsultaioQuery, ConsultaioState, DATOS_GENERALES_REPRESENTACION } from '@ng-mf/data-access-user';
import { RepresentacionFederal } from '../../modelos/datos-empresa.model';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let mockDatosEmpresaService: jest.Mocked<DatosEmpresaService>;
  let mockTramite120601Query: Partial<Tramite120601Query>;
  let mockTramite120601Store: jest.Mocked<Tramite120601Store>;
  let mockConsultaioQuery: Partial<ConsultaioQuery>;

  const mockEstados: Catalogo[] = [{ id: 1, descripcion: 'Estado 1' }];
  const mockRepresentacion: Catalogo[] = [{ id: 2, descripcion: 'Representación 1' }];
  const mockDatosSocios: RepresentacionFederal[] = [
    { id: 1, nombre: 'Socio 1' } as unknown as RepresentacionFederal
  ];
  const mockConsultaioState: ConsultaioState = { readonly: false } as ConsultaioState;

  beforeEach(async () => {
    mockDatosEmpresaService = {
      obtenerEstado: jest.fn().mockReturnValue(of(mockEstados)),
      obtenerDatosDeRepresentacionFederal: jest.fn().mockReturnValue(of(mockRepresentacion)),
      ObtenerTablaDeRepresentaciónFederal: jest.fn().mockReturnValue(of(mockDatosSocios)),
    } as any;

    mockTramite120601Query = {
      selectEstado$: of('Estado 1'),
      selectRepresentacion$: of('Representación 1')
    };

    mockTramite120601Store = {
      setEstado: jest.fn(),
      setRepresentacion: jest.fn()
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    };

    await TestBed.configureTestingModule({
      imports: [RepresentacionFederalComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosEmpresaService, useValue: mockDatosEmpresaService },
        { provide: Tramite120601Query, useValue: mockTramite120601Query },
        { provide: Tramite120601Store, useValue: mockTramite120601Store },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });


  it('debe inicializar el formulario con valores por defecto y validadores', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('estado')).toBeDefined();
    expect(component.formulario.get('representacion')).toBeDefined();
    expect(component.formulario.get('representacion')?.validator).toBeTruthy();
  });

  it('debe llamar a obtenerEstado, obtenerDatosDeRepresentacionFederal y ObtenerTablaDeRepresentaciónFederal al inicializar', () => {
    expect(mockDatosEmpresaService.obtenerEstado).toHaveBeenCalled();
    expect(mockDatosEmpresaService.obtenerDatosDeRepresentacionFederal).toHaveBeenCalled();
    expect(mockDatosEmpresaService.ObtenerTablaDeRepresentaciónFederal).toHaveBeenCalled();
    expect(component.estado).toEqual(mockEstados);
    expect(component.representacion).toEqual(mockRepresentacion);
    expect(component.datosSocios).toEqual(mockDatosSocios);
  });

  it('debe actualizar el estado desde el observable selectEstado$', () => {
    expect(component.formulario.get('estado')?.value).toEqual('Estado 1');
  });

  it('debe actualizar la representación desde el observable selectRepresentacion$', () => {
   expect(component.formulario.get('representacion')?.value).toEqual(mockRepresentacion[0].descripcion);
  });

  it('debe establecer esFormularioSoloLectura desde consultaioQuery', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('debe llamar a store.setEstado en docSeleccionado', () => {
    component.formulario.get('estado')?.setValue('testEstado');
    component.docSeleccionado({} as Event);
    expect(mockTramite120601Store.setEstado).toHaveBeenCalledWith('testEstado');
  });

  it('debe llamar a store.setRepresentacion en validarRepresentacionFederalIDCSECEROR_', () => {
    component.formulario.get('representacion')?.setValue('testRep');
    component.validarRepresentacionFederalIDCSECEROR_({} as Event);
    expect(mockTramite120601Store.setRepresentacion).toHaveBeenCalledWith('testRep');
  });

  it('debe limpiar destroyed$ en ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe tener los valores por defecto correctos para tableHeaderData, tableBodyData, selectedRow, configuracionTabla', () => {
    expect(component.tableHeaderData).toEqual([]);
    expect(component.tableBodyData).toEqual([]);
    expect(component.selectedRow).toBe(1);
    expect(component.configuracionTabla).toBe(DATOS_GENERALES_REPRESENTACION);
  });

  it('debe crear el formulario con crearFormulario()', () => {
    component.formulario = undefined as any;
    component.crearFormulario();
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('estado')).toBeDefined();
    expect(component.formulario.get('representacion')).toBeDefined();
  });

  it('debe establecer el estado en getEntidadFederativa()', () => {
    component.estado = [];
    component.getEntidadFederativa();
    expect(component.estado).toEqual(mockEstados);
  });

  it('debe establecer la representación en getRepresentacionFederal()', () => {
    component.representacion = [];
    component.getRepresentacionFederal();
    expect(component.representacion).toEqual(mockRepresentacion);
  });

  it('debe establecer datosSocios en getDatosSocios()', () => {
    component.datosSocios = [];
    component.getDatosSocios();
    expect(component.datosSocios).toEqual(mockDatosSocios);
  });

  it('debe requerir el campo representación', () => {
    component.formulario.get('representacion')?.setValue('');
    expect(component.formulario.get('representacion')?.hasError('required')).toBe(true);
  });

  it('debe marcar el formulario como válido cuando representación está lleno', () => {
    component.formulario.get('representacion')?.setValue('filled');
    expect(component.formulario.valid).toBe(true);
  });
});
