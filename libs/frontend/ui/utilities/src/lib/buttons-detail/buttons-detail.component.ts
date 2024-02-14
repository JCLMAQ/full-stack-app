import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigableButtonsService } from './navigable-buttons.service';


@Component({
  selector: 'my-app-buttons-detail',
  templateUrl: './buttons-detail.component.html',
  styleUrls: ['./buttons-detail.component.scss']
})
export class ButtonsDetailComponent implements OnInit {

  action: string | undefined;
// Management of buttons Component
  @Input() editable: boolean | undefined;
  @Input() editbutton: boolean | undefined;
  @Input() removebutton: boolean | undefined;
  @Input() virtualdeletebutton: boolean | undefined;
  // @Input() navigable: NavigableButtonsService;


// Return action
  @Output() actionButton = new EventEmitter<string>();

  constructor(
    public navigable: NavigableButtonsService
  ) { }

  ngOnInit() {

  }

  actionClick(action: string) {
    this.actionButton.emit(action);
  }
}
