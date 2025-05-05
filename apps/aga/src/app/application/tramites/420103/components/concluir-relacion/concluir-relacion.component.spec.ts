import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluirRelacionComponent } from './concluir-relacion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { InputFechaComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../../pages/paso-uno/paso-uno.component';

describe('ConcluirRelacionComponent', () => {
  let component: ConcluirRelacionComponent;
  let fixture: ComponentFixture<ConcluirRelacionComponent>;
  let concluirRelacionServiceMock: any;

  beforeEach(async () => {
    concluirRelacionServiceMock = {
      getDetallesDelMercanciaDatos: jest.fn().mockReturnValue(
        of({
          registroFederal: '123',
          denominacionRazonSocial: 'Test Company',
          norma: 'ISO',
          fechaInicioRelacion: '2023-01-01',
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, ConcluirRelacionComponent],
      imports: [TituloComponent, TablaDinamicaComponent, ReactiveFormsModule, InputFechaComponent],
      providers: [
        FormBuilder,
        { provide: ConcluirRelacionService, useValue: concluirRelacionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcluirRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formularioConcluirRelacion on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioConcluirRelacion).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['rfc']).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['fechaInicial']).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['fechaFinal']).toBeDefined();
  });

  it('should call crearFormularioConcluirRelacion and initialize the form', () => {
    component.crearFormularioConcluirRelacion();
    expect(component.formularioConcluirRelacion).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['rfc']).toBeDefined();
  });

  it('should fetch data and update datosTabla in buscarDatosRelacion', () => {
    component.buscarDatosRelacion();
    expect(concluirRelacionServiceMock.getDetallesDelMercanciaDatos).toHaveBeenCalled();
    expect(component.datosTabla.length).toBe(1);
    expect(component.datosTabla[0].registroFederal).toBe('123');
    expect(component.datosTabla[0].denominacionRazonSocial).toBe('Test Company');
    expect(component.datosTabla[0].norma).toBe('ISO');
    expect(component.datosTabla[0].fechaInicioRelacion).toBe('2023-01-01');
  });

  it('should handle empty data in buscarDatosRelacion', () => {
    concluirRelacionServiceMock.getDetallesDelMercanciaDatos.mockReturnValue(of(null));
    component.buscarDatosRelacion();
    expect(component.datosTabla).toEqual([]);
  });

  it('should complete destruido$ on ngOnDestroy', () => {
    const destruidoSpy = jest.spyOn(component['destruido$'], 'next');
    const completeSpy = jest.spyOn(component['destruido$'], 'complete');

    component.ngOnDestroy();

    expect(destruidoSpy).toHaveBeenCalledWith(true);
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

    expect(component.configuracionFechaFinal.labelNombre).toBe('Fecha final');
    expect(component.configuracionFechaFinal.required).toBe(false);
    expect(component.configuracionFechaFinal.habilitado).toBe(false);
  });

  it('should initialize formularioConcluirRelacion with default controls in crearFormularioConcluirRelacion', () => {
    component.crearFormularioConcluirRelacion();

    expect(component.formularioConcluirRelacion).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['rfc']).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['fechaInicial']).toBeDefined();
    expect(component.formularioConcluirRelacion.controls['fechaFinal']).toBeDefined();

  
    expect(component.formularioConcluirRelacion.controls['rfc'].value).toBe('');
    expect(component.formularioConcluirRelacion.controls['fechaInicial'].value).toBe('');
    expect(component.formularioConcluirRelacion.controls['fechaFinal'].value).toBe('');
  });
});