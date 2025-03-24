import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduanerasInformacionesComponent } from './aduaneras-informaciones.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { of } from 'rxjs';

describe('AduanerasInformacionesComponent', () => {
  let component: AduanerasInformacionesComponent;
  let fixture: ComponentFixture<AduanerasInformacionesComponent>;
  let store: jest.Mocked<Tramite260605Store>;
  let query: jest.Mocked<Tramite260605Query>;

  beforeEach(async () => {
    // Mock store and query methods
    store = {
      setNumeroDPmiso: jest.fn(),
      setCstumbresAtuales: jest.fn(),
      setAduanasSeleccionadas: jest.fn(),
    } as any;

    query = {
      selectSolicitud$: of({
        numeroDPmiso: '12345',
        cstumbresAtuales: 'Justificación técnica',
      }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AduanerasInformacionesComponent], // Add the standalone component here
      providers: [
        FormBuilder,
        { provide: Tramite260605Store, useValue: store },
        { provide: Tramite260605Query, useValue: query },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AduanerasInformacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values', () => {
    expect(component.aduanerasInformacionesForm.get('numeroDPmiso')?.value).toBe('12345');
    expect(component.aduanerasInformacionesForm.get('cstumbresAtuales')?.value).toBe('Justificación técnica');
  });

  it('should call setValoresStore with correct arguments', () => {
    component.aduanerasInformacionesForm.get('numeroDPmiso')?.setValue('67890');
    const spySetNumeroDPmiso = jest.spyOn(store, 'setNumeroDPmiso');

    component.setValoresStore(component.aduanerasInformacionesForm, 'numeroDPmiso', 'setNumeroDPmiso');

    expect(spySetNumeroDPmiso).toHaveBeenCalledWith('67890');
  });

  it('should add all available aduanas to selected aduanas', () => {
    component.agregarTodasAduanas();

    expect(component.aduanasDisponibles.length).toBe(0);
    expect(component.aduanasSeleccionadas.length).toBe(4); // Assuming there are 4 aduanas in aduanasDisponibles
  });

  it('should remove all selected aduanas and return them to available aduanas', () => {
    component.agregarTodasAduanas();
    component.removerTodasAduanas();

    expect(component.aduanasSeleccionadas.length).toBe(0);
    expect(component.aduanasDisponibles.length).toBe(4); // Back to the original state
  });

  it('should set validPlafet to true on form submission', () => {
    component.onSubmit();
    expect(component.validPlafet).toBe(true);
  });

  it('should destroy notifier on ngOnDestroy', () => {
    const destroyNotifierNextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierNextSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('should add specific aduanas based on indices', () => {
    const indicesToAdd = [0, 2];
    component.agregarAduanasSeleccionadas(indicesToAdd);

    expect(component.aduanasSeleccionadas.length).toBe(2);
    expect(component.aduanasDisponibles.length).toBe(2);
  });

  it('should remove specific aduanas based on indices', () => {
    const indicesToAdd = [0, 1];
    component.agregarAduanasSeleccionadas(indicesToAdd);

    const indicesToRemove = [0];
    component.removerAduanasSeleccionadas(indicesToRemove);

    expect(component.aduanasSeleccionadas.length).toBe(1);
    expect(component.aduanasDisponibles.length).toBe(3);
  });

  it('should call setAduanasSeleccionadas with correct arguments', () => {
    component.agregarTodasAduanas();
    const spySetAduanasSeleccionadas = jest.spyOn(store, 'setAduanasSeleccionadas');

    component.setAduanasSeleccionadas('setAduanasSeleccionadas', component.aduanasSeleccionadas);

    expect(spySetAduanasSeleccionadas).toHaveBeenCalledWith(component.aduanasSeleccionadas);
  });
});
