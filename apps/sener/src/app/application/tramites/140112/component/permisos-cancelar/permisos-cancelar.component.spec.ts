import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisosCancelarComponent } from './permisos-cancelar.component';
import { PermisosCancelarService } from '../../service/permisos-cancelar.service';
import { Tramite140112Store } from '../../estados/tramite-140112.store'
import { Tramite140112Query } from '../../estados/tramite-140112.query';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('PermisosCancelarComponent', () => {
  let component: PermisosCancelarComponent;
  let fixture: ComponentFixture<PermisosCancelarComponent>
  let permisosCancelarServiceSpy: any;
  let storeSpy: any;
  let querySpy: any
  let fb: FormBuilder;
  beforeEach(async () => {
    const permisosCancelarServiceMock = {
      getPermisosCancelar: jest.fn(),
      isValid: jest.fn(),
    };
    const storeMock = {
      setDesistimiento: jest.fn(),
    };

    const queryMock = {
      selectDesistimiento$: new Subject().asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, PermisosCancelarComponent, TablaDinamicaComponent, CommonModule, FormsModule,
        HttpClientTestingModule],
      providers: [
        { provide: PermisosCancelarService, useValue: permisosCancelarServiceMock },
        { provide: Tramite140112Store, useValue: storeMock },
        { provide: Tramite140112Query, useValue: queryMock },
        FormBuilder,
      ],
    }).compileComponents();

    permisosCancelarServiceSpy = TestBed.inject(PermisosCancelarService)
    storeSpy = TestBed.inject(Tramite140112Store);
    querySpy = TestBed.inject(Tramite140112Query);
    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(PermisosCancelarComponent);
    component = fixture.componentInstance;
    component.solicitud = fb.group({
      descripcionClobGenerica1: ['test', []],
      declaracionBoolean: [true, []],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(component.TablaSeleccion).toBe(TablaSeleccion.CHECKBOX);
    expect(component.configuracionTabla.length).toBe(7);
    expect(component.permisosCancelar).toEqual([]);
    expect(component.manifestoDeVeracidad).toBe('De conformidad con el artículo 57, fracción 11, y 58 de la ley Federal de Procedimiento Administrativo* Manifiesto decir verdad');
    expect(component.motivoDesistimientotextBox).toBe('');
    expect(component.obtenerFilasSeleccionadas).toEqual([]);
    expect(component.confirmarVeracidad).toBe('');
    expect(component.estmarcado).toBe(false);
  });



  it('should select or deselect all rows', () => {
    const event = { target: { checked: true } } as any;
    component.seleccionarDeseleccionarTodos(event);
    expect(component.estmarcado).toBe(true);
    expect(component.confirmarVeracidad).toBe(component.manifestoDeVeracidad);
    const event2 = { target: { checked: false } } as any;
    component.seleccionarDeseleccionarTodos(event2);
    expect(component.estmarcado).toBe(false);
    expect(component.confirmarVeracidad).toBe('');
  });

  it('should set values in store', () => {
    component.setValoresStore();
    expect(storeSpy.setDesistimiento).toHaveBeenCalledWith('test');
  });
  it('should validate form field', () => {
    permisosCancelarServiceSpy.isValid.mockReturnValue(true);
  });
  it('should unsubscribe on destroy', () => {
    const destroy$Spy = jest.spyOn((component as any).destroy$, 'next');
    const complete$Spy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
    expect(complete$Spy).toHaveBeenCalled();
  });

  it('should patch form value on init', () => {
    const desistimientoSubject = new Subject<string>();
    (querySpy.selectDesistimiento$ as any) = desistimientoSubject.asObservable();
    component.ngOnInit();
    desistimientoSubject.next('test data');
    expect(component.solicitud.get('descripcionClobGenerica1')?.value).toBe('test data');
  });
});
