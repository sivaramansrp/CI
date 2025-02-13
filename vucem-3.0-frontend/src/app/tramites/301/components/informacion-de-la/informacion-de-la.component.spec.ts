import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionDeLaComponent } from './informacion-de-la.component';
import { ReactiveFormsModule } from '@angular/forms';


import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { SelectCatalogosComponent } from "../../../../shared/components/select-catalogos/select-catalogos.component";
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('InformacionDeLaComponent', () => {
  let component: InformacionDeLaComponent;
  let fixture: ComponentFixture<InformacionDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionDeLaComponent],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BtnContinuarComponent,
        SelectCatalogosComponent,
        TituloComponent
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
    component.valorSeleccionadoFraccion({ id: 1 });
    expect(component.informacionDeLaform.get('descripcionFraccion')?.enabled).toBeTrue();
  });

  it('should disable descripcionFraccion when no fraccionArancelaria is selected', () => {
    component.valorSeleccionadoFraccion({ id: null });
    expect(component.informacionDeLaform.get('descripcionFraccion')?.disabled).toBeTrue();
  });

  it('should enable descripcionNico when a nico is selected', () => {
    component.valorSeleccionadoNico({ id: 1 });
    expect(component.informacionDeLaform.get('descripcionNico')?.enabled).toBeTrue();
  });

  it('should disable descripcionNico when no nico is selected', () => {
    component.valorSeleccionadoNico({ id: null });
    expect(component.informacionDeLaform.get('descripcionNico')?.disabled).toBeTrue();
  });

  it('should patch estadoFisico value when a estadoFisico is selected', () => {
    component.valorSeleccionadoEstado({ id: 1 });
    expect(component.informacionDeLaform.get('estadoFisico')?.value).toBe(1);
  });

  it('should log the event value when getValorIndice is called', () => {
    spyOn(console, 'log');
    const event = { value: 'test' };
    component.getValorIndice(event);
    expect(console.log).toHaveBeenCalledWith(event);
  });
});