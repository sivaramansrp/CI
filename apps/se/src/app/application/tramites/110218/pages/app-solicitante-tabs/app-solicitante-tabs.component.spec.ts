import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSolicitanteTabsComponent } from './app-solicitante-tabs.component';

describe('AppSolicitanteTabsComponent', () => {
  let component: AppSolicitanteTabsComponent;
  let fixture: ComponentFixture<AppSolicitanteTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppSolicitanteTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSolicitanteTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default tab index as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update the tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });
});
