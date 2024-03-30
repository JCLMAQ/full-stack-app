import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoInterface, TodoPartialInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';

export interface TodoForm {
    id: FormControl<string | null>;
    title: FormControl<string | null>;
    content: FormControl<string | null >;
    todoState: FormControl<string | null>;
    orderTodo: FormControl<number | null>;
  }

@Component({
  selector: 'full-stack-app-todo-detail',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TodoDetailComponent implements OnInit {

  readonly todoStore = inject(TodoStore);

  public todo: TodoPartialInterface | undefined | null;

  formGroup: FormGroup;

  todoId!: string | undefined // | null;
  todoItem: TodoInterface | undefined;
  todoItems: TodoInterface[] | undefined;

  submitted = false;
  mode: 'create' | 'update' | 'view' | undefined;
  isAdmin = false
  formControlsInit = {
    title: ['', []],
    content: ['', []],
    todoState: ['', []],
    orderTodo: [0, []]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.todoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    // this.form = this.fb.group(this.formControls);

    if((this.todoId === undefined )|| (this.todoId === null)){
      this.todoId = this.todoStore.items().at(0)?.id;
    }
    if(this.mode === undefined || this.mode === null) {
      this.mode = 'view';
    }

    this.formGroup = this.formBuilder.group(this.formControlsInit);
    // this.form = this.formBuilder.group({
    //   id: ['', []],
    //   title: ['', []],
    //   content: ['', []],
    //   todoState: ['', []],
    //   orderTodo: ['', []],
    // });

    effect(() => {
      // this.fetchData();
      // const state = getState(this.todoStore);
    });
  }

  fetchData(): void {
    this.todoItems = this.todoStore.todoEntities();
  }

  ngOnInit(): void {
    this.reload(this.todoId!);
  }


  reload(id: string) {
    if (id === undefined || id === null) {
      id = this.todoStore.selectedId()!
    }
    if (this.mode === 'update' || this.mode === 'view') {
      this.todoStore.todoIdSelectedId(id);
      this.formGroup.patchValue({
        id: this.todoStore.selectedItem()?.id,
        title: this.todoStore.selectedItem()?.title,
        content: this.todoStore.selectedItem()?.content,
        todoState: this.todoStore.selectedItem()?.todoState,
        orderTodo: this.todoStore.selectedItem()?.orderTodo
      });
    } else if (this.mode == 'create') {
      this.formGroup = this.formBuilder.group({
        ...this.formControlsInit,
      });
    }
  }

  save() {
    const val = this.formGroup.value;
    if (this.mode == 'update') {

      // todo

    } else if (this.mode == 'create') {

      // todo

    }
    this.router.navigate(['todos']);
  }

  add() { }

  create() { }

  cancel() { }

  remove() { }

  reset() { }

  virtualRemove() { }


  next() {
    this.todoStore.next();
    this.todoStore.newSelectedItem(this.todoStore.currentPosition());
    this.todoId = this.todoStore.selectedId()!;
    this.reload(this.todoStore.selectedId()!);
  }

  last() {
    this.todoStore.last();
    this.todoStore.newSelectedItem(this.todoStore.currentPosition());
    this.todoId = this.todoStore.selectedId()!;
    this.reload(this.todoStore.selectedId()!);
  }

  first() {
    this.todoStore.first();
    this.todoStore.newSelectedItem(this.todoStore.currentPosition());
    this.todoId = this.todoStore.selectedId()!;
    this.reload(this.todoStore.selectedId()!);
  }

  previous() {
    this.todoStore.previous();
    this.todoStore.newSelectedItem(this.todoStore.currentPosition());
    this.todoId = this.todoStore.selectedId()!;
    this.reload(this.todoStore.selectedId()!);
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
  }

  backHome() {
    this.router.navigate(['home']);
  }
}
