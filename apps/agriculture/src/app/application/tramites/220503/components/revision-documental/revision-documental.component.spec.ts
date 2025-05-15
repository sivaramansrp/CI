import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevisionDocumentalComponent } from './revision-documental.component';
import { CommonModule } from '@angular/common';
import { DatosGeneralesComponent } from '../../shared/datos-generales/datos-generales.component';
import { PagoDeDerechosComponent } from '../../shared/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../../shared/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent, AlertComponent } from '@ng-mf/data-access-user';

describe('RevisionDocumentalComponent', () => {
  let component: RevisionDocumentalComponent;
  let fixture: ComponentFixture<RevisionDocumentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RevisionDocumentalComponent,
        DatosGeneralesComponent,
        PagoDeDerechosComponent,
        TercerosRelacionadosComponent,
        TituloComponent,
        AlertComponent,
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(RevisionDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have default values for properties', () => {
    expect(component.indice).toBe(1);
    expect(component.colapsable).toBe(true);
    expect(component.currentIndex).toBe(1);
    expect(component.rows).toEqual([]);
    expect(component.forma).toBe('');
  });

  test('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
