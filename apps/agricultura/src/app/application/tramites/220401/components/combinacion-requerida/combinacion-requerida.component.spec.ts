import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinacionRequeridaComponent } from './combinacion-requerida.component';

describe('CombinacionRequeridaComponent', () => {
  let component: CombinacionRequeridaComponent;
  let fixture: ComponentFixture<CombinacionRequeridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombinacionRequeridaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinacionRequeridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
