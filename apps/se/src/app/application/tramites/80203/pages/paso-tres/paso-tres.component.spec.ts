import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { AlertComponent } from '@ng-mf/data-access-user';

import { PasoTresComponent } from './paso-tres.component';


describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});