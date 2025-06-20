import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Solicitud260906State, Tramite260906Store } from "../../../../estados/tramites/tramite260906.store";
import { DatosEstablecimientoComponent } from "../../../260211/components/datosEstablecimiento/datosEstablecimiento.component";
import { Tramite260906Query } from "../../../../estados/queries/tramite260906.query";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { of } from "rxjs";

describe('DatosEstablecimientoComponent', () => {
  let component: DatosEstablecimientoComponent;
  let fixture: ComponentFixture<DatosEstablecimientoComponent>;
  let tramite260906Store: Tramite260906Store;
  let tramite260906Query: Tramite260906Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CommonModule, DatosEstablecimientoComponent],
      providers: [
        FormBuilder,
        { provide: Tramite260906Store, useValue: jasmine.createSpyObj('Tramite260906Store', ['setTipoOperacion']) },
        { provide: Tramite260906Query, useValue: jasmine.createSpyObj('Tramite260906Query', ['selectSolicitud$']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosEstablecimientoComponent);
    component = fixture.componentInstance;
    tramite260906Store = TestBed.inject(Tramite260906Store);
    tramite260906Query = TestBed.inject(Tramite260906Query);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();

    expect(component.forma.value).toEqual({
      tipoOperacion: 'operacion1',
      tipoOperacionJustificacion: 'justificacion',
      rfcResponsableSanitario: 'RFC123',
      denominacion: 'Denominacion',
      correo: 'correo@example.com',
    });
  });

  it('should toggle colapsable state when mostrar_colapsable is called', () => {
    component.colapsable = true;
    component.mostrar_colapsable();
    expect(component.colapsable).toBeFalsy();

    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should enable all form controls when toggleFormControls is called', () => {
    component.forma = new FormGroup({
      control1: new FormControl({ value: '', disabled: true }),
      control2: new FormControl({ value: '', disabled: true }),
    });

    component.toggleFormControls();

    expect(component.forma.get('control1')?.enabled).toBe(true);
    expect(component.forma.get('control2')?.enabled).toBe(true);
  });

  it('should call setTipoOperacion on the store when setTipoOperacion is called', () => {
    const evento = 'newOperation';

    expect(tramite260906Store.setTipoOperacion).toHaveBeenCalledWith(evento);
  });

  it('should call setValoresStore with correct parameters', () => {
    const mockForm = new FormGroup({
      campo: new FormControl('valor'),
    });
    const metodoNombre = 'setDenominacion';

    spyOn(tramite260906Store, metodoNombre as keyof Tramite260906Store);

    component.setValoresStore(mockForm, 'campo', metodoNombre);

    expect(tramite260906Store[metodoNombre]).toHaveBeenCalledWith('valor');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    spyOn(component['destroyNotifier$'], 'next');
    spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });
});