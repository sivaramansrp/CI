import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AduaneroComponent } from './aduanero.component';

describe('AduaneroComponent', () => {
  let component: AduaneroComponent;
  let fixture: ComponentFixture<AduaneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AduaneroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AduaneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
