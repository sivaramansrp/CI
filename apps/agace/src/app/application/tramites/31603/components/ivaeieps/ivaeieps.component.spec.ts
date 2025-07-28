import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { IvaeiepsComponent } from './ivaeieps.component';
import { RegistrosDeComercioExteriorService } from '../../services/registros-de-comercio-exterior.service';
import { Tramite31603IvaeiepsStore } from '../../estados/stores/tramite31603ivaeieps.store';
import { Tramite31603IvaeiepsQuery } from '../../estados/queries/tramite31603ivaeieps.query';

describe('IvaeiepsComponent', () => {
  let component: IvaeiepsComponent;
  let fixture: ComponentFixture<IvaeiepsComponent>;
  let comercioExteriorSvcMock: any;
  let tramite31603QueryMock: any;
  let bsModalServiceMock: { show: jest.Mock };

  beforeEach(async () => {
    comercioExteriorSvcMock = {
      getEmpresasTablaDatos: jest.fn().mockReturnValue(of([])),
      getBancoDatos: jest.fn().mockReturnValue(of({ data: [] })),
      getInversionTablaDatos: jest.fn().mockReturnValue(of([])),
      getTipoInversionDatos: jest.fn().mockReturnValue(of({ data: [] })),
    };

    tramite31603QueryMock = {
      selectSolicitud$: of({
        indiqueIva: 'test',
        empleados: 10,
        infraestructura: 'test',
        monto: 1000,
        antiguedad: 5,
      }),
    };

    bsModalServiceMock = { show: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, IvaeiepsComponent],
      providers: [
        { provide: RegistrosDeComercioExteriorService, useValue: comercioExteriorSvcMock },
        { provide: Tramite31603IvaeiepsQuery, useValue: tramite31603QueryMock },
        { provide: BsModalService, useValue: bsModalServiceMock },
        { provide: Tramite31603IvaeiepsStore, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IvaeiepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ivaEiepsFormGroup with default values', () => {
    expect(component.ivaEiepsFormGroup.value).toEqual({
      indiqueIva: 'test',
      empleados: 10,
      infraestructura: 'test',
      monto: 1000,
      antiguedad: 5,
    });
  });

  it('should call getEmpresasDelGrupoDatos and set empresasDelGrupoDatos', () => {
    comercioExteriorSvcMock.getEmpresasTablaDatos.mockReturnValue(of([{ id: 1, name: 'Empresa 1' }]));
    component.getEmpresasDelGrupoDatos();
    expect(comercioExteriorSvcMock.getEmpresasTablaDatos).toHaveBeenCalled();
    expect(component.empresasDelGrupoDatos).toEqual([{ id: 1, name: 'Empresa 1' }]);
  });

  it('should update predeterminadoSeleccionar when cambioDeValorIndique is called', () => {
    component.cambioDeValorIndique('newValue');
    expect(component.predeterminadoSeleccionar).toBe('newValue');
  });

  it('should initialize ivaForm with default values and validators', () => {
    const rfcControl = component.ivaForm.get('rfc');
    expect(rfcControl?.valid).toBeFalsy();
    rfcControl?.setValue('ABC123456789');
    expect(rfcControl?.valid).toBeTruthy();
  });

  it('should complete destroyNotifier$ on component destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
