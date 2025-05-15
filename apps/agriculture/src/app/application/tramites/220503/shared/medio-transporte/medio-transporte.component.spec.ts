import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MedioTransporteComponent } from './medio-transporte.component';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { of } from 'rxjs';
import { SimpleChanges } from '@angular/core';
import {
  TituloComponent,
  CatalogoSelectComponent,
  TableComponent,
  InputRadioComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<MedioTransporteComponent>;
  let mockQuery: jest.Mocked<Solicitud220503Query>;
  let mockStore: jest.Mocked<Solicitud220503Store>;

  beforeEach(async () => {
    mockQuery = {
      selectSolicitud$: jest.fn(),
    } as unknown as jest.Mocked<Solicitud220503Query>;

    mockStore = {
      setEsSolicitudFerros: jest.fn(),
      setTransporteIdMedio: jest.fn(),
      setIdentificacionTransporte: jest.fn(),
      setTotalDeGuiasAmparadas: jest.fn(),
    } as unknown as jest.Mocked<Solicitud220503Store>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MedioTransporteComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        TableComponent,
        InputRadioComponent,
      ],
      declarations: [],
      providers: [
        { provide: Solicitud220503Query, useValue: mockQuery },
        { provide: Solicitud220503Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;

    // Mock parent form group
    component.parentContainer = {
      control: new FormGroup({}),
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a dynamic form group on ngOnInit', () => {
    component.claveDeControl = 'testControl';
    component.ngOnInit();

    const formGroup = component.grupoFormularioPadre.get(
      'testControl'
    ) as FormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.controls['transporteIdMedio']).toBeTruthy();
    expect(formGroup.controls['identificacionTransporte']).toBeTruthy();
    expect(formGroup.controls['esSolicitudFerros']).toBeTruthy();
    expect(formGroup.controls['totalDeGuiasAmparadas']).toBeTruthy();
  });

  it('should update form group values when selectSolicitud$ emits', () => {
    component.claveDeControl = 'testControl';
    component.ngOnInit();

    const formGroup = component.grupoFormularioPadre.get(
      'testControl'
    ) as FormGroup;
    expect(formGroup.value).toEqual({
      transporteIdMedio: '1',
      identificacionTransporte: 'ABC123',
      esSolicitudFerros: 'Yes',
      totalDeGuiasAmparadas: '10',
    });
  });

  it('should call setEsSolicitudFerros on enCambioDeValor', () => {
    component.enCambioDeValor('Yes');
    expect(mockStore.setEsSolicitudFerros).toHaveBeenCalledWith('Yes');
  });

  it('should update tableData on ngOnChanges', () => {
    const changes: SimpleChanges = {
      hMercanciaTabla: {
        currentValue: ['Header1', 'Header2'],
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
      dMercanciaBody: {
        currentValue: [{ id: 1, name: 'Item1' }],
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    };

    component.ngOnChanges(changes);

    expect(component.tableData.tableHeader).toEqual(['Header1', 'Header2']);
    expect(component.tableData.tableBody).toEqual([{ id: 1, name: 'Item1' }]);
  });

  it('should patch form group value on seleccionMedioDeTransporte', () => {
    component.claveDeControl = 'testControl';
    component.ngOnInit();

    component.seleccionMedioDeTransporte({
      descripcion: 'NewTransport',
    } as any);

    const formGroup = component.grupoFormularioPadre.get(
      'testControl'
    ) as FormGroup;
    expect(formGroup.value.transporteIdMedio).toBe('NewTransport');
  });

  it('should call setTransporteIdMedio on setTransporteIdMedio', () => {
    component.setTransporteIdMedio({ id: '123' } as any);
    expect(mockStore.setTransporteIdMedio).toHaveBeenCalledWith('123');
  });

  it('should call setIdentificacionTransporte on setIdentificacionTransporte', () => {
    const event = { target: { value: 'NewID' } } as any;
    component.setIdentificacionTransporte(event);
    expect(mockStore.setIdentificacionTransporte).toHaveBeenCalledWith('NewID');
  });

  it('should call setTotalDeGuiasAmparadas on setTotalDeGuiasAmparadas', () => {
    const event = { target: { value: '20' } } as any;
    component.setTotalDeGuiasAmparadas(event);
    expect(mockStore.setTotalDeGuiasAmparadas).toHaveBeenCalledWith('20');
  });

  it('should remove dynamic form group on ngOnDestroy', () => {
    component.claveDeControl = 'testControl';
    component.ngOnInit();
    component.ngOnDestroy();

    expect(component.grupoFormularioPadre.get('testControl')).toBeNull();
  });
});
