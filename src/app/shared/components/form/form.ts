import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Project } from '../../interfaces/project.interface';
import { SNACK_BAR_CONFIG } from '../../../app.config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  providers: [provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  matSnackBar = inject(MatSnackBar)

  project = input<Project | null>(null)

  private readonly _defaultTime = new Date(
    new Date().setHours(23, 59, 0, 0)
  )

  private readonly _datetime = computed(() => {
    const proj = this.project()
    return proj?.datetime ? new Date(proj.datetime) : null
  })

  readonly _projectDate = computed(() => {
    const date = this._datetime()
    if (!date) return null

    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  })

  readonly _projectTime = computed(() => {
    const time = this._datetime()
    if (!time) return this._defaultTime

    return new Date(
      new Date().setHours(time.getHours(), time.getMinutes(), 0, 0)
    )
  })

  form!: FormGroup
  @Output() done = new EventEmitter<Project>()

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.project()?.title ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      discipline: new FormControl<string>(this.project()?.discipline ?? '', {
        nonNullable: true,
      }),
      date: new FormControl<Date | null>(this._projectDate(), {
        validators: Validators.required,
      }),
      time: new FormControl<Date>(this._projectTime(), {
        validators: Validators.required,
      }),
      priority: new FormControl<'low' | 'medium' | 'high'>(this.project()?.priority ?? 'low', {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl<string>(this.project()?.description ?? '', {
        nonNullable: true,
      }),
      done: new FormControl<boolean>(this.project()?.done ?? false)
    })
  }

  private readonly _currentYear = new Date().getFullYear()
  private readonly _currentMouth = new Date().getMonth()
  private readonly _currentDay = new Date().getDate()
  readonly minDate = new Date(this._currentYear, this._currentMouth, this._currentDay + 1)

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()

      const errorsMap: Record<string, string> = {
        title: 'Todos os campos obrigatórios devem ser preenchidos',
        time: 'A Hora está incorreta.',
        date: 'A Data está incorreta.',
      }

      for (const [controlName, message] of Object.entries(errorsMap)) {
        if (this.form.controls[controlName]?.invalid) {
          this.matSnackBar.open(message, 'Ok', SNACK_BAR_CONFIG.error)
          break
        }
      }
      return

    }

    const { date, time, ...rest } = this.form.value
    const hours = (time as Date).getHours()
    const minutes = (time as Date).getMinutes()

    const datetime = new Date(date as Date)
    datetime.setHours(hours, minutes, 0, 0)

    const project: Project = {
      ...rest,
      datetime,
    }

    this.done.emit(project)
  }
}