import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

describe('ManifiestoComponent', () => {
  let component: ManifiestoComponent;
  let fixture: ComponentFixture<ManifiestoComponent>;
  let mockStore: jest.Mocked<Tramite630104Store>;
  let mockQuery: jest.Mocked<Tramite630104Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630104State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630104Store>;

    mockQuery = {
      selectTramite630104State$: of({
        declaracion: 'Declaración de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630104Query>;

    await TestBed.configureTestingModule({
      declarations: [ManifiestoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite630104Store, useValue: mockStore },
        { provide: Tramite630104Query, useValue: mockQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifiestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.manifiestoFormulario.value).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('should update declaracion in the form and store when setValorStore is called', () => {
    const newValue = 'Nueva declaración';
    component.manifiestoFormulario.patchValue({ declaracion: newValue });

    component.setValorStore(component.manifiestoFormulario, 'declaracion');

    expect(mockStore.setTramite630104State).toHaveBeenCalledWith({
      declaracion: newValue,
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});