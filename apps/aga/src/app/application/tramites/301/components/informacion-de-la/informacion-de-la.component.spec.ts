
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { InformacionDeLaComponent } from './informacion-de-la.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';


describe('InformacionDeLaComponent', () => {
  let component: InformacionDeLaComponent;
  let fixture: ComponentFixture<InformacionDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BtnContinuarComponent,
        CatalogoSelectComponent,
        TituloComponent,InformacionDeLaComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.informacionDeLaform).toBeDefined();
    expect(component.informacionDeLaform.get('fraccionArancelaria')?.value).toBe('');
    expect(component.informacionDeLaform.get('descripcionFraccion')?.value).toBe('');
    expect(component.informacionDeLaform.get('nico')?.value).toBe('');
    expect(component.informacionDeLaform.get('descripcionNico')?.value).toBe('');
    expect(component.informacionDeLaform.get('nombreQuimico')?.value).toBe('');
    expect(component.informacionDeLaform.get('nombreComercial')?.value).toBe('');
    expect(component.informacionDeLaform.get('numeroCAS')?.value).toBe('');
    expect(component.informacionDeLaform.get('estadoFisico')?.value).toBe('');
    expect(component.informacionDeLaform.get('acondicionamiento')?.value).toBe('');
  });

  it('should enable descripcionFraccion when a fraccionArancelaria is selected', () => {
    component.informacionDeLaform.get('fraccionArancelaria')?.setValue('some value');
    component.valorSeleccionadoFraccion();
    expect(component.informacionDeLaform.get('descripcionFraccion')?.enabled).toBe(true);
  });

  it('should disable descripcionFraccion when no fraccionArancelaria is selected', () => {
    component.informacionDeLaform.get('fraccionArancelaria')?.setValue('');
    component.valorSeleccionadoFraccion();
    expect(component.informacionDeLaform.get('descripcionFraccion')?.disabled).toBe(true);
  });

  it('should enable descripcionNico when a nico is selected', () => {
    component.informacionDeLaform.get('nico')?.setValue('some value');
    component.valorSeleccionadoNico();
    expect(component.informacionDeLaform.get('descripcionNico')?.enabled).toBe(true);
  });

  it('should disable descripcionNico when no nico is selected', () => {
    component.informacionDeLaform.get('nico')?.setValue('');
    component.valorSeleccionadoNico();
    expect(component.informacionDeLaform.get('descripcionNico')?.disabled).toBe(true);
  });


});