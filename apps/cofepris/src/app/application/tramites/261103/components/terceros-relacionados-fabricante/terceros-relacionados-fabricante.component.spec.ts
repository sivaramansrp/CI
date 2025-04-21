import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosFabricanteComponent } from './terceros-relacionados-fabricante.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { AlertComponent, Fabricante, Otros, TituloComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FABRICANTE_TABLA } from '../../../../shared/constantes/terceros-relacionados-fabricante.enum';
import { OTROS_TABLA } from '../../../../shared/constantes/terceros-relacionados-fabricante.enum';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

describe('ComponenteTercerosRelacionadosFabricante', () => {
  let componente: TercerosRelacionadosFabricanteComponent;
  let fixture: ComponentFixture<TercerosRelacionadosFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaDinamicaComponent, AlertComponent, TituloComponent],
      imports: [CommonModule, TercerosRelacionadosFabricanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosFabricanteComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(componente).toBeTruthy();
  });

  it('debería generar la configuración correcta para las tablas', () => {
    const CONFIGURACION_GENERADA: ConfiguracionColumna<Fabricante>[] = componente.generateConfiguracionTabla(FABRICANTE_TABLA);
    
    expect(Array.isArray(CONFIGURACION_GENERADA)).toBeTruthy();
    
    CONFIGURACION_GENERADA.forEach(config => {
      expect(config).toHaveProperty('encabezado');
      expect(config).toHaveProperty('clave');
      expect(config).toHaveProperty('orden');
    });
  });

  it('debería inicializarse con los datos correctos de las tablas', () => {
    expect(componente.fabricanteTablaDatos).toEqual([]);
    expect(componente.facturadorTablaDatos).toEqual([]);
    expect(componente.otrosTablaDatos).toEqual([]);
  });

  it('debería establecer el tipo de selección correcto para los checkboxes', () => {
    expect(componente.checkbox).toBe(TablaSeleccion.CHECKBOX);
  });

  it('debería generar la configuración para la tabla "Otros" correctamente', () => {
    const CONFIGURACION_GENERADA_OTROS: ConfiguracionColumna<Otros>[] = componente.generateConfiguracionTabla(OTROS_TABLA);
    
    expect(Array.isArray(CONFIGURACION_GENERADA_OTROS)).toBeTruthy();
    
    CONFIGURACION_GENERADA_OTROS.forEach(config => {
      expect(config).toHaveProperty('encabezado');
      expect(config).toHaveProperty('clave');
      expect(config).toHaveProperty('orden');
    });
  });
});
