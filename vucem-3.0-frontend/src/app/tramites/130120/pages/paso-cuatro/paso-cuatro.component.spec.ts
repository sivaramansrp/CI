import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoFourComponent } from './paso-cuatro.component';

describe('PasoFourComponent', () => {
  let component: PasoFourComponent;
  let fixture: ComponentFixture<PasoFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoFourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
