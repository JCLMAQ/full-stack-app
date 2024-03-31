import { inject } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DirtyComponent } from "../interfaces";
import { UnsavedDataConfirmModal } from "../modals";


//  Base on : https://medium.com/@danioropezasoria/simple-unsaved-data-changes-guard-in-angular-17-dfc40a67fa64

export const hasUnsavedChangesGuard = (async (component: DirtyComponent) => {
  const isDirty = component.isDirty();
  let shouldNavigate = true;
  if (isDirty) {
    const modalService = inject(NgbModal);
    const modalRef = modalService.open(UnsavedDataConfirmModal);
    shouldNavigate = await modalRef.result;
  }
  return shouldNavigate;
})
