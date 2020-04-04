import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiseurComponent } from './visualiseur.component';

describe('VisualiseurComponent', () => {
  let component: VisualiseurComponent;
  let fixture: ComponentFixture<VisualiseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualiseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
