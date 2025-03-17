import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaTercerosRelacionadosComponent } from './interna-terceros-relacionados.component';

describe('InternaTercerosRelacionadosComponent', () => {
  let component: InternaTercerosRelacionadosComponent;
  let fixture: ComponentFixture<InternaTercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternaTercerosRelacionadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternaTercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
