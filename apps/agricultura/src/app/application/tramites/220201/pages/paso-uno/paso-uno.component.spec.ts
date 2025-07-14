import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let COMPONENT: PasoUnoComponent;
  let FIXTURE: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [SolicitanteComponent, HttpClientTestingModule, PasoUnoComponent]
    })
      .compileComponents();

    FIXTURE = TestBed.createComponent(PasoUnoComponent);
    COMPONENT = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('should create', () => {
    expect(COMPONENT).toBeTruthy();
  });
});