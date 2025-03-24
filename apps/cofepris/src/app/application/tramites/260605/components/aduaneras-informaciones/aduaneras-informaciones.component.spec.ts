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
      imports: [ReactiveFormsModule, FormsModule, AduanerasInformacionesComponent], // Agregar el componente independiente aquí
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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los valores correctos', () => {
    expect(component.aduanerasInformacionesForm.get('numeroDPmiso')?.value).toBe('12345');
    expect(component.aduanerasInformacionesForm.get('cstumbresAtuales')?.value).toBe('Justificación técnica');
  });

  it('debería llamar a setValoresStore con los argumentos correctos', () => {
    component.aduanerasInformacionesForm.get('numeroDPmiso')?.setValue('67890');
    const spySetNumeroDPmiso = jest.spyOn(store, 'setNumeroDPmiso');

    component.setValoresStore(component.aduanerasInformacionesForm, 'numeroDPmiso', 'setNumeroDPmiso');

    expect(spySetNumeroDPmiso).toHaveBeenCalledWith('67890');
  });

  it('debería agregar todas las aduanas disponibles a las aduanas seleccionadas', () => {
    component.agregarTodasAduanas();

    expect(component.aduanasDisponibles.length).toBe(0);
    expect(component.aduanasSeleccionadas.length).toBe(4); // Asumiendo que hay 4 aduanas en aduanasDisponibles
  });

  it('debería remover todas las aduanas seleccionadas y devolverlas a las aduanas disponibles', () => {
    component.agregarTodasAduanas();
    component.removerTodasAduanas();

    expect(component.aduanasSeleccionadas.length).toBe(0);
    expect(component.aduanasDisponibles.length).toBe(4); // Volver al estado original
  });

  it('debería establecer validPlafet en true al enviar el formulario', () => {
    component.onSubmit();
    expect(component.validPlafet).toBe(true);
  });

  it('debería destruir el notifier en ngOnDestroy', () => {
    const destroyNotifierNextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierNextSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('debería agregar aduanas específicas basadas en los índices', () => {
    const indicesToAdd = [0, 2];
    component.agregarAduanasSeleccionadas(indicesToAdd);

    expect(component.aduanasSeleccionadas.length).toBe(2);
    expect(component.aduanasDisponibles.length).toBe(2);
  });

  it('debería remover aduanas específicas basadas en los índices', () => {
    const indicesToAdd = [0, 1];
    component.agregarAduanasSeleccionadas(indicesToAdd);

    const indicesToRemove = [0];
    component.removerAduanasSeleccionadas(indicesToRemove);

    expect(component.aduanasSeleccionadas.length).toBe(1);
    expect(component.aduanasDisponibles.length).toBe(3);
  });

  it('debería llamar a setAduanasSeleccionadas con los argumentos correctos', () => {
    component.agregarTodasAduanas();
    const spySetAduanasSeleccionadas = jest.spyOn(store, 'setAduanasSeleccionadas');

    component.setAduanasSeleccionadas('setAduanasSeleccionadas', component.aduanasSeleccionadas);

    expect(spySetAduanasSeleccionadas).toHaveBeenCalledWith(component.aduanasSeleccionadas);
  });
});