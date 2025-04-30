import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraTablaComponent } from './bitacora.component';

describe('BitacoraComponent', () => {
  let component: BitacoraTablaComponent;
  let fixture: ComponentFixture<BitacoraTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitacoraTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitacoraTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
