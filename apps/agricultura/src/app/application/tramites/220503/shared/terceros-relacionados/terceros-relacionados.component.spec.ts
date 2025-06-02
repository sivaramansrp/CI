import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { CommonModule } from '@angular/common';
import { AlertComponent, TituloComponent } from '@ng-mf/data-access-user';
import {
  DESTINATARIO_ITEM,
  EXPORTADOR_ITEM,
  TERCEROS_TEXTO_DE_ALERTA,
} from '../../enums/terceros-relacionados.enum';
import {
  Destinatario,
  Exportador,
} from '../../models/terceros-relacionados.model';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AlertComponent,
        TituloComponent,
        TercerosRelacionadosComponent,
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have TEXTO_DE_ALERTA initialized with TERCEROS_TEXTO_DE_ALERTA', () => {
    expect(component.TEXTO_DE_ALERTA).toBe(TERCEROS_TEXTO_DE_ALERTA);
  });

  test('should have enableScrollbar default to false', () => {
    expect(component.enableScrollbar).toBe(false);
  });

  test('should have items initialized with EXPORTADOR_ITEM', () => {
    expect(component.items).toBe(EXPORTADOR_ITEM);
  });

  test('should have persona initialized with DESTINATARIO_ITEM', () => {
    expect(component.persona).toBe(DESTINATARIO_ITEM);
  });
});
