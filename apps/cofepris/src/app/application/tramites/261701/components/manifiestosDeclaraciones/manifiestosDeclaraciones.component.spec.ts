import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosDeclaracionesComponent } from './manifiestosDeclaraciones.component';
import { Tramite261701Store } from '../../estados/store/tramite261701.store';
import { Tramite261701Query } from '../../estados/query/tramite261701.query';
import { of, Subject } from 'rxjs';

describe('ManifiestosDeclaracionesComponent', () => {
  let component: ManifiestosDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosDeclaracionesComponent>;
  let mockTramite261701Store: jest.Mocked<Tramite261701Store>;
  let mockTramite261701Query: jest.Mocked<Tramite261701Query>;

  beforeEach(async () => {
    mockTramite261701Store = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<Tramite261701Store>;

    mockTramite261701Query = {
      select$: of({
        manifiestos: true,
      }),
    } as unknown as jest.Mocked<Tramite261701Query>;

    await TestBed.configureTestingModule({
      imports: [ManifiestosDeclaracionesComponent],
      providers: [
        { provide: Tramite261701Query, useValue: mockTramite261701Query },
        { provide: Tramite261701Store, useValue: mockTramite261701Store },
      ],
  
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
    component = fixture.componentInstance;
    component.destroyNotifier$ = new Subject<void>();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to select$ on ngOnInit', () => {
    const spy = jest.spyOn(mockTramite261701Query.select$, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.CancelacionPeticionState).toEqual({ manifiestos: true });
  });


  it('should set the checkbox value on establecerValor', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    component.CancelacionPeticionState = { manifiestos: true };

    component.establecerValor();

    const checkbox = document.getElementById('manifiestos') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should clean up subscriptions and complete destroyNotifier$ on ngOnDestroy', () => {
    const notifierNextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const notifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
  
    // ngOnDestroy
    component.ngOnDestroy();
  
    // Assertions
    expect(notifierNextSpy).toHaveBeenCalled();
    expect(notifierCompleteSpy).toHaveBeenCalled();
  });

  it('should add click event listener to checkbox in ngAfterViewInit', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    const checkbox = document.getElementById('manifiestos') as HTMLInputElement;

    const addEventListenerSpy = jest.spyOn(checkbox, 'addEventListener');
    component.ngAfterViewInit();

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });

  it('should update manifiestosCheckboxChecked and call establecerDatos on checkbox click', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    const checkbox = document.getElementById('manifiestos') as HTMLInputElement;

    component.ngAfterViewInit();

    checkbox.checked = true;
    checkbox.click();

    expect(component.manifiestosCheckboxChecked).toBe(true);
    expect(mockTramite261701Store.establecerDatos).toHaveBeenCalledWith('manifiestos', true);

    checkbox.checked = false;
    checkbox.click();

    expect(component.manifiestosCheckboxChecked).toBe(false);
    expect(mockTramite261701Store.establecerDatos).toHaveBeenCalledWith('manifiestos', false);
  });
});
