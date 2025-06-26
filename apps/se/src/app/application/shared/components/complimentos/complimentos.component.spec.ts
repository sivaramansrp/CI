import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplimentosComponent } from './complimentos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ComplimentosService } from '../../services/complimentos.service';

describe('ComplimentosComponent', () => {
  let component: ComplimentosComponent;
  let fixture: ComponentFixture<ComplimentosComponent>;
  let mockCatalogosService: any;
  let mockComplimentosService: any;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogoPaises: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'México' }])),
    };

    mockComplimentosService = {
      obtenerListaEstado: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Querétaro' }])),
    };

    await TestBed.configureTestingModule({
      imports: [ComplimentosComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: ComplimentosService, useValue: mockComplimentosService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit complimentosDatos and formaValida on valueChanges', (done) => {
    const spyEmitDatos = jest.spyOn(component.complimentosDatos, 'emit');
    const spyEmitValida = jest.spyOn(component.formaValida, 'emit');

    component.ngOnInit();

    component.formaComplimentos.get('programaPreOperativo')?.setValue(true);

    setTimeout(() => {
      expect(spyEmitDatos).toHaveBeenCalled();
      expect(spyEmitValida).toHaveBeenCalled();
      done();
    }, 150);
  });

  it('should call agregarAccionistas and emit accionistasAgregados', () => {
    const spyEmit = jest.spyOn(component.accionistasAgregados, 'emit');
    component.formaComplimentos.get('formaSocioAccionistas.formaDatos')?.patchValue({
      taxId: 'TAX123',
      razonSocial: 'Empresa X',
      pais: 'México',
      codigoPostal: '12345',
      estado: 'Querétaro',
      correoElectronico: 'correo@correo.com'
    });
    component.aggregarAccionistas();
    expect(spyEmit).toHaveBeenCalledWith(expect.objectContaining({ taxId: 'TAX123' }));
  });

  it('should emit accionistasEliminados when eliminarAccionistas called', () => {
    const spyEmit = jest.spyOn(component.accionistasEliminados, 'emit');
    component.empresaAccionistasSeleccionados = [{ rfc: 'RFC001' } as any];
    component.eliminarAccionistas();
    expect(spyEmit).toHaveBeenCalledWith(component.empresaAccionistasSeleccionados);
  });

  it('should emit accionistasExtranjerosEliminado when eliminarAccionistasExtranjeros called', () => {
    const spyEmit = jest.spyOn(component.accionistasExtranjerosEliminado, 'emit');
    component.accionistasExtranjerosSeleccionados = [{ rfc: 'EXT001' } as any];
    component.eliminarAccionistasExtrenjeros();
    expect(spyEmit).toHaveBeenCalledWith(component.accionistasExtranjerosSeleccionados);
  });

  it('should modify the form based on handleModificarForma logic', () => {
    component.formaComplimentos.get('formaSocioAccionistas')?.patchValue({
      nationalidadMaxicana: 'true',
    });
    const spy = jest.spyOn(component, 'modificarFormulario');
    component.handleModificarForma();
    expect(spy).toHaveBeenCalledWith(expect.any(Number), expect.any(Array));
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
