import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavaTemporralComponent } from './octava-temporral.component';

describe('OctavaTemporralComponent', () => {
  let component: OctavaTemporralComponent;
  let fixture: ComponentFixture<OctavaTemporralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OctavaTemporralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OctavaTemporralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
