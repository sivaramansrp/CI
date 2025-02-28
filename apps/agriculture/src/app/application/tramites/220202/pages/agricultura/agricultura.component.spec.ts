import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturaComponent } from './agricultura.component';


describe('AgriculturaComponent', () => {
  let component: AgriculturaComponent;
  let fixture: ComponentFixture<AgriculturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgriculturaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgriculturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});