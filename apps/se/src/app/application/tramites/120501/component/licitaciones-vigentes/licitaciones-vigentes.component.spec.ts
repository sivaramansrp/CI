import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LicitacionesVigentesComponent } from './licitaciones-vigentes.component';
import { LicitacionesDisponiblesService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('LicitacionesVigentesComponent', () => {
  let component: LicitacionesVigentesComponent;
  let fixture: ComponentFixture<LicitacionesVigentesComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([])),
      getAdquiriente: jest.fn().mockReturnValue(of({ rfc: 'ABC123', adquirienteMontoDisponible: 1000 })),
      getTableData: jest.fn().mockReturnValue(of([])),
      getDetallesDelalicitacion: jest.fn().mockReturnValue(of({ detalle: 'mocked detalle' })),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,LicitacionesVigentesComponent],
      declarations: [],
      providers: [{ provide: LicitacionesDisponiblesService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LicitacionesVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formulario).toBeDefined();
    expect(component.adquiriente).toBeDefined();
    expect(component.detalledelaLicitacionForm).toBeDefined();
  });

  it('should call seleccionarParticipante and set showSeleccionarParticipante to true', () => {
    component.seleccionarParticipante();
    expect(component.showSeleccionarParticipante).toBe(true);
  });

  it('should fetch adquiriente data and patch the form', () => {
    component.getAdquiriente();
    expect(mockService.getAdquiriente).toHaveBeenCalled();
    expect(component.adquiriente.get('rfc')?.value).toBe('ABC123');
    expect(component.adquiriente.get('adquirienteMontoDisponible')?.value).toBe(1000);
  });

  it('should fetch entidad federativa options', () => {
    component.getEntidadFederativa();
    expect(mockService.getEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativaOptions).toEqual([]);
  });

  it('should fetch representacion federal options', () => {
    component.getRepresentacionFederal();
    expect(mockService.getRepresentacionFederal).toHaveBeenCalled();
    expect(component.representacionFederalOptions).toEqual([]);
  });

  it('should validate isInvalid method', () => {
    component.adquiriente.get('rfc')?.setValue(''); 
    component.adquiriente.get('rfc')?.markAsTouched();
    expect(component.isInvalid('rfc')).toBe(true);

    component.adquiriente.get('rfc')?.setValue('ABC123');
    expect(component.isInvalid('rfc')).toBe(false);
  });

  it('should call abrirModificarModal and set showRepresentacionFederal to true', () => {
    component.abrirModificarModal({
      numerodelicitacion: '12345',
      fechadelicitacion: '2023-10-01',
      descripcion: 'Sample description',
      montoadjudicado: '1000',
      fechainiciovigencia: 'value1',
      fechafinvigencia: 'value2'
    });
    expect(component.showRepresentacionFederal).toBe(true);
  });
});