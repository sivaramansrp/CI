import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduanerasInformacionesComponent } from './aduaneras-informaciones.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { of, Subject } from 'rxjs';

describe('AduanerasInformacionesComponent', () => {
  let component: AduanerasInformacionesComponent;
  let fixture: ComponentFixture<AduanerasInformacionesComponent>;
  let tramite260605Store: Tramite260605Store;
  let tramite260605Query: Tramite260605Query;
  let modificatNoticeService: ModificatNoticeService;

  const mockAduanasDisponibles = [
    { id: 1, name: 'Aduana 1' },
    { id: 2, name: 'Aduana 2' },
  ];

  const mockSolicitudState = {
    numeroDePermiso: '12345',
    costumbresActuales: 'Costumbres Test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AduanerasInformacionesComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: Tramite260605Store,
          useValue: {
            setNumeroDePermiso: jest.fn(),
            setCostumbresActuales: jest.fn(),
            setAduanasSeleccionadas: jest.fn(),
          },
        },
        {
          provide: Tramite260605Query,
          useValue: {
            selectSolicitud$: of(mockSolicitudState),
          },
        },
        {
          provide: ModificatNoticeService,
          useValue: {
            obteneraduanasDisponiblesdatos: jest.fn().mockReturnValue(of(mockAduanasDisponibles)),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AduanerasInformacionesComponent);
    component = fixture.componentInstance;
    tramite260605Store = TestBed.inject(Tramite260605Store);
    tramite260605Query = TestBed.inject(Tramite260605Query);
    modificatNoticeService = TestBed.inject(ModificatNoticeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.aduanerasInformacionesForm).toBeDefined();
    expect(component.aduanerasInformacionesForm.get('numeroDePermiso')?.value).toBe(
      mockSolicitudState.numeroDePermiso
    );
    expect(component.aduanerasInformacionesForm.get('cstumbresAtuales')?.value).toBe(
      mockSolicitudState.costumbresActuales
    );
  });

  it('should call obteneraduanasDisponiblesdatos and set aduanasDisponibles', () => {
    component.obteneraduanasDisponiblesdatos();
    expect(modificatNoticeService.obteneraduanasDisponiblesdatos).toHaveBeenCalled();
    expect(component.aduanasDisponibles).toEqual(mockAduanasDisponibles);
  });

  it('should set selected index for adding or removing aduanas', () => {
    component.setIndiceSeleccionado(1, 'add');
    expect(component.indiceSeleccionado).toBe(1);

    component.setIndiceSeleccionado(2, 'remove');
    expect(component.indiceRemover).toBe(2);
  });

  it('should add all available aduanas to selected aduanas', () => {
    component.aduanasDisponibles = [...mockAduanasDisponibles];
    component.agregarTodasAduanas();
    expect(component.aduanasSeleccionadas).toEqual(mockAduanasDisponibles);
    expect(component.aduanasDisponibles).toEqual([]);
  });

  it('should add selected aduanas to selected aduanas', () => {
    component.aduanasDisponibles = [...mockAduanasDisponibles];
    component.agregarAduanasSeleccionadas([0]);
    expect(component.aduanasSeleccionadas).toEqual([mockAduanasDisponibles[0]]);
    expect(component.aduanasDisponibles).toEqual([mockAduanasDisponibles[1]]);
  });

  it('should remove selected aduanas from selected aduanas', () => {
    component.aduanasSeleccionadas = [...mockAduanasDisponibles];
    component.removerAduanasSeleccionadas([0]);
    expect(component.aduanasSeleccionadas).toEqual([mockAduanasDisponibles[1]]);
    expect(component.aduanasDisponibles).toEqual([mockAduanasDisponibles[0]]);
  });

  it('should remove all selected aduanas', () => {
    component.aduanasSeleccionadas = [...mockAduanasDisponibles];
    component.removerTodasAduanas();
    expect(component.aduanasSeleccionadas).toEqual([]);
    expect(component.aduanasDisponibles).toEqual(mockAduanasDisponibles);
  });

  it('should set selected aduanas in the store', () => {
    const spy = jest.spyOn(tramite260605Store, 'setAduanasSeleccionadas');
    component.setAduanasSeleccionadas('setAduanasSeleccionadas', mockAduanasDisponibles);
    expect(spy).toHaveBeenCalledWith(mockAduanasDisponibles);
  });

  it('should mark the form as valid on submit', () => {
    component.enEnviar();
    expect(component.esFormularioValido).toBe(true);
  });

  it('should clean up subscriptions on component destroy', () => {
    const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});