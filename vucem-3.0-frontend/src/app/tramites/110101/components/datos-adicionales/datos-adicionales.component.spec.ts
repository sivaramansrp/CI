import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAdicionalesComponent } from './datos-adicionales.component';

describe('DatosAdicionalesComponent', () => {
  let component: DatosAdicionalesComponent;
  let fixture: ComponentFixture<DatosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosAdicionalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
