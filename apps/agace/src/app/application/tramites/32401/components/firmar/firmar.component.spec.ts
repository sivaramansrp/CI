import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarComponent } from './firmar.component';

describe('FirmarComponent', () => {
  let component: FirmarComponent;
  let fixture: ComponentFixture<FirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirmarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
