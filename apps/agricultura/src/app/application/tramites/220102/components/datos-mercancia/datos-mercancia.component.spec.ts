import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { DatosMercanciaService } from '../../services/datos-mercancia/datos-mercancia.service';
import exp from 'constants';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent,DatosMercanciaComponent],
      providers: [
    { provide: DatosMercanciaService }
  ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.spyOn(component as any, 'obtenerNombreComun');
    jest.spyOn(component as any, 'obtenerNombreCientifico');
    jest.spyOn(component as any, 'obtenerUso');
    jest.spyOn(component as any, 'obtenerPaisProcedencia');
    jest.spyOn(component as any, 'obtenerTipoProducto');
    jest.spyOn(component as any, 'obtenerPaisOrigen');
    jest.spyOn(component as any, 'obtenerUmc');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.valid).toBeFalsy();
  });
it('should call all obtener* functions and set readonly state', () => {
    component.ngOnInit(); 
    expect((component as any).obtenerNombreComun).toHaveBeenCalled();
    expect((component as any).obtenerNombreCientifico).toHaveBeenCalled();
    expect((component as any).obtenerUso).toHaveBeenCalled(); 
    expect((component as any).obtenerPaisProcedencia).toHaveBeenCalled();
    expect((component as any).obtenerTipoProducto).toHaveBeenCalled();
    expect((component as any).obtenerPaisOrigen).toHaveBeenCalled();
    expect((component as any).obtenerUmc).toHaveBeenCalled();
  });
  it('should set form disable', () => {
    component.esFormularioSoloLectura = true;
    component.ngAfterViewInit();
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.formMercancia.disabled).toBe(true);
  });
  it('Should be enable form when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura=false;
    component.ngAfterViewInit();
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.formMercancia.disabled).toBe(false);
  });
  it('should call crearFormulario on ngOnInit', () => {
    const crearFormSpy = jest.spyOn(component as any, 'crearFormulario');
    component.ngOnInit();
    expect(crearFormSpy).toHaveBeenCalled();
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.valid).toBe(false);
  });

it('should clean up subscriptions in ngOnDestroy', () => {
  const subject = (component as any).destroyNotifier$;
  const spyNext = jest.spyOn(subject, 'next');
  const spyComplete = jest.spyOn(subject, 'complete');
  component.ngOnDestroy();
  expect(spyNext).toHaveBeenCalled();          
  expect(spyComplete).toHaveBeenCalled();       
  expect(subject).toBeDefined();                
});
 
});

