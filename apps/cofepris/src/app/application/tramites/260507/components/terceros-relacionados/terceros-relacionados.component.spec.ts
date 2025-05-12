import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';
import { TercerosRelacionados260507Component } from './terceros-relacionados.component';

describe('TercerosRelacionados260507Component', () => {
  let component: TercerosRelacionados260507Component;
  let fixture: ComponentFixture<TercerosRelacionados260507Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionados260507Component,
        TercerosRelacionadosComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionados260507Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
