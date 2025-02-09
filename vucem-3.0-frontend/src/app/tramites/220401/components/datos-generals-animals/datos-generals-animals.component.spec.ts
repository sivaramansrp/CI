import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralsAnimalsComponent } from './datos-generals-animals.component';

describe('DatosGeneralsAnimalsComponent', () => {
  let component: DatosGeneralsAnimalsComponent;
  let fixture: ComponentFixture<DatosGeneralsAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosGeneralsAnimalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosGeneralsAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
