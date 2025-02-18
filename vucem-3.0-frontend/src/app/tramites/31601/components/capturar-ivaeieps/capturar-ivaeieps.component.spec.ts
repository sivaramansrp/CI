import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarIvaeiepsComponent } from './capturar-ivaeieps.component';

describe('CapturarIvaeiepsComponent', () => {
  let component: CapturarIvaeiepsComponent;
  let fixture: ComponentFixture<CapturarIvaeiepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturarIvaeiepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapturarIvaeiepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
