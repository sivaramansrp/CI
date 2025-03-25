import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoRenunciaDeDerechosComponent } from './permiso-renuncia-de-derechos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RenunciaDeDerechosAlServicio } from '../../services/renuncia-de-derechos-al.service';
import { Tramite140111Store } from '../../estados/tramite140111.store';
import { Tramite140111Query } from '../../estados/tramite140111.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('PermisoRenunciaDeDerechosComponent', () => {
  let component: PermisoRenunciaDeDerechosComponent;
  let fixture: ComponentFixture<PermisoRenunciaDeDerechosComponent>;
  let mockRenunciaDeDerechosAlServicio: jest.Mocked<RenunciaDeDerechosAlServicio>;
  let mockTramite140111Query: jest.Mocked<Tramite140111Query>;
  let mockTramite140111Store: jest.Mocked<Tramite140111Store>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    mockRenunciaDeDerechosAlServicio = {
      getDescripcionDelCupo: jest.fn().mockReturnValue(of({
        folioTrámite: '123',
        tipoDeSolicitud: 'Solicitud 1',
        régimen: 'Regimen 1',
        clasificaciónDelRégimen: 'Clasificación 1',
        periodoDeVigencia: 'Vigencia 1',
        unidadDeMedida: 'Unidad 1',
        fracciónArancelaria: 'Fracción 1',
        cantidadAutorizada: 'Cantidad 1',
        valorAutorizado: 'Valor 1',
        nico: 'Nico 1',
        descripciónNico: 'Descripción 1',
        acotación: 'Acotación 1',
        permisoVálidoDesde: 'Desde 1',
        permisoVálidoHasta: 'Hasta 1',
      }))
    } as any;
  
    mockTramite140111Query = {
      selectTramite140111$: of({
        motivoRenunciaDeDerechos: 'Motivo 1',
      })
    } as any;
  
    mockTramite140111Store = {
      setMotivoRenunciaDeDerechos: jest.fn()
    } as any;
  
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        PermisoRenunciaDeDerechosComponent, // Move to imports
        TituloComponent
      ],
      providers: [
        FormBuilder,
        { provide: RenunciaDeDerechosAlServicio, useValue: mockRenunciaDeDerechosAlServicio },
        { provide: Tramite140111Query, useValue: mockTramite140111Query },
        { provide: Tramite140111Store, useValue: mockTramite140111Store },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(PermisoRenunciaDeDerechosComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.crearpermisoForm();
    expect(component.permisoForm).toBeDefined();
    expect(component.permisoForm.get('folioTrámite')?.value).toBe('');
    expect(component.permisoForm.get('tipoDeSolicitud')?.value).toBe('');
    expect(component.permisoForm.get('régimen')?.value).toBe('');
    expect(component.permisoForm.get('clasificaciónDelRégimen')?.value).toBe('');
    expect(component.permisoForm.get('periodoDeVigencia')?.value).toBe('');
    expect(component.permisoForm.get('unidadDeMedida')?.value).toBe('');
    expect(component.permisoForm.get('fracciónArancelaria')?.value).toBe('');
    expect(component.permisoForm.get('cantidadAutorizada')?.value).toBe('');
    expect(component.permisoForm.get('valorAutorizado')?.value).toBe('');
    expect(component.permisoForm.get('nico')?.value).toBe('');
    expect(component.permisoForm.get('descripciónNico')?.value).toBe('');
    expect(component.permisoForm.get('acotación')?.value).toBe('');
    expect(component.permisoForm.get('permisoVálidoDesde')?.value).toBe('');
    expect(component.permisoForm.get('permisoVálidoHasta')?.value).toBe('');
    expect(component.permisoForm.get('motivoRenunciaDeDerechos')?.value).toBe('');
    expect(component.permisoForm.get('controlar')?.value).toBe(true);
  });

  it('should patch form values from service', () => {
    component.enPatchForm();
    expect(component.permisoForm.get('folioTrámite')?.value).toBe('123');
    expect(component.permisoForm.get('tipoDeSolicitud')?.value).toBe('Solicitud 1');
    expect(component.permisoForm.get('régimen')?.value).toBe('Regimen 1');
    expect(component.permisoForm.get('clasificaciónDelRégimen')?.value).toBe('Clasificación 1');
    expect(component.permisoForm.get('periodoDeVigencia')?.value).toBe('Vigencia 1');
    expect(component.permisoForm.get('unidadDeMedida')?.value).toBe('Unidad 1');
    expect(component.permisoForm.get('fracciónArancelaria')?.value).toBe('Fracción 1');
    expect(component.permisoForm.get('cantidadAutorizada')?.value).toBe('Cantidad 1');
    expect(component.permisoForm.get('valorAutorizado')?.value).toBe('Valor 1');
    expect(component.permisoForm.get('nico')?.value).toBe('Nico 1');
    expect(component.permisoForm.get('descripciónNico')?.value).toBe('Descripción 1');
    expect(component.permisoForm.get('acotación')?.value).toBe('Acotación 1');
    expect(component.permisoForm.get('permisoVálidoDesde')?.value).toBe('Desde 1');
    expect(component.permisoForm.get('permisoVálidoHasta')?.value).toBe('Hasta 1');
  });

  it('should patch stored form data', () => {
    component.datosGuardadosParche();
    expect(component.permisoForm.get('motivoRenunciaDeDerechos')?.value).toBe('Motivo 1');
  });

  it('should set values in store', () => {
    component.permisoForm.get('motivoRenunciaDeDerechos')?.setValue('New Motivo');
    component.setValoresStore(component.permisoForm, 'motivoRenunciaDeDerechos', 'setMotivoRenunciaDeDerechos');
    expect(mockTramite140111Store.setMotivoRenunciaDeDerechos).toHaveBeenCalledWith('New Motivo');
  });

  it('should return true if control is invalid', () => {
    component.permisoForm.get('motivoRenunciaDeDerechos')?.setValue('');
    component.permisoForm.get('motivoRenunciaDeDerechos')?.markAsTouched();
    expect(component.esInvalido('motivoRenunciaDeDerechos')).toBe(true);
  });

  it('should return false if control is valid', () => {
    component.permisoForm.get('motivoRenunciaDeDerechos')?.setValue('Valid Motivo');
    component.permisoForm.get('motivoRenunciaDeDerechos')?.markAsTouched();
    expect(component.esInvalido('motivoRenunciaDeDerechos')).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});