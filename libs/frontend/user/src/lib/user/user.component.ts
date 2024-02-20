
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';

import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, delay, map, takeUntil } from 'rxjs';
import * as UsersActions from '../+state/users.actions';
import { UserInterface } from '../+state/users.models';
import { UsersStateInterface, usersFeature } from '../+state/users.state';

@Component({
  selector: 'full-stack-app-user',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit,  AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  selection = new SelectionModel<UserInterface>(true, []);
  tableColumns  :  string[] = [ 'num','select','nickName', 'lastName', 'firstName', 'email', 'tools'];

  items?: UserInterface[];
  index: number | undefined
  routeToDetail = 'users/userprofile'; //

  mode: 'Edit' | 'View' | 'Update' | undefined ;
  master = false; // true : button is disable
  owner = false; // true button is disable

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly store = inject(Store<{ users: UsersStateInterface}>);
  private readonly router = inject(Router);

  readonly users$: Observable<UserInterface[]>= this.store.select(usersFeature.selectAll);
  // readonly isUserSelected$ = this.store.select(usersFeature.selectIsUserSelected);
  // readonly selectedUser$ = this.store.select(usersFeature.selectSelectedUser);
  readonly loaded$ = this.store.select(usersFeature.selectLoaded)
  readonly isLoading$ = this.store.pipe(delay(1500), select(usersFeature.selectIsLoading) );
  readonly error$ = this.store.pipe(select(usersFeature.selectError));


  // userDataSource: MatTableDataSource<UserInterface> = new MatTableDataSource;
  userDataSource = new MatTableDataSource<UserInterface>();

  // userDataSource$: Observable<MatTableDataSource<UserInterface>> = this.users$
  // .pipe(
  //   map((data) => {
  //     this.userDataSource.data = data;
  //     // this.userDataSource.paginator = this.paginator;
  //     // this.userDataSource.sort = this.sort;
  //     return this.userDataSource
  //   })
  // );

  usersAsMatTableDataSource$: Observable<MatTableDataSource<UserInterface>> =
    this.users$.pipe(
      map((data) => {
        const dataSource = this.userDataSource;
        dataSource.data = data;
        return dataSource;
      })
    );


    // private dataSource = new MatTableDataSource<Thing>();

    // thingsAsMatTableDataSource$: Observable<MatTableDataSource<Thing>> =
    //   this.thingService.things.pipe(
    //     map((things) => {
    //       const dataSource = this.dataSource;
    //       dataSource.data = things;
    //       return dataSource;
    //     })
    //   );

  ngOnInit() {
    this.store.dispatch(UsersActions.usersPageActions.load());
    this.reload();

  }

  ngAfterViewInit() {
    this.userDataSource.paginator = this.paginator;
    this.userDataSource.sort = this.sort;
    }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // async reload() {
    // this.items = await lastValueFrom(this.users$)
    // this.userDataSource  =  new MatTableDataSource(this.items);
    // this.userDataSource.paginator = this.paginator;
    // this.userDataSource.sort = this.sort;
    // }

  reload() {
      this.store.select(usersFeature.selectAll)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe((objectResult) => {
        this.items = Object.values(objectResult)
        this.userDataSource  =  new MatTableDataSource(this.items);
        this.userDataSource.paginator = this.paginator;
        this.userDataSource.sort = this.sort;
      });

      // this.store.select(usersFeature.selectAll)
      // .pipe(
      //   map((objectResult) => {
      //     this.items = Object.values(objectResult)
      //     this.userDataSource  =  new MatTableDataSource(this.items);
      //     this.userDataSource.paginator = this.paginator;
      //     this.userDataSource.sort = this.sort;
      //   })
      // );



  }

  changeUserList() {
    // this.userListService.changeUserList(this.dataSource.filteredData);
  }

  // Goto the detail page for view only
  navigateid(id: string, index: string) {
    // this.dataSource.data.values()
    console.log(this.routeToDetail, id)
    // this.store.dispatch(UsersActions.usersPageActions.selectUser({userId: id}))
    const indexrun = index
    this.router.navigate([this.routeToDetail, id, 'view']);
  }

  navigate(user: UserInterface, index: string) {
    // console.log("route transfert" , user
    this.router.navigate([this.routeToDetail, user, 'view']);
  }

  navigateButton(id: string, mode: string) {
    // mode: 'view' | 'update' | 'create';
    this.store.dispatch(UsersActions.usersPageActions.selectUser({userId: id}))
    this.router.navigate([this.routeToDetail, id, mode]);
  }

  addOneUser() {
    this.router.navigate([this.routeToDetail, '', 'create']);
  }
  // Delete the selected item
  async remove( id: string ) {
    // const user = this.userEntityService.delete(user.id = id)
  }

  virtualRemove(id: string) {
    // const user = this.userEntityService.getByKey(id)
    // .pipe(first()).subscribe(user => user.isDeletedDT = new Date());
  }
  // MatTable mgt
  // On click row action
  onRowClicked(row: number) {
    // console.log('Row clicked: ', row);
  }
  // Filter the list
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }
  // Selection
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.userDataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.userDataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: UserInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  onUserSelect(id:string){
    this.store.dispatch(UsersActions.usersPageActions.selectUser({userId: id}))
  }
}

