import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDelTramiteUnoComponent } from './datos-del-tramite-uno.component';
import { InvoCarService } from '../../services/invocar.service';
import { Tramite105Store } from '../../estados/tramite105.store';
import { Tramite105Query } from '../../estados/tramite105.query';
import { of } from 'rxjs';

describe('DatosDelTramiteUnoComponent', () => {
  let component: DatosDelTramiteUnoComponent;
  let fixture: ComponentFixture<DatosDelTramiteUnoComponent>;
  let mockInvoCarService: Partial<InvoCarService>;
  let mockStore: Partial<Tramite105Store>;
  let mockQuery: Partial<Tramite105Query>;

  beforeEach(async () => {
    mockInvoCarService = {
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getAduana: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    };

    mockStore = {
      setPais: jest.fn(),
      setAduana: jest.fn(),
    };

    mockQuery = {
      selectSolicitud$: of({}),
      selectPais$: of([]),
      selectAduana$: of([]),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosDelTramiteUnoComponent],
      providers: [
        { provide: InvoCarService, useValue: mockInvoCarService },
        { provide: Tramite105Store, useValue: mockStore },
        { provide: Tramite105Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario datosDelTramite correctamente', () => {
    component.crearDatosDelTramiteForm();
    expect(component.datosDelTramite).toBeDefined();
    expect(component.datosDelTramite.get('pais')?.value).toBeNull();
    expect(component.datosDelTramite.get('aduana')?.value).toBeUndefined();
  });

  it('debería llamar al servicio getPais y almacenar los datos en el store', () => {
    component.getPais();
    expect(mockInvoCarService.getPais).toHaveBeenCalled();
    expect(mockStore.setPais).toHaveBeenCalledWith([]);
  });

  it('debería habilitar y deshabilitar controles al cambiar el checkbox', () => {
    component.crearDatosDelTramiteForm();
    component.onCheckboxChange('opcion1');
    expect(component.datosDelTramite.get('pais')?.enabled).toBeTruthy();

    component.onCheckboxChange('opcion1');
    expect(component.datosDelTramite.get('pais')?.disabled).toBeTruthy();
  });

  it('debería agregar mercancías y reiniciar el formulario', () => {
    component.agregarForm.setValue({
      fraccionArancelaria: '1234',
      descripcion: 'Descripción de prueba',
      descripcionAdicional: 'Adicional',
    });

    component.agregarMercancias();
    expect(component.getMercanciaTableData.mercanciaTable.tableBody.length).toBe(1);
    expect(component.agregarForm.valid).toBeFalsy();
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const unsubscribeSpy = jest.spyOn(component.subscriptionS, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});