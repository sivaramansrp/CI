import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:apps/se/src/app/application/tramites/110203/components/tratados-110203/tratados-110203.component.spec.ts
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
========
import { PasoTresComponent } from './paso-tres.component';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoTresComponent);
>>>>>>>> fe9c5d259eaa6c571dd817b63bae7ad41042c43b:apps/aga/src/app/application/tramites/40102/pages/paso-tres/paso-tres.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
