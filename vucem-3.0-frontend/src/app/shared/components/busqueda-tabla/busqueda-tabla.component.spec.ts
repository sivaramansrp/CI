import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTablaComponent } from './busqueda-tabla.component';

describe('BusquedaTablaComponent', () => {
  let component: BusquedaTablaComponent;
  let fixture: ComponentFixture<BusquedaTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusquedaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
