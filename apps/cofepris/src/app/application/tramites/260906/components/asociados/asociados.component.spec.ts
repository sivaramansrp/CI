import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AsociadosComponent } from './asociados.component';
import { SanitarioService } from '../../services/sanitario.service';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { Permiso260906Query } from '../../../../estados/queries/permiso260906.query';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

describe('AsociadosComponent', () => {
  let component: AsociadosComponent;
  let fixture: ComponentFixture<AsociadosComponent>;
  let mockSanitarioService: Partial<SanitarioService>;
  let mockSanitarioStore: Partial<Sanitario260906Store>;
  let mockPermisoQuery: Partial<Permiso260906Query>;

  beforeEach(async () => {
    mockSanitarioService = {
      getDatos: jest.fn().mockReturnValue(of([])),
      obtenerDatosDeSolicitud: jest.fn().mockReturnValue(of({ tablaFilaDatos: [] })),
    };

    mockSanitarioStore = {
      setreferencia: jest.fn(),
      setcadenaDependencia: jest.fn(),
      setbanco: jest.fn(),
      setLlave: jest.fn(),
      settipoFetch: jest.fn(),
      setimporte: jest.fn(),
    };

    mockPermisoQuery = {
      selectSolicitud$: new Subject(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, AsociadosComponent, TablaDinamicaComponent, CatalogoSelectComponent],
      providers: [
        { provide: SanitarioService, useValue: mockSanitarioService },
        { provide: Sanitario260906Store, useValue: mockSanitarioStore },
        { provide: Permiso260906Query, useValue: mockPermisoQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.derechosForm).toBeDefined();
    expect(component.derechosForm.value).toEqual({
      referencia: null,
      cadenaDependencia: null,
      llave: null,
      banco: null,
      tipoFetch: null,
      importe: null,
    });
  });

  it('should bind data to the dynamic table', () => {
    component.solicitudDatos = [
      { fechaCreacion: '2023-01-01', mercancia: 'Type A', cantidad: '10', proovedor: 'Provider A', "SCIANLista": {
                "tableHeader": [
                    "Clave S.C.I.A.N",
                    "Descripción del S.C.I.A.N."
                ],
                "tableBody": [
                    {
                        "tbodyData": [
                            "311321",
                            "Deshidratación  de productos agrícolas alimecticios."
                        ]
                    },
                    {
                        "tbodyData": [
                            "614074",
                            "Deshidratación  de productos agrícolas alimecticios."
                        ]
                    }
                ]
            }, },
    ];
    fixture.detectChanges();

    const tableComponent = fixture.debugElement.nativeElement.querySelector('app-tabla-dinamica');
    expect(tableComponent).toBeTruthy();
    expect(tableComponent.getAttribute('datos')).toBeDefined();
  });

  it('should load data from the service on initialization', () => {
    expect(mockSanitarioService.getDatos).toHaveBeenCalled();
    expect(mockSanitarioService.obtenerDatosDeSolicitud).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});