import { Injector } from "@angular/core";

export let AppInjector: Injector;
export function setAppInject(injector: Injector) {
  AppInjector = injector;
}
