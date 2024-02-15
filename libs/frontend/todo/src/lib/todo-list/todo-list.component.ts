import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, effect, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { getState, patchState } from '@ngrx/signals';
import { TodoInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';

@Component({
  selector: 'full-stack-app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
  ],
  templateUrl: './todo-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {

  readonly todoStore = inject(TodoStore);
  readonly router = inject(Router)

  // selection = new SelectionModel<TodoInterface>(true, []);

  columnsToDisplay: string[] = ['select', 'numSeq','title'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand',  'tools'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,  'tools'];
  expandedElement!: TodoInterface | null;

  todosEntities!: TodoInterface[];
  dataSource = new MatTableDataSource<TodoInterface>;

  index: number | undefined

  routeToDetail = "todos/todo";

  mode: 'Edit' | 'View' | 'Update' | undefined ;
  master = false; // true : button is disable
  owner = false; // true button is disable

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

constructor() {
  console.log("Constructor step")
  effect(()=> {
    this.todoStore.todoLoaded();
    this.fetchData();
    const state = getState(this.todoStore);
      console.log('Todo state changed', state);
  })
}



ngOnInit(): void {
  console.log('ngOnInit step')
}

fetchData(): void {
  this.todosEntities = this.todoStore.todoEntities();
  this.dataSource = new MatTableDataSource(this.todosEntities);
  this.dataSource.paginator = this.paginator!;
  this.dataSource.sort = this.sort!;
}

ngAfterViewInit(): void {
  this.dataSource = new MatTableDataSource(this.todosEntities);
  this.dataSource.paginator = this.paginator!;
  this.dataSource.sort = this.sort!;
}

 // Selection
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.todoStore.selection().selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
 /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      this.isAllSelected() ?
      this.todoStore.selection().clear() :
      this.dataSource.data.forEach(row => this.todoStore.selection().select(row));
      // Update
      this.dataSource.data.forEach(row => this.todoStore.toggleSelected(row.id));
}

  checkboxLabel(row: TodoInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.todoStore.selection().isSelected(row) ? 'deselect' : 'select'}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateButton( id: string, mode: string ) {
    // this.todoStore.initNavButton(id);
    patchState(this.todoStore, { selectedId: id });
    patchState(this.todoStore, { lastPosition: this.todoStore.items().length - 1 });

      this.router.navigate([this.routeToDetail, mode]);
      // this.router.navigate([this.routeToDetail, id, mode]);
  }

  addOne() {
    this.router.navigate([this.routeToDetail, '', 'create']);
  }

  // addTodo() {
  //   this.todoStore.addTodo(this.form.value.todoValue);
  //   this.form.reset();
  // }


// Delete the selected item
  async remove( id: string ) {

  }

  virtualRemove(id: string) {

  }
// MatTable mgt
// On click row action
  onRowClicked(row: number) {
    console.log('Row clicked: ', row);
  }
}
