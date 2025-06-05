import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVDictamenComponent } from './detalle-v-dictamen.component';

describe('DetalleVDictamenComponent', () => {
  let component: DetalleVDictamenComponent;
  let fixture: ComponentFixture<DetalleVDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVDictamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
