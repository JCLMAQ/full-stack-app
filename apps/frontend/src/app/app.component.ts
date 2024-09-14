import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AsyncPipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Injector, OnDestroy, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { I18nService } from '@fe/i18n';
import { LanguageSelectorComponent } from '@fe/language-selector';
import { MATERIAL } from '@fe/material';
import { ThemeManagerService, ThemeSelectorComponent, ThemingService } from '@fe/theming';
import { GeolocationComponent, LoadingIndicatorComponent, SimpledialogComponent, setAppInject } from '@fe/utilities';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { map, shareReplay } from 'rxjs';
import { environment } from '../environments/environment';
import { StyleManager } from './style-manager.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Component({
  standalone: true,
  selector: 'full-stack-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

  imports: [
    RouterModule,
  GeolocationComponent,
  NgClass,
  RouterLink,
  LanguageSelectorComponent,
  TranslateModule,
  ...MATERIAL,
  RouterOutlet,
  LoadingIndicatorComponent,
  ThemeSelectorComponent,
  AsyncPipe
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private injector = inject(Injector);
  private router = inject(Router);
  private styleManager = inject(StyleManager);
  private dialog = inject(MatDialog);
  private overlay = inject(OverlayContainer);
  private observer = inject(BreakpointObserver);
  translateService = inject(TranslateService);
  private i18nService = inject(I18nService);
  private breakpointObserver = inject<BreakpointObserver>(BreakpointObserver);


  title = 'full-stack-app';

  // Theming with "theming-m3"
  themeManager = inject(ThemeManagerService);
  isDark = this.themeManager.isDark;

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  // Theming with "theme-selector"
  themeSelectorOpen = signal(false);
  themingService = inject(ThemingService);

  setTheme = effect(() => {
    document.body.style.setProperty(`--primary`, this.themingService.primary());
    document.body.style.setProperty(`--primary-light`, this.themingService.primaryLight());
    document.body.style.setProperty(`--ripple`, this.themingService.ripple());
    document.body.style.setProperty(`--primary-dark`,  this.themingService.primaryDark());
    document.body.style.setProperty(`--background`,  this.themingService.background());
    document.body.style.setProperty(`--error`, this.themingService.error());
  });

isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );




loading : boolean = true;
defaultLang = 'en'; // default

// SideNav Variables
@ViewChild(MatSidenav)
sidenav!: MatSidenav;
isMobile= true;
isCollapsed = true;

// Light-Dark theme switch variables
isDark1: boolean = false;
theme: string = "light-theme";

// Dark theme management
@HostBinding('class') className = '';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

// toggleControl = new FormControl(false);


constructor() {
  const translateService = this.translateService;

  setAppInject(this.injector);
  translateService.setDefaultLang(this.defaultLang);
  // translateService.use('en');
  translateService.addLangs(['en','fr']);
  const browserLang = translateService.getBrowserLang();
    if (browserLang) {
      translateService.use(browserLang);
    }
}

ngOnInit(): void {
  // Light - Dark theme init
  this.setDefaultTheme();

  // Responsive sidebar management init
  this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
    if(screenSize.matches){
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.isCollapsed = false;
  });

  // mat-spinner control base on navigation events
  this.router.events.subscribe(event => {
    switch (true) {
        case event instanceof NavigationStart: {
            this.loading = true;
            break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
            this.loading = false;
            break;
        }
        default: {
            break;
        }
    }
  });

  // Setup translations
  this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

} // NgOnInit end

showDialog(): void {
  this.dialog.open(SimpledialogComponent,
    {
      width: '500px'
    });
}

toggleMenu() {
  // Responsive sidebar management open/close
  if(this.isMobile){
    this.sidenav.toggle();
  } else {
    this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
    this.isCollapsed = !this.isCollapsed;
  }
}

setDefaultTheme ( ) {
  // Light - Dark theme init
  if (localStorage.getItem('theme')) {
    this.theme = localStorage.getItem('theme') as string;
    const body = document .getElementsByTagName ( 'body' ) [0];
    body.classList.add(this .theme);
  } else {
    this.theme = 'light-theme';
    localStorage.setItem('theme', this.theme);}
    this.theme === 'light-theme' ? this.isDark1 = true  : this.isDark1 =  false;
}

switchTheme ( ) {
  // Light - Dark theme swith
  const body = document. getElementsByTagName ('body') [0];
  body.classList.remove (this .theme);
  this.theme === 'light-theme'? this.theme = 'dark-theme': this. theme = 'light-theme';
  body .classList.add (this .theme);
  localStorage.setItem('theme', this.theme);
  this.isDark1 = !this.isDark1;
}

switchLang(language: string): void {
  this.translateService.use(language);
}
ngOnDestroy() {
  this.i18nService.destroy();
}

navigate(route: string) {
  this.router.navigate([`/${route}`]);
}

}

