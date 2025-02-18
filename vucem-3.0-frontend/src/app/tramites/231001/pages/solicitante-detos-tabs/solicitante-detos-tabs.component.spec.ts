import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteDetosTabsComponent } from './solicitante-detos-tabs.component';

describe('SolicitanteDetosTabsComponent', () => {
  let component: SolicitanteDetosTabsComponent;
  let fixture: ComponentFixture<SolicitanteDetosTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitanteDetosTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitanteDetosTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
