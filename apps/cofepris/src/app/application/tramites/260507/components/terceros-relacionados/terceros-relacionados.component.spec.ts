jest.mock('@libs/shared/theme/assets/json/260501/fabricante-select-options-data.json', () => ({
  default: {
    paisSelectData: [
      { id: '1', descripcion: 'México' },
      { id: '2', descripcion: 'Estados Unidos' },
    ],
  }
}));
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TercerosRelacionados260507Component } from "./terceros-relacionados.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

describe('TercerosRelacionados260507Component', () => {
  let component: TercerosRelacionados260507Component;
  let fixture: ComponentFixture<TercerosRelacionados260507Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionados260507Component,
        HttpClientModule,
        HttpClientTestingModule,
        TercerosRelacionadosComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionados260507Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});