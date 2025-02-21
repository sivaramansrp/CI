import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoosanitarioPageComponent } from './zoosanitario-page.component';

describe('ZoosanitarioPageComponent', () => {
  let component: ZoosanitarioPageComponent;
  let fixture: ComponentFixture<ZoosanitarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoosanitarioPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoosanitarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});