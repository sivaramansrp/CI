import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { ImportacionDefinitivaService } from '../../services/importacion-definitiva.service';
import { of } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockService: jest.Mocked<ImportacionDefinitivaService>;
  
  beforeEach(async () => {
    mockService = {
      getImportacionDefinitivaData: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent, HttpClientTestingModule],
      providers: [
        { provide: ImportacionDefinitivaService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice and emit event when seleccionaTab is called', () => {
    const spyEmit = jest.spyOn(component.pestanaCambiado, 'emit');
    const newIndex = 3;
    component.seleccionaTab(newIndex);
    expect(component.indice).toBe(newIndex);
    expect(spyEmit).toHaveBeenCalledWith(newIndex);
  });

  it('should handle invalid indice gracefully', () => {
    const spyEmit = jest.spyOn(component.pestanaCambiado, 'emit');
    const invalidIndex = NaN;
    component.seleccionaTab(invalidIndex);
    expect(component.indice).toBe(NaN);
    expect(spyEmit).toHaveBeenCalledWith(invalidIndex);
  });

  it('should emit the pestanaCambiado event with correct value', (done) => {
    const newIndex = 2;
    component.pestanaCambiado.subscribe((value) => {
      expect(value).toBe(newIndex);
      done();
    });
    component.seleccionaTab(newIndex);
  });

  it('should set esDatosRespuesta true when consultaState.update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('guardarDatosFormulario should update state and call actualizarEstadoFormulario for each key', () => {
    const mockData = {
      datosEmpresa: { nombre: 'Empresa' },
      especifico: ['valor']
    };
    mockService.getImportacionDefinitivaData.mockReturnValue(of(mockData));
    component.guardarDatosFormulario();
    expect(mockService.getImportacionDefinitivaData).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith('datosEmpresa', mockData.datosEmpresa);
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith('especifico', mockData.especifico);
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
