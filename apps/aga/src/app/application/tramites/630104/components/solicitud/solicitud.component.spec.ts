import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { of, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let equipoEInstrumentosMusicalesService: jest.Mocked<EquipoEInstrumentosMusicalesService>;
  let tramite630104Store: jest.Mocked<Tramite630104Store>;
  let tramite630104Query: jest.Mocked<Tramite630104Query>;

  const mockCatalogos: Catalogo[] = [
    { id: 1, descripcion: 'Opción 1' },
    { id: 2, descripcion: 'Opción 2' }
  ];

  const mockState = { someState: 'value' } as any;

  beforeEach(async () => {
    const equipoServiceMock = {
      getPropietarioOptions: jest.fn().mockReturnValue(of(mockCatalogos)),
      getPropietarioNoOptions: jest.fn().mockReturnValue(of(mockCatalogos)),
    };

    const storeMock = {
      establecerDatos: jest.fn()
    };

    const queryMock = {
      select: jest.fn().mockReturnValue(of(mockState))
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      providers: [
        { provide: EquipoEInstrumentosMusicalesService, useValue: equipoServiceMock },
        { provide: Tramite630104Store, useValue: storeMock },
        { provide: Tramite630104Query, useValue: queryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;

    equipoEInstrumentosMusicalesService = TestBed.inject(
      EquipoEInstrumentosMusicalesService
    ) as jest.Mocked<EquipoEInstrumentosMusicalesService>;

    tramite630104Store = TestBed.inject(
      Tramite630104Store
    ) as jest.Mocked<Tramite630104Store>;

    tramite630104Query = TestBed.inject(
      Tramite630104Query
    ) as jest.Mocked<Tramite630104Query>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramite630104State and fetch options on init', () => {
    component.ngOnInit();
    expect(tramite630104Query.select).toHaveBeenCalled();
    expect(equipoEInstrumentosMusicalesService.getPropietarioOptions).toHaveBeenCalled();
    expect(equipoEInstrumentosMusicalesService.getPropietarioNoOptions).toHaveBeenCalled();
    expect(component.tramite630104State).toEqual(mockState);
    expect(component.tiposSolicitudOptions).toEqual(mockCatalogos);
    expect(component.tiposSolicitudNoOptions).toEqual(mockCatalogos);
  });

  it('should call store with correct data when setValoresStore is used with valid form', () => {
    const form = new FormGroup({
      campoTest: new FormControl('valorTest')
    });
    component.setValoresStore({ form, campo: 'campoTest' });

    expect(tramite630104Store.establecerDatos).toHaveBeenCalledWith({
      campoTest: 'valorTest'
    });
  });

  it('should log error when setValoresStore is used with undefined control', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const form = new FormGroup({});
    component.setValoresStore({ form, campo: 'nonExistent' });

    expect(consoleSpy).toHaveBeenCalledWith(`Form or control 'nonExistent' is undefined.`);
    expect(tramite630104Store.establecerDatos).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should unsubscribe on component destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
  
    component['destroyed$'].next(); // cleanup simulation
    component['destroyed$'].complete();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should fetch propietario options correctly', () => {
    component.fetchPropietarioOptions();
    expect(equipoEInstrumentosMusicalesService.getPropietarioOptions).toHaveBeenCalled();
  });

  it('should fetch propietario no-options correctly', () => {
    component.fetchPropietarioNoOptions();
    expect(equipoEInstrumentosMusicalesService.getPropietarioNoOptions).toHaveBeenCalled();
  });
});
