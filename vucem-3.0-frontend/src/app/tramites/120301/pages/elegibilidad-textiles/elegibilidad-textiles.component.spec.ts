import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegibilidadTextilesComponent } from './elegibilidad-textiles.component';

describe('ElegibilidadTextilesComponent', () => {
  let component: ElegibilidadTextilesComponent;
  let fixture: ComponentFixture<ElegibilidadTextilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElegibilidadTextilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegibilidadTextilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
