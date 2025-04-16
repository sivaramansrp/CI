import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosDeclaracionesComponent } from './manifiestosDeclaraciones.component';
import { Tramite261702Store } from '../../../../estados/tramites/tramite261702.store';
import { Tramite261702Query } from '../../../../estados/queries/tramite261702.query';
import { of, Subject, Subscription } from 'rxjs';

describe('ManifiestosDeclaracionesComponent', () => {
  let component: ManifiestosDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosDeclaracionesComponent>;
  let mockTramite261702Store: jest.Mocked<Tramite261702Store>;
  let mockTramite261702Query: jest.Mocked<Tramite261702Query>;

  beforeEach(async () => {
    mockTramite261702Store = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<Tramite261702Store>;

    mockTramite261702Query = {
      selectRetiros$: of({
        manifiestos: true,
      }),
    } as unknown as jest.Mocked<Tramite261702Query>;

    await TestBed.configureTestingModule({
      imports: [ManifiestosDeclaracionesComponent],
      providers: [
        { provide: Tramite261702Query, useValue: mockTramite261702Query },
        { provide: Tramite261702Store, useValue: mockTramite261702Store },
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

  it('should subscribe to selectRetiros$ on ngOnInit', () => {
    const spy = jest.spyOn(mockTramite261702Query.selectRetiros$, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.retirosCofeprisState).toEqual({ manifiestos: true });
  });


  it('should set the checkbox value on establecerValor', () => {
    document.body.innerHTML = `<input id="manifiestos" type="checkbox" />`;
    component.retirosCofeprisState = { manifiestos: true };

    component.establecerValor();

    const checkbox = document.getElementById('manifiestos') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should clean up subscriptions and complete destroyNotifier$ on ngOnDestroy', () => {
    // Spy on relevant methods
    const notifierNextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const notifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
  
    // Call ngOnDestroy
    component.ngOnDestroy();
  
    // Assertions
    expect(notifierNextSpy).toHaveBeenCalled();
    expect(notifierCompleteSpy).toHaveBeenCalled();
  });



});
