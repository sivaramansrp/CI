import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PaisProcedenciaComponent } from './pais-procedencia.component';
import { of, Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';

jest.mock('@libs/shared/theme/assets/json/130106/fraccion.json', () => ({
  bloque: [
    { id: 1, descripcion: 'Bloque A' },
    { id: 2, descripcion: 'Bloque B' },
  ],
}));

describe('PaisProcedenciaComponent - ngOnInit', () => {
  let component: PaisProcedenciaComponent;
  let fixture: ComponentFixture<PaisProcedenciaComponent>;

  const mockImportacionState = {
    justificacion: 'Test justification',
    observaciones: 'Test observations'
  };

  let selectImportacion$Mock: any;

  beforeEach(async () => {
    // Default observable value
    selectImportacion$Mock = of(mockImportacionState);

    await TestBed.configureTestingModule({
      imports: [PaisProcedenciaComponent],
      providers: [
        {
          provide: Tramite130103Query,
          useValue: {
            get selectImportacion$() {
              return selectImportacion$Mock;
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaisProcedenciaComponent);
    component = fixture.componentInstance;

    component.paisProcedenciaFormData = [
      {
        id: 'bloque',
        labelNombre: 'Bloque',
        campo: 'bloque',
        clase: 'col-md-4',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [
          { tipo: '' }
        ],
        marcadorDePosicion: 'Selecciona un valor',
        marginTop: 0
      } as any
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate bloque from JSON, populate form values from state', fakeAsync(async () => {
    component.forma = new FormGroup({
      justificacion: new FormControl('Test justification'),
      observaciones: new FormControl('Test observations')
    });
    await component.ngOnInit();
    tick();
    expect(component.bloque).toEqual([
      { id: 1, descripcion: 'Bloque A' },
      { id: 2, descripcion: 'Bloque B' }
    ]);
    expect(component.forma.get('justificacion')?.value).toBe('Test justification');
    expect(component.forma.get('observaciones')?.value).toBe('Test observations');
  }));

  it('should not populate form if state is null', fakeAsync(async () => {
    selectImportacion$Mock = of(null);
    component.forma = new FormGroup({
      justificacion: new FormControl(''),
      observaciones: new FormControl('')
    });
    await component.ngOnInit();
    tick();
    expect(component.forma.get('justificacion')?.value).toBe('');
    expect(component.forma.get('observaciones')?.value).toBe('');
  }));

  it('should call establecerCambioDeValor with correct data', () => {
    const spy = jest.spyOn(component as any, 'establecerCambioDeValor');
    const mockEvent = {
      target: { value: 'nuevo valor' }
    } as unknown as Event;
    component.eventoDeCambioDeValor(mockEvent, 'nombreCampo');
    expect(spy).toHaveBeenCalledWith({
      campo: 'nombreCampo',
      valor: 'nuevo valor',
    });
  });

  it('should call next and complete on destroyNotifier$ when ngOnDestroy is called', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from observables when ngOnDestroy is called', fakeAsync(() => {
    const mockObservable$ = new Subject();
    const spy = jest.fn();
    mockObservable$
      .pipe(takeUntil(component['destroyNotifier$']))
      .subscribe(spy);
    mockObservable$.next('first value');
    expect(spy).toHaveBeenCalledWith('first value');
    component.ngOnDestroy();
    mockObservable$.next('second value');
    expect(spy).toHaveBeenCalledTimes(1);
  }));
  
  
});
