import { ComponentFixture, TestBed } from '@angular/core/testing';


import { Tratados110203Component } from './tratados-110203.component';

describe('Tratados110203Component', () => {
  let component: Tratados110203Component;
  let fixture: ComponentFixture<Tratados110203Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tratados110203Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Tratados110203Component);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
