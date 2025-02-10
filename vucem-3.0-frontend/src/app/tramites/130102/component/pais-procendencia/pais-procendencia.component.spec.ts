import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisProcendenciaComponent } from './pais-procendencia.component';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisProcendenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
