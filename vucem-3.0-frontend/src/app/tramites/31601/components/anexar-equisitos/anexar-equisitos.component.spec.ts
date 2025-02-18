import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexarEquisitosComponent } from './anexar-equisitos.component';

describe('AnexarEquisitosComponent', () => {
  let component: AnexarEquisitosComponent;
  let fixture: ComponentFixture<AnexarEquisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexarEquisitosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnexarEquisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
