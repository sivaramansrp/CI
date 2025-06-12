import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoComponent } from './aviso.component';
import { AvisoService } from '../../services/aviso.service';
import { Tramite32505Store } from '../../../../estados/tramites/trimite32505.store';
import { Tramite32505Query } from '../../../../estados/queries/tramite32505.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';

describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let avisoServiceMock: any;
  let tramiteQueryMock: any;
  let storeMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    avisoServiceMock = {
      obtenerPais: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombre: 'México' }] })),
      obtenerAnio: jest.fn().mockReturnValue(of({ datos: [2023, 2024] })),
      obtenerCilindros: jest.fn().mockReturnValue(of({ datos: [4, 6, 8] })),
      obtenerCombustible: jest.fn().mockReturnValue(of({ datos: ['Gasolina', 'Diesel'] })),
      obtenerAduana: jest.fn().mockReturnValue(of({ datos: ['Aduana 1', 'Aduana 2'] })),
      obtenerPaisIssued: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombre: 'USA' }] })),
      obtenerAvisoTabla: jest.fn().mockReturnValue(of({ datos: [] })),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };

    storeMock = {
      setTipoBusqueda: jest.fn(),
      setTipoBusquedaAviso: jest.fn(),
      setFolioTipo: jest.fn(),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,AvisoComponent,HttpClientModule],
      providers: [
        { provide: AvisoService, useValue: avisoServiceMock },
        { provide: Tramite32505Store, useValue: storeMock },
        { provide: Tramite32505Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.aviosForm).toBeDefined();
  });

  





 


 



  it('should update store values when setValoresStore is called', () => {
    const form = component.adaceForm;
    form.get('tipoBusqueda')?.setValue('Manual');
    component.setValoresStore(form, 'tipoBusqueda', 'setTipoBusqueda');
    expect(storeMock.setTipoBusqueda).toHaveBeenCalledWith('Manual');
  });

  it('should handle mostrarCampos correctly', () => {
    component.adaceForm.get('tipoBusqueda')?.setValue('Manual');
    component.mostrarCampos();
    expect(component.datosDelAvisoVisible).toBe(true);
    expect(component.datosCargaMasiva).toBe(false);

    component.adaceForm.get('tipoBusqueda')?.setValue('Carga masiva');
    component.mostrarCampos();
    expect(component.datosDelAvisoVisible).toBe(false);
    expect(component.datosCargaMasiva).toBe(true);
  });



  it('should handle mostrarCamposAviso with empty values', () => {
    component.aviosForm.get('tipoBusquedaAviso')?.setValue('');
    component.mostrarCamposAviso();
    expect(component.datosDelVehiculo).toBe(false);
    expect(component.datosFolioVUCEM).toBe(false);
  });

  it('should reset form and clear options on openModalCancelarTramite', () => {
    component.openModalCancelarTramite();
    expect(component.aviosForm.pristine).toBe(true);
    expect(component.optionsPais).toEqual([]);
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});