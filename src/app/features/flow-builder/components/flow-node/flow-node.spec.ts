import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowNode } from './flow-node';

describe('FlowNode', () => {
  let component: FlowNode;
  let fixture: ComponentFixture<FlowNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowNode],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowNode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
