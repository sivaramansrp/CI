import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datosCertificado.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { of, Subject } from 'rxjs';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let mockService: jest.Mocked<ValidarInicalmenteService>;
  let mockQuery: jest.Mocked<Tramite110208Query>;

  beforeEach(async () => {
    mockService = {
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Estado1' }] })),
    } as unknown as jest.Mocked<ValidarInicalmenteService>;

    mockQuery = {
      selectSolicitud$: of({
        observaciones: 'Test Observaciones',
        idioma: 'ES',
        entidadFederativaCertificado: 'Entidad1',
        representacionFederal: 'Representacion1',
      }),
    } as jest.Mocked<Tramite110208Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosCertificadoComponent],
      providers: [
        FormBuilder,
        { provide: ValidarInicalmenteService, useValue: mockService },
        { provide: Tramite110208Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a obtenerEstadoList al inicializar', () => {
    expect(mockService.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, name: 'Estado1' }]);
  });

  it('debe actualizar el store cuando se llama setValoresStore', () => {
    const form = component.formDatosCertificado;
    form.get('idioma')?.setValue('EN');
    component.setValoresStore(form, 'idioma', 'setIdioma');
    // Aquí podrías agregar expect a un mock del store si lo tuvieras
  });

  it('debe poblar la lista de estado cuando se llama obtenerEstadoList', () => {
    component.obtenerEstadoList();
    expect(component.estado).toEqual([{ id: 1, name: 'Estado1' }]);
  });

  it('debe limpiar los observables al destruir el componente', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyedSpy = jest.spyOn(component['destroyNotifier$'], 'next');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyedSpy).toHaveBeenCalled();
  });

  it('debe marcar el formulario como inválido si faltan campos requeridos', () => {
    component.formDatosCertificado.get('idioma')?.setValue('');
    component.formDatosCertificado.get('entidadFederativa')?.setValue('');
    component.formDatosCertificado.get('representacionFederal')?.setValue('');
    expect(component.formDatosCertificado.valid).toBeFalsy();
  });

  it('debe marcar el formulario como válido si todos los campos requeridos están llenos', () => {
    component.formDatosCertificado.get('idioma')?.setValue('EN');
    component.formDatosCertificado.get('entidadFederativa')?.setValue('Entidad2');
    component.formDatosCertificado.get('representacionFederal')?.setValue('Representacion2');
    expect(component.formDatosCertificado.valid).toBeTruthy();
  });
});
