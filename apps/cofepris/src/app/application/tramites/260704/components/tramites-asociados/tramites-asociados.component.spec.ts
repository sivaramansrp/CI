import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramitesAsociadosComponent } from './tramites-asociados.component';
import { ConsultaService } from '../../service/consulta.service';
import { of, ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

describe('TramitesAsociadosComponent', () => {
  let component: TramitesAsociadosComponent;
  let fixture: ComponentFixture<TramitesAsociadosComponent>;
  let consultaServiceMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerTablaTramites: jest.fn().mockReturnValue(of([
        { folioTramite: '12345', tipoTramite: 'Tipo 1', estatus: 'Activo', fechaRegistro: '2025-04-10' },
        { folioTramite: '67890', tipoTramite: 'Tipo 2', estatus: 'Inactivo', fechaRegistro: '2025-04-11' },
      ])),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, TablaDinamicaComponent,TramitesAsociadosComponent],
      declarations: [],
      providers: [
        { provide: ConsultaService, useValue: consultaServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TramitesAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch data on ngOnInit', () => {
    const spyObtenerTablaTramites = jest.spyOn(component, 'obtenerTablaTramites');
    component.ngOnInit();
    expect(spyObtenerTablaTramites).toHaveBeenCalled();
    expect(component.datosDestinatario).toEqual([
      { folioTramite: '12345', tipoTramite: 'Tipo 1', estatus: 'Activo', fechaRegistro: '2025-04-10' },
      { folioTramite: '67890', tipoTramite: 'Tipo 2', estatus: 'Inactivo', fechaRegistro: '2025-04-11' },
    ]);
  });

  it('should fetch tramites data in obtenerTablaTramites', () => {
    component.obtenerTablaTramites();
    expect(consultaServiceMock.obtenerTablaTramites).toHaveBeenCalled();
    expect(component.datosDestinatario).toEqual([
      { folioTramite: '12345', tipoTramite: 'Tipo 1', estatus: 'Activo', fechaRegistro: '2025-04-10' },
      { folioTramite: '67890', tipoTramite: 'Tipo 2', estatus: 'Inactivo', fechaRegistro: '2025-04-11' },
    ]);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComplete).toHaveBeenCalled();
  });
});