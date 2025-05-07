import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TercerosComponent } from './terceros.component';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { ConfiguracionItem, DESTINARIO_TABLE_ENTRY } from '../../enum/tereceors.enum';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;
  let permisoCitesService: jest.Mocked<PermisoCitesService>;
  let tramite230902Store: jest.Mocked<Tramite230902Store>;
  let tramite230902Query: jest.Mocked<Tramite230902Query>;

  beforeEach(async () => {
    const permisoCitesServiceMock = {
      inicializaTercerosDatosCatalogos: jest.fn(),
    };
    const tramite230902StoreMock = {
      setIsPopupOpen: jest.fn(),
      setIsPopupClose: jest.fn(),
      setEntidadFederativa: jest.fn(),
    };
    const tramite230902QueryMock = {
      selectSolicitud$: jest.fn().mockReturnValue(of({ entidadFederativa: 'Test' })),
    };

    await TestBed.configureTestingModule({
      declarations: [TercerosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PermisoCitesService, useValue: permisoCitesServiceMock },
        { provide: Tramite230902Store, useValue: tramite230902StoreMock },
        { provide: Tramite230902Query, useValue: tramite230902QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    permisoCitesService = TestBed.inject(PermisoCitesService) as jest.Mocked<PermisoCitesService>;
    tramite230902Store = TestBed.inject(Tramite230902Store) as jest.Mocked<Tramite230902Store>;
    tramite230902Query = TestBed.inject(Tramite230902Query) as jest.Mocked<Tramite230902Query>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should handle row selection', () => {
    const filaSeleccionada: ConfiguracionItem[] = [{ ...DESTINARIO_TABLE_ENTRY }];
    component.onFilaSeleccionada(filaSeleccionada);
    expect(component.isModificarEnabled).toBeTruthy();

    component.onFilaSeleccionada([]);
    expect(component.isModificarEnabled).toBeFalsy();
  });

  it('should clean up subscriptions on destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});