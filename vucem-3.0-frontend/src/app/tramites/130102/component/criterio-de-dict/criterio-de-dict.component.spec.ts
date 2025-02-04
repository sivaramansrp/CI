import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioDeDictComponent } from './criterio-de-dict.component';

describe('CriterioDeDictComponent', () => {
  let component: CriterioDeDictComponent;
  let fixture: ComponentFixture<CriterioDeDictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriterioDeDictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriterioDeDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
