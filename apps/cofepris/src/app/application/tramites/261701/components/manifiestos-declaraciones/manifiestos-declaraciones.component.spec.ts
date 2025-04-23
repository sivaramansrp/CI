import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosDeclaracionesComponent } from './manifiestos-declaraciones.component';
import { Tramite261701Store } from '../../estados/store/tramite261701.store';
import { Tramite261701Query } from '../../estados/query/tramite261701.query';
import { of, Subject } from 'rxjs';

describe('ManifiestosDeclaracionesComponent', () => {
  let component: ManifiestosDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosDeclaracionesComponent>;
  let MOCK_TRAMITE261701_STORE: jest.Mocked<Tramite261701Store>;
  let MOCK_TRAMITE261701_QUERY: jest.Mocked<Tramite261701Query>;

  beforeEach(async () => {
    MOCK_TRAMITE261701_STORE = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<Tramite261701Store>;

    MOCK_TRAMITE261701_QUERY = {
      select$: of({
        manifiestos: true,
      }),
    } as unknown as jest.Mocked<Tramite261701Query>;

    await TestBed.configureTestingModule({
      imports: [ManifiestosDeclaracionesComponent],
      providers: [
        { provide: Tramite261701Query, useValue: MOCK_TRAMITE261701_QUERY },
        { provide: Tramite261701Store, useValue: MOCK_TRAMITE261701_STORE },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
    component = fixture.componentInstance;
    component.destroyNotifier$ = new Subject<void>();

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería suscribirse a select$ en ngOnInit', () => {
    const ESPIA_SUBSCRIBIR = jest.spyOn(MOCK_TRAMITE261701_QUERY.select$, 'subscribe');
    component.ngOnInit();
    expect(ESPIA_SUBSCRIBIR).toHaveBeenCalled();
    expect(component.cancelacionPeticionState).toEqual({ manifiestos: true });
  });

  it('debería establecer el valor del checkbox en establecerValor', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    component.cancelacionPeticionState = { manifiestos: true };

    component.establecerValor();

    const ELEMENTO_CHECKBOX = document.getElementById('manifiestos') as HTMLInputElement;
    expect(ELEMENTO_CHECKBOX.checked).toBe(true);
  });

  it('debería limpiar las suscripciones y completar destroyNotifier$ en ngOnDestroy', () => {
    const ESPIA_NOTIFICADOR_SIGUIENTE = jest.spyOn(component.destroyNotifier$, 'next');
    const ESPIA_NOTIFICADOR_COMPLETAR = jest.spyOn(component.destroyNotifier$, 'complete');

    // ngOnDestroy
    component.ngOnDestroy();

    // Assertions
    expect(ESPIA_NOTIFICADOR_SIGUIENTE).toHaveBeenCalled();
    expect(ESPIA_NOTIFICADOR_COMPLETAR).toHaveBeenCalled();
  });

  it('debería agregar un evento de clic al checkbox en ngAfterViewInit', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    const ELEMENTO_CHECKBOX = document.getElementById('manifiestos') as HTMLInputElement;

    const ESPIA_AGREGAR_EVENTO = jest.spyOn(ELEMENTO_CHECKBOX, 'addEventListener');
    component.ngAfterViewInit();

    expect(ESPIA_AGREGAR_EVENTO).toHaveBeenCalledWith('click', expect.any(Function));
  });

  it('debería actualizar manifiestosCheckboxChecked y llamar a establecerDatos al hacer clic en el checkbox', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    const ELEMENTO_CHECKBOX = document.getElementById('manifiestos') as HTMLInputElement;

    component.ngAfterViewInit();

    ELEMENTO_CHECKBOX.checked = true;
    ELEMENTO_CHECKBOX.click();

    expect(component.manifiestosCheckboxChecked).toBe(true);
    expect(MOCK_TRAMITE261701_STORE.establecerDatos).toHaveBeenCalledWith('manifiestos', true);

    ELEMENTO_CHECKBOX.checked = false;
    ELEMENTO_CHECKBOX.click();

    expect(component.manifiestosCheckboxChecked).toBe(false);
    expect(MOCK_TRAMITE261701_STORE.establecerDatos).toHaveBeenCalledWith('manifiestos', false);
  });
});