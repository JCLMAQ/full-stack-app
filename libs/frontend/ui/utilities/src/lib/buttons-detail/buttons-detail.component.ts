import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NavigableButtonsService } from './navigable-buttons.service';


@Component({
  selector: 'my-app-buttons-detail',
  templateUrl: './buttons-detail.component.html',
  styleUrls: ['./buttons-detail.component.scss']
})
export class ButtonsDetailComponent implements OnInit {
  navigable = inject(NavigableButtonsService);


  action: string | undefined;
// Management of buttons Component
  @Input() editable: boolean | undefined;
  @Input() editbutton: boolean | undefined;
  @Input() removebutton: boolean | undefined;
  @Input() virtualdeletebutton: boolean | undefined;
  // @Input() navigable: NavigableButtonsService;


// Return action
  @Output() actionButton = new EventEmitter<string>();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() { }

  ngOnInit() {

  }

  actionClick(action: string) {
    this.actionButton.emit(action);
  }
}
