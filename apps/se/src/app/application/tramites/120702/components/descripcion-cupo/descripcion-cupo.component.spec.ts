import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionCupoComponent } from './descripcion-cupo.component';

describe('DescripcionCupoComponent', () => {
  let component: DescripcionCupoComponent;
  let fixture: ComponentFixture<DescripcionCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescripcionCupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescripcionCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
