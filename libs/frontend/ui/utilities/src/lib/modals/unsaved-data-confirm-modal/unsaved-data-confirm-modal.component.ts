import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Based on https://medium.com/@danioropezasoria/simple-unsaved-data-changes-guard-in-angular-17-dfc40a67fa64


@Component({
  selector: 'unsaved-data-confirm-modal',
  standalone: true,
  templateUrl: './unsaved-data-confirm-modal.component.html',
})
export class UnsavedDataConfirmModal {
	modal = inject(NgbActiveModal);

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}
}
