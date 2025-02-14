import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavaTemporalComponent } from './octava-temporal.component';

describe('OctavaTemporalComponent', () => {
  let component: OctavaTemporalComponent;
  let fixture: ComponentFixture<OctavaTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OctavaTemporalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OctavaTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
