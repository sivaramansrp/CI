import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluirRelacionComponent } from './concluir-relacion.component';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';

describe('ConcluirRelacionComponent', () => {
  let component: ConcluirRelacionComponent;
  let fixture: ComponentFixture<ConcluirRelacionComponent>;
  let concluirRelacionServiceMock: any;

  beforeEach(async () => {
    concluirRelacionServiceMock = {
      getDetallesDelMercanciaDatos: jest.fn().mockReturnValue(of({
        registroFederal: '123',
        denominacionRazonSocial: 'Test Company',
        norma: 'ISO',
        fechaInicioRelacion: '2023-01-01',
      })),
    };

    await TestBed.configureTestingModule({
      declarations: [ConcluirRelacionComponent],
      providers: [
        FormBuilder,
        { provide: ConcluirRelacionService, useValue: concluirRelacionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcluirRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize concluirRelacionForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.concluirRelacionForm).toBeDefined();
    expect(component.concluirRelacionForm.controls['rfc']).toBeDefined();
    expect(component.concluirRelacionForm.controls['fechaInicial']).toBeDefined();
    expect(component.concluirRelacionForm.controls['fechaFinal']).toBeDefined();
  });

  it('should call concluirRelacion and initialize the form', () => {
    component.concluirRelacion();
    expect(component.concluirRelacionForm).toBeDefined();
    expect(component.concluirRelacionForm.controls['rfc']).toBeDefined();
  });

  it('should fetch data and update configuracionTablaDatos in buscarConcluirRelacionDatos', () => {
    component.buscarConcluirRelacionDatos();
    expect(concluirRelacionServiceMock.getDetallesDelMercanciaDatos).toHaveBeenCalled();
    expect(component.configuracionTablaDatos.length).toBe(1);
    expect(component.configuracionTablaDatos[0].registroFederal).toBe('123');
    expect(component.configuracionTablaDatos[0].denominacionRazonSocial).toBe('Test Company');
    expect(component.configuracionTablaDatos[0].norma).toBe('ISO');
    expect(component.configuracionTablaDatos[0].fechaInicioRelacion).toBe('2023-01-01');
  });

  it('should handle empty data in buscarConcluirRelacionDatos', () => {
    concluirRelacionServiceMock.getDetallesDelMercanciaDatos.mockReturnValue(of(null));
    component.buscarConcluirRelacionDatos();
    expect(component.configuracionTablaDatos).toEqual([]);
  });

  it('should update fechaInicioVigencia in the form on onFechaFinVigenciaChange', () => {
    const mockDate = '2023-01-01';
    component.concluirRelacionForm = new FormBuilder().group({
      fechaInicioVigencia: '',
    });

    component.onFechaFinVigenciaChange(mockDate);

    expect(component.concluirRelacionForm.value.fechaInicioVigencia).toEqual(mockDate);
  });

  it('should not throw an error if onFechaFinVigenciaChange is called without a valid form', () => {
    const mockDate = '2023-01-01';
    component.concluirRelacionForm = undefined as any; // Simulate an undefined form

    expect(() => component.onFechaFinVigenciaChange(mockDate)).not.toThrow();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have correct table configuration', () => {
    expect(component.configuracionTabla.length).toBe(4);
    expect(component.configuracionTabla[0].encabezado).toBe('Registro Federal');
    expect(component.configuracionTabla[1].encabezado).toBe('Denominación o Razón Social');
  });

  it('should initialize fecha controls with default values', () => {
    expect(component.configuracionFechaInicial.labelNombre).toBe('Fecha inicial');
    expect(component.configuracionFechaInicial.required).toBe(false);
    expect(component.configuracionFechaInicial.habilitado).toBe(false);

    expect(component.configuracionfechaFinal.labelNombre).toBe('Fecha inicial');
    expect(component.configuracionfechaFinal.required).toBe(false);
    expect(component.configuracionfechaFinal.habilitado).toBe(false);
  });

  it('should initialize concluirRelacionForm with default controls in concluirRelacion', () => {
    component.concluirRelacion();

    expect(component.concluirRelacionForm).toBeDefined();
    expect(component.concluirRelacionForm.controls['rfc']).toBeDefined();
    expect(component.concluirRelacionForm.controls['fechaInicial']).toBeDefined();
    expect(component.concluirRelacionForm.controls['fechaFinal']).toBeDefined();

    // Check default values
    expect(component.concluirRelacionForm.controls['rfc'].value).toBe('');
    expect(component.concluirRelacionForm.controls['fechaInicial'].value).toBe('');
    expect(component.concluirRelacionForm.controls['fechaFinal'].value).toBe('');
  });
});
