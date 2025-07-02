import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CuposService } from '../../services/cupos.service';
import { ConsultaioQuery, SolicitanteComponent } from '@ng-mf/data-access-user';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockCuposService: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockCuposService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: 'value' })),
      actualizarEstadoFormulario: jest.fn()
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent,HttpClientTestingModule],
      providers: [
        { provide: CuposService, useValue: mockCuposService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

 
  it('should set esDatosRespuesta and call actualizarEstadoFormulario in guardarDatosFormularios', () => {
    const resp = { test: 'value' };
    mockCuposService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(resp));
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockCuposService.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
  });

  it('should set indice and emit dataEmitter in seleccionaTab', () => {
    const emitSpy = jest.spyOn(component.dataEmitter, 'emit');
    component.indice = 1;
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});