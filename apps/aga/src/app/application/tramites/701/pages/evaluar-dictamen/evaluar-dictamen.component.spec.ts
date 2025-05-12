import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarDictamenComponent } from './evaluar-dictamen.component';

describe('EvaluarDictamenComponent', () => {
  let component: EvaluarDictamenComponent;
  let fixture: ComponentFixture<EvaluarDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluarDictamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluarDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
