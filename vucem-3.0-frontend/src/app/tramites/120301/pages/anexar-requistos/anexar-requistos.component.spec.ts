import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexarRequistosComponent } from './anexar-requistos.component';

describe('AnexarRequistosComponent', () => {
  let component: AnexarRequistosComponent;
  let fixture: ComponentFixture<AnexarRequistosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnexarRequistosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnexarRequistosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
