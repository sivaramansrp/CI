// paso-dos.component.spec.ts
import { PasoDosComponent } from './paso-dos.component';
import { TEXTOS } from '@ng-mf/data-access-user';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;

  beforeEach(() => {
    component = new PasoDosComponent();
  });

 

  it('should initialize TEXTOS with imported TEXTOS', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });
});