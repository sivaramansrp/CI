import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AduanerasInformacionesComponent } from './aduaneras-informaciones.component';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { of } from 'rxjs';

describe('AduanerasInformacionesComponent', () => {
  let component: AduanerasInformacionesComponent;
  let fixture: ComponentFixture<AduanerasInformacionesComponent>;
  let store: Tramite260605Store;
  let query: Tramite260605Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
      declarations: [AduanerasInformacionesComponent],
      providers: [
        Tramite260605Store,
        {
          provide: Tramite260605Query,
          useValue: {
            selectSolicitud$: of({
              numeroDPmiso: '12345',
              cstumbresAtuales: 'Justificación técnica'
            }),
            getValue: () => ({
              numeroDPmiso: '12345',
              cstumbresAtuales: 'Justificación técnica'
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AduanerasInformacionesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite260605Store);
    query = TestBed.inject(Tramite260605Query);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with store data', () => {
    expect(component.aduanerasInformacionesForm).toBeDefined();
    expect(component.aduanerasInformacionesForm.get('numeroDPmiso')?.value).toBe('12345');
    expect(component.aduanerasInformacionesForm.get('cstumbresAtuales')?.value).toBe('Justificación técnica');
  });

  it('should set validPlafet to true on submit', () => {
    component.onSubmit();
    expect(component.validPlafet).toBe(true);
  });

  it('should call setValoresStore with correct arguments', () => {
    spyOn(store, 'setNumeroDPmiso');
    spyOn(store, 'setCstumbresAtuales');

    component.setValoresStore(component.aduanerasInformacionesForm, 'numeroDPmiso', 'setNumeroDPmiso');
    component.setValoresStore(component.aduanerasInformacionesForm, 'cstumbresAtuales', 'setCstumbresAtuales');

    expect(store.setNumeroDPmiso).toHaveBeenCalledWith('12345');
    expect(store.setCstumbresAtuales).toHaveBeenCalledWith('Justificación técnica');
  });

  it('should set selected index on setIndiceSeleccionado', () => {
    component.setIndiceSeleccionado(1, 'add');
    expect(component.indiceSeleccionado).toBe(1);

    component.setIndiceSeleccionado(2, 'remove');
    expect(component.indiceRemover).toBe(2);
  });

  it('should add all customs to selectedCustoms on agregarTodasAduanas', () => {
    component.agregarTodasAduanas();
    expect(component.aduanasSeleccionadas.length).toBe(4);
    expect(component.aduanasDisponibles.length).toBe(0);
  });

  it('should add selected customs to selectedCustoms on agregarAduanasSeleccionadas', () => {
    component.agregarAduanasSeleccionadas([0, 1]);
    expect(component.aduanasSeleccionadas.length).toBe(2);
    expect(component.aduanasDisponibles.length).toBe(2);
  });

  it('should remove selected customs from selectedCustoms on removerAduanasSeleccionadas', () => {
    component.aduanasSeleccionadas = [
      { id: 1, name: 'ACAPULCO, PUERTO Y AEROPUERTO' },
      { id: 2, name: 'ADUANA DE PANTACO' }
    ];
    component.removerAduanasSeleccionadas([0]);
    expect(component.aduanasSeleccionadas.length).toBe(1);
    expect(component.aduanasDisponibles.length).toBe(3);
  });

  it('should remove all customs from selectedCustoms on removerTodasAduanas', () => {
    component.aduanasSeleccionadas = [
      { id: 1, name: 'ACAPULCO, PUERTO Y AEROPUERTO' },
      { id: 2, name: 'ADUANA DE PANTACO' }
    ];
    component.removerTodasAduanas();
    expect(component.aduanasSeleccionadas.length).toBe(0);
    expect(component.aduanasDisponibles.length).toBe(4);
  });

  it('should call setAduanasSeleccionadas with correct arguments', () => {
    spyOn(store, 'setAduanasSeleccionadas');
    const aduanas = [
      { id: 1, name: 'ACAPULCO, PUERTO Y AEROPUERTO' },
      { id: 2, name: 'ADUANA DE PANTACO' }
    ];
    component.setAduanasSeleccionadas('setAduanasSeleccionadas', aduanas);
    expect(store.setAduanasSeleccionadas).toHaveBeenCalledWith(aduanas);
  });

  it('should destroy notifier on ngOnDestroy', () => {
    spyOn(component['destroyNotifier$'], 'next');
    spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});