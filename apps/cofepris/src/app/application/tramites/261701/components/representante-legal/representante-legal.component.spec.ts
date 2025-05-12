import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { Tramite261702Store } from 'apps/cofepris/src/app/application/estados/tramites/tramite261702.store';
import { Tramite261702Query } from 'apps/cofepris/src/app/application/estados/queries/tramite261702.query';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let MOCK_TRAMITE261702_STORE: jest.Mocked<Tramite261702Store>;
  let MOCK_TRAMITE261702_QUERY: jest.Mocked<Tramite261702Query>;

  beforeEach(async () => {
    MOCK_TRAMITE261702_STORE = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<Tramite261702Store>;

    MOCK_TRAMITE261702_QUERY = {
      selectRetiros$: of({
        rfc: 'rfc',
      }),
    } as unknown as jest.Mocked<Tramite261702Query>;

    await TestBed.configureTestingModule({
      imports: [RepresentanteLegalComponent, HttpClientModule],
      providers: [
        { provide: Tramite261702Query, useValue: MOCK_TRAMITE261702_QUERY },
        { provide: Tramite261702Store, useValue: MOCK_TRAMITE261702_STORE },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    const GRUPO_FORMULARIO_NINO = component.forma.get('ninoFormGroup') as FormGroup;
    expect(GRUPO_FORMULARIO_NINO).toBeDefined();
    expect(component.forma).toBeDefined();
  });

  it('debería actualizar los controles del formulario y llamar al store al hacer clic en el botón', () => {
    const EVENTO: ModeloDeFormaDinamica = {
      id: 'consultarIDC',
      labelNombre: 'Buscar',
      campo: 'buscar',
      clase: 'col-md-8',
      tipoInput: 'button',
      desactivado: false,
      marginTop: 5,
    };

    component.alHacerClicEnElBoton(EVENTO);
    const GRUPO_FORMULARIO_NINO = component.forma.get('ninoFormGroup') as FormGroup;
    GRUPO_FORMULARIO_NINO.addControl('nombre', new FormGroup({}));
    GRUPO_FORMULARIO_NINO.addControl('apellidoPaterno', new FormGroup({}));
    GRUPO_FORMULARIO_NINO.addControl('apellidoMaterno', new FormGroup({}));

    expect(GRUPO_FORMULARIO_NINO.get('nombre')?.value).toEqual(47875);
    expect(GRUPO_FORMULARIO_NINO.get('apellidoPaterno')?.value).toEqual('Paterno');
    expect(GRUPO_FORMULARIO_NINO.get('apellidoMaterno')?.value).toEqual('Materno');
  });

  it('debería suscribirse a selectRetiros$ en ngOnInit', () => {
    const ESPIA_SUBSCRIBIR = jest.spyOn(MOCK_TRAMITE261702_QUERY.selectRetiros$, 'subscribe');
    component.ngOnInit();
    expect(ESPIA_SUBSCRIBIR).toHaveBeenCalled();
    expect(component.cancelacionState).toEqual({ rfc: 'rfc' });
  });

  it('debería activar valueChanges y actualizar el store', () => {
    const GRUPO_FORMULARIO_NINO = component.ninoFormGroup;
    GRUPO_FORMULARIO_NINO.addControl('campoPrueba', new FormBuilder().control('valorInicial'));
    GRUPO_FORMULARIO_NINO.get('campoPrueba')?.setValue('nuevoValor');
    expect(MOCK_TRAMITE261702_STORE.setDynamicFieldValue).toHaveBeenCalledWith('campoPrueba', 'nuevoValor');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const ESPIA_NOTIFICADOR_SIGUIENTE = jest.spyOn(component['destruirNotificador$'], 'next');
    const ESPIA_NOTIFICADOR_COMPLETAR = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(ESPIA_NOTIFICADOR_SIGUIENTE).toHaveBeenCalled();
    expect(ESPIA_NOTIFICADOR_COMPLETAR).toHaveBeenCalled();
  });

  it('debería establecer y eliminar validadores dinámicamente', () => {
    const GRUPO_FORMULARIO_NINO = component.ninoFormGroup;
    GRUPO_FORMULARIO_NINO.addControl('rfc', new FormBuilder().control(''));
    GRUPO_FORMULARIO_NINO.get('rfc')?.setValidators([Validators.required]);
    GRUPO_FORMULARIO_NINO.get('rfc')?.updateValueAndValidity();
    expect(GRUPO_FORMULARIO_NINO.get('rfc')?.validator).toBeDefined();
    GRUPO_FORMULARIO_NINO.get('rfc')?.setValidators([]);
    GRUPO_FORMULARIO_NINO.get('rfc')?.updateValueAndValidity();
    expect(GRUPO_FORMULARIO_NINO.get('rfc')?.validator).toBeNull();
  });
});