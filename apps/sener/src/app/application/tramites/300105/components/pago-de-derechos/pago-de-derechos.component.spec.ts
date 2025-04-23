import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { Tramite300105Store } from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramite300105StoreMock: jest.Mocked<Tramite300105Store>;
  let tramite300105QueryMock: jest.Mocked<Tramite300105Query>;
  let autorizacionDeRayosXServiceMock: jest.Mocked<AutorizacionDeRayosXService>;

  beforeEach(async () => {
    tramite300105StoreMock = {
        setllaveDePago: jest.fn(),
    } as unknown as jest.Mocked<Tramite300105Store>;

    tramite300105QueryMock = {
        selectTramite300105$: of({
            claveDeReferencia: 'REF123',
            cadenaDependencia: 'DEPENDENCIA',
            banco: 'BANCO1',
            llaveDePago: 'LLAVE123',
            fechaPago: '2023-01-01',
            importePago: 1000,
        }),
    } as unknown as jest.Mocked<Tramite300105Query>;

    autorizacionDeRayosXServiceMock = {
        getBancoData: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Banco 1' }])),
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite300105Store, useValue: tramite300105StoreMock },
        { provide: Tramite300105Query, useValue: tramite300105QueryMock },
        { provide: AutorizacionDeRayosXService, useValue: autorizacionDeRayosXServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch data on ngOnInit', () => {
    expect(component.formSolicitud).toBeDefined();
    expect(component.datosImportadorExportador.get('claveDeReferencia')?.value).toBe('REF123');
    expect(component.datosImportadorExportador.get('cadenaDependencia')?.value).toBe('DEPENDENCIA');
    expect(component.datosImportadorExportador.get('banco')?.value).toBe('BANCO1');
    expect(component.datosImportadorExportador.get('llaveDePago')?.value).toBe('LLAVE123');
    expect(component.datosImportadorExportador.get('fechaPago')?.value).toBe('2023-01-01');
    expect(component.datosImportadorExportador.get('importePago')?.value).toBe(1000);
  });

  it('should fetch banco data on fetchBancoData', () => {
    component.fetchBancoData();
    expect(autorizacionDeRayosXServiceMock.getBancoData).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([{ id: '1', descripcion: 'Banco 1' }]);
  });

  it('should capitalize llaveDePago and update the store on manejarCambioLlavePago', () => {
    component.datosImportadorExportador.get('llaveDePago')?.setValue('llave123');
    component.manejarCambioLlavePago();
    expect(component.datosImportadorExportador.get('llaveDePago')?.value).toBe('LLAVE123');
    expect(tramite300105StoreMock.setllaveDePago).toHaveBeenCalledWith('LLAVE123');
  });

  it('should update the store value on setValoresStore', () => {
    const form = component.datosImportadorExportador;
    form.get('banco')?.setValue('BANCO1');
    component.setValoresStore(form, 'banco');
    expect(tramite300105StoreMock.setllaveDePago).toHaveBeenCalledWith('BANCO1');
  });

  it('should clean up on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should return datosImportadorExportador form group', () => {
    const formGroup = component.datosImportadorExportador;
    expect(formGroup).toBe(component.formSolicitud.get('datosImportadorExportador'));
  });
});