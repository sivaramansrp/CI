import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerorRelacionadosComponent } from './terceror-relacionados.component';

describe('TercerorRelacionadosComponent', () => {
  let component: TercerorRelacionadosComponent;
  let fixture: ComponentFixture<TercerorRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TercerorRelacionadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TercerorRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
