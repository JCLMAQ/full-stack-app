import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { getState } from '@ngrx/signals';
import { TodoInterface, TodoPartialInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';

interface TodoForm extends FormGroup<{
    id: FormControl<string | undefined | null>;
    title?: FormControl<string | undefined | null>;
    content?: FormControl<string | undefined | null>;
    todoState?: FormControl<string | undefined | null>;
    orderTodo?: FormControl<number | undefined | null>;
  }> { }

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
  providers: [TodoStore],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TodoDetailComponent implements OnInit {

  readonly todoStore = inject(TodoStore);

  public todo: TodoPartialInterface | undefined | null;

  form!: FormGroup;

  todoId!: string | undefined // | null;
  todoItem: TodoInterface | undefined;
  todoItems: TodoInterface[] | undefined;

  submitted = false;
  mode: 'create' | 'update' | 'view' | undefined;
  isAdmin = false
  formControls = {
    title: ['', []],
    content: ['', []]
  };

  // currentPosition =  0
  // lastPosition = 0;

  // navigation: {
  //   hasNext: boolean
  //   hasPrevious: boolean
  //   isFirst: boolean
  //   isLast: boolean
  // } = {
  //     hasNext: false,
  //     hasPrevious: false,
  //     isFirst: false,
  //     isLast: false
  //   }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    console.log("Start of constructor ")
    this.todoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    this.form = this.fb.group(this.formControls);

    if((this.todoId === undefined )|| (this.todoId === null)){
      this.todoId = this.todoStore.items().at(0)?.id;
    }
    if(this.mode === undefined || this.mode === null) {
      this.mode = 'view';
    }

    this.todoStore.todoIdSelectedId(this.todoId!);
    console.log('Constructor todo page state changed (1): ', getState(this.todoStore));
    effect(() => {
      this.fetchData();
      this.reload(this.todoId!);
      const state = getState(this.todoStore);
      console.log('Constructor effect todo page state changed: ', state);
    });
    console.log("End of constructor ")
  }

  fetchData(): void {
    console.log("Start of fetchData ", this.todoItems)
    this.todoItems = this.todoStore.todoEntities();
    this.todoStore.initNavButton(this.todoId!);
    console.log("End of fetchData ", this.todoItems)
  }

  ngOnInit(): void {
    if((this.todoId === undefined )|| (this.todoId === null)){
      this.todoStore.initSelectedID();
    } else {
      this.todoStore.todoIdSelectedId(this.todoId!);
    }
    this.todoStore.initNavButton(this.todoId!);
    console.log("Start of ngInit ")
    this.reload(this.todoId!);
    console.log('ngInit todo page state changed: ', getState(this.todoStore));

    console.log("End of ngInit ")
  }


  reload(id: string) {
    if (this.mode === 'update' || this.mode === 'view') {
      this.todoStore.initNavButton(id!);
      this.todoStore.todoIdSelectedId(id);
      this.form.patchValue({
        id: this.todoStore.selectedItem()?.id,
        title: this.todoStore.selectedItem()?.title,
        content: this.todoStore.selectedItem()?.content
      });
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...this.formControls,
      });
    };

  }



  save() {
    const val = this.form.value;
    if (this.mode == 'update') {
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
    this.reload(this.todoStore.selectedId()!);
  }

  last() {
    this.todoStore.last()
    this.reload(this.todoStore.selectedId()!);
  }

  first() {
    this.todoStore.first();
    this.reload(this.todoStore.selectedId()!);
  }

  previous() {
    this.todoStore.previous();
    this.reload(this.todoStore.selectedId()!);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  backHome() {
    this.router.navigate(['home']);
  }
}