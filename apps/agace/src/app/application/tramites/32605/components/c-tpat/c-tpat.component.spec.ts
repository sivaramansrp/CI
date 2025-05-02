import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTPATComponent } from './c-tpat.component';

describe('CTPATComponent', () => {
  let component: CTPATComponent;
  let fixture: ComponentFixture<CTPATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CTPATComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CTPATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
