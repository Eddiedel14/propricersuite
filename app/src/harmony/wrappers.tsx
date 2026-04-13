import type {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  Ref,
} from 'react'
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import type { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker'
import type { PopperPlacementType } from '@mui/material/Popper'
import type { FieldOwnerState, PickerOwnerState } from '@mui/x-date-pickers/models'
import type { PickerDayOwnerState } from '@mui/x-date-pickers/PickerDay'
import type { PickersCalendarHeaderProps, PickersCalendarHeaderSlotProps } from '@mui/x-date-pickers/PickersCalendarHeader'
import type { PickersTextFieldProps } from '@mui/x-date-pickers/PickersTextField'
import AddIcon from '@mui/icons-material/Add'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import RemoveIcon from '@mui/icons-material/Remove'
import MuiAlert from '@mui/material/Alert'
import type { AlertProps } from '@mui/material/Alert'
import MuiAvatar from '@mui/material/Avatar'
import type { AvatarProps } from '@mui/material/Avatar'
import MuiBadge from '@mui/material/Badge'
import type { BadgeProps } from '@mui/material/Badge'
import MuiBox from '@mui/material/Box'
import type { BoxProps } from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
import MuiButtonGroup from '@mui/material/ButtonGroup'
import type { ButtonGroupProps } from '@mui/material/ButtonGroup'
import MuiCard from '@mui/material/Card'
import type { CardProps } from '@mui/material/Card'
import MuiCheckbox from '@mui/material/Checkbox'
import type { CheckboxProps } from '@mui/material/Checkbox'
import MuiDialog from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'
import MuiFormControl from '@mui/material/FormControl'
import type { FormControlProps } from '@mui/material/FormControl'
import MuiFormGroup from '@mui/material/FormGroup'
import type { FormGroupProps } from '@mui/material/FormGroup'
import MuiIconButton from '@mui/material/IconButton'
import type { IconButtonProps } from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import type { LinkProps } from '@mui/material/Link'
import MuiMenu from '@mui/material/Menu'
import type { MenuProps } from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import type { MenuItemProps } from '@mui/material/MenuItem'
import MuiPopover from '@mui/material/Popover'
import type { PopoverProps } from '@mui/material/Popover'
import MuiRadio from '@mui/material/Radio'
import type { RadioProps } from '@mui/material/Radio'
import MuiSelect from '@mui/material/Select'
import type { SelectProps } from '@mui/material/Select'
import MuiStep from '@mui/material/Step'
import type { StepContextType, StepProps } from '@mui/material/Step'
import { useStepContext } from '@mui/material/Step'
import MuiStepper from '@mui/material/Stepper'
import type { StepperProps } from '@mui/material/Stepper'
import type { SwitchProps } from '@mui/material/Switch'
import type { TabsOwnerState } from '@mui/material/Tabs'
import MuiTab from '@mui/material/Tab'
import type { TabProps } from '@mui/material/Tab'
import MuiTable from '@mui/material/Table'
import type { TableProps as MuiTableProps } from '@mui/material/Table'
import MuiTableContainer from '@mui/material/TableContainer'
import type { TableContainerProps } from '@mui/material/TableContainer'
import MuiTabs from '@mui/material/Tabs'
import type { TabsProps } from '@mui/material/Tabs'
import MuiTextField from '@mui/material/TextField'
import type { StandardTextFieldProps } from '@mui/material/TextField'
import MuiTooltip from '@mui/material/Tooltip'
import type { TooltipProps } from '@mui/material/Tooltip'
import MuiAccordion from '@mui/material/Accordion'
import type { AccordionOwnerState, AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import type { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiChip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import MuiStepConnector from '@mui/material/StepConnector'
import type { StepConnectorProps } from '@mui/material/StepConnector'
import MuiStepLabel from '@mui/material/StepLabel'
import type { StepLabelProps } from '@mui/material/StepLabel'
import { useControlled } from '@mui/material/utils'

type PickersStandardSlotProps = PickersTextFieldProps<'standard'>['slotProps']

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ')
}

/** MUI v9 TextField uses `slotProps`; merge Harmony BEM classes with object or function slots. */
function mergeStandardTextFieldSlots(
  slotProps: StandardTextFieldProps['slotProps'] | undefined,
  inputClass: string,
  labelClass: string,
): StandardTextFieldProps['slotProps'] {
  const si = slotProps?.input
  const sl = slotProps?.inputLabel
  return {
    ...slotProps,
    input: (ownerState) => {
      const prev = typeof si === 'function' ? si(ownerState) : si ?? {}
      return {
        ...prev,
        disableUnderline: true,
        className: cn(inputClass, prev.className),
      }
    },
    inputLabel: (ownerState) => {
      const prev = typeof sl === 'function' ? sl(ownerState) : sl ?? {}
      return {
        ...prev,
        className: cn(labelClass, prev.className),
      }
    },
  }
}

/** PickersTextField (MUI X) — Harmony `input` / `label` BEM on standard variant. */
function mergePickerTextFieldSlotProps(
  slotProps: PickersStandardSlotProps | undefined,
  inputClass: string,
  labelClass: string,
): PickersStandardSlotProps {
  const si = slotProps?.input
  const sl = slotProps?.inputLabel
  return {
    ...slotProps,
    input: (ownerState: unknown) => {
      const prev =
        typeof si === 'function'
          ? (si as (o: unknown) => Record<string, unknown>)(ownerState)
          : si ?? {}
      return {
        ...prev,
        disableUnderline: true,
        className: cn(inputClass, (prev as { className?: string }).className),
      }
    },
    inputLabel: (ownerState: unknown) => {
      const prev =
        typeof sl === 'function'
          ? (sl as (o: unknown) => Record<string, unknown>)(ownerState)
          : sl ?? {}
      return {
        ...prev,
        className: cn(labelClass, (prev as { className?: string }).className),
      }
    },
  } as PickersStandardSlotProps
}

/** Harmony picker shell: `is-open` pairs with `.picker-popup { display: none }` in components.css. */
const HARMONY_PICKER_POPUP_PAPER_CLASS = 'picker-popup is-open'

/** Mirrors MUI X `PickerPopperOwnerState` (not exported from the package root). */
type HarmonyPickerPopperOwnerState = PickerOwnerState & {
  popperPlacement: PopperPlacementType
}

/** Mirrors `PickersArrowSwitcherOwnerState`. */
type HarmonyPickersArrowSwitcherOwnerState = PickerOwnerState & {
  isButtonHidden: boolean
}

/** Mirrors `MonthButtonOwnerState` / `YearButtonOwnerState`. */
type HarmonyMonthButtonOwnerState = PickerOwnerState & {
  isMonthSelected: boolean
  isMonthDisabled: boolean
}

type HarmonyYearButtonOwnerState = PickerOwnerState & {
  isYearSelected: boolean
  isYearDisabled: boolean
}

function mergeArrowSwitcherNavClasses(
  inner: PickersCalendarHeaderSlotProps | undefined,
): PickersCalendarHeaderSlotProps {
  const ps = inner?.previousIconButton
  const ns = inner?.nextIconButton
  const sb = inner?.switchViewButton
  return {
    ...inner,
    previousIconButton: (btnOwnerState: HarmonyPickersArrowSwitcherOwnerState) => {
      const p =
        typeof ps === 'function' ? ps(btnOwnerState) : ps ?? {}
      return {
        ...p,
        className: cn('date-picker__nav-btn', p.className),
      }
    },
    nextIconButton: (btnOwnerState: HarmonyPickersArrowSwitcherOwnerState) => {
      const p =
        typeof ns === 'function' ? ns(btnOwnerState) : ns ?? {}
      return {
        ...p,
        className: cn('date-picker__nav-btn', p.className),
      }
    },
    switchViewButton: (btnOwnerState: PickerOwnerState) => {
      const p =
        typeof sb === 'function' ? sb(btnOwnerState) : sb ?? {}
      return {
        ...p,
        className: cn('date-picker__nav-btn', p.className),
      }
    },
  }
}

function harmonyDatePickerCalendarSlotProps(
  slotProps:
    | MuiDatePickerProps['slotProps']
    | MuiDateTimePickerProps['slotProps']
    | undefined,
): Partial<MuiDatePickerProps['slotProps']> {
  const dp = slotProps?.desktopPaper
  const mp = slotProps?.mobilePaper
  const ly = slotProps?.layout
  const ch = slotProps?.calendarHeader
  const d = slotProps?.day
  const mb = slotProps?.monthButton
  const yb = slotProps?.yearButton

  const layoutObj = (typeof ly === 'object' && ly !== null ? ly : {}) as {
    className?: string
  }

  const mobilePaperObj = (typeof mp === 'object' && mp !== null ? mp : {}) as {
    className?: string
  }

  return {
    desktopPaper: (ownerState: HarmonyPickerPopperOwnerState) => {
      const prev =
        typeof dp === 'function' ? dp(ownerState) : dp ?? {}
      return {
        ...prev,
        className: cn(HARMONY_PICKER_POPUP_PAPER_CLASS, prev.className),
      }
    },
    mobilePaper: {
      ...mobilePaperObj,
      className: cn(
        HARMONY_PICKER_POPUP_PAPER_CLASS,
        mobilePaperObj.className,
      ),
    },
    layout: {
      ...layoutObj,
      className: cn('date-picker', layoutObj.className),
    },
    calendarHeader: (ownerState: PickerOwnerState) => {
      const prev =
        typeof ch === 'function' ? ch(ownerState) : ch ?? {}
      const header = prev as Partial<PickersCalendarHeaderProps>
      return {
        ...prev,
        className: cn('date-picker__header', header.className),
        slotProps: mergeArrowSwitcherNavClasses(header.slotProps),
      }
    },
    day: (ownerState: PickerDayOwnerState) => {
      const prev = (typeof d === 'function' ? d(ownerState) : d ?? {}) as {
        className?: string
      }
      if (ownerState.isDayFillerCell) {
        return {
          ...prev,
          className: cn('date-picker__day', prev.className),
        }
      }
      return {
        ...prev,
        className: cn(
          'date-picker__day',
          ownerState.isDayOutsideMonth && 'date-picker__day--other-month',
          !ownerState.disableHighlightToday &&
            ownerState.isDayCurrent &&
            'date-picker__day--today',
          ownerState.isDaySelected && 'date-picker__day--selected',
          ownerState.isDayDisabled && 'date-picker__day--disabled',
          prev.className,
        ),
      }
    },
    monthButton: (ownerState: HarmonyMonthButtonOwnerState) => {
      const prev = (typeof mb === 'function' ? mb(ownerState) : mb ?? {}) as {
        className?: string
      }
      return {
        ...prev,
        className: cn(
          'month-picker__month',
          ownerState.isMonthSelected && 'month-picker__month--selected',
          ownerState.isMonthDisabled && 'month-picker__month--disabled',
          prev.className,
        ),
      }
    },
    yearButton: (ownerState: HarmonyYearButtonOwnerState) => {
      const prev = (typeof yb === 'function' ? yb(ownerState) : yb ?? {}) as {
        className?: string
      }
      return {
        ...prev,
        className: cn(
          'month-picker__month',
          ownerState.isYearSelected && 'month-picker__month--selected',
          ownerState.isYearDisabled && 'month-picker__month--disabled',
          prev.className,
        ),
      }
    },
  }
}

function buildDatePickerSlotProps(
  slotProps: MuiDatePickerProps['slotProps'] | undefined,
): MuiDatePickerProps['slotProps'] {
  const tf = slotProps?.textField
  return {
    ...slotProps,
    ...harmonyDatePickerCalendarSlotProps(slotProps),
    textField: (ownerState: FieldOwnerState) => {
      const prev =
        typeof tf === 'function' ? tf(ownerState) : (tf ?? {})
      return {
        ...prev,
        variant: 'standard',
        className: cn('form-group', prev.className),
        slotProps: mergePickerTextFieldSlotProps(
          prev.slotProps as PickersStandardSlotProps | undefined,
          'date-input',
          'label',
        ),
      }
    },
  }
}

function buildDateTimePickerSlotProps(
  slotProps: MuiDateTimePickerProps['slotProps'] | undefined,
): MuiDateTimePickerProps['slotProps'] {
  const tf = slotProps?.textField
  return {
    ...slotProps,
    ...harmonyDatePickerCalendarSlotProps(slotProps),
    textField: (ownerState: FieldOwnerState) => {
      const prev =
        typeof tf === 'function' ? tf(ownerState) : (tf ?? {})
      return {
        ...prev,
        variant: 'standard',
        className: cn('form-group', prev.className),
        slotProps: mergePickerTextFieldSlotProps(
          prev.slotProps as PickersStandardSlotProps | undefined,
          'date-input',
          'label',
        ),
      }
    },
  }
}

function mergeHarmonyCheckboxSlotProps(
  slotProps: CheckboxProps['slotProps'] | undefined,
  rootClass: string,
): CheckboxProps['slotProps'] {
  const si = slotProps?.input
  const sr = slotProps?.root
  return {
    ...slotProps,
    input: (ownerState) => {
      const prev = typeof si === 'function' ? si(ownerState) : si ?? {}
      return {
        ...prev,
        className: cn('checkbox__input', prev.className),
      }
    },
    root: (ownerState) => {
      const prev = typeof sr === 'function' ? sr(ownerState) : sr ?? {}
      return {
        ...prev,
        className: cn(rootClass, prev.className),
      }
    },
  }
}

function mergeHarmonyRadioSlotProps(
  slotProps: RadioProps['slotProps'] | undefined,
  rootClass: string,
): RadioProps['slotProps'] {
  const si = slotProps?.input
  const sr = slotProps?.root
  return {
    ...slotProps,
    input: (ownerState) => {
      const prev = typeof si === 'function' ? si(ownerState) : si ?? {}
      return {
        ...prev,
        className: cn('radio__input', prev.className),
      }
    },
    root: (ownerState) => {
      const prev = typeof sr === 'function' ? sr(ownerState) : sr ?? {}
      return {
        ...prev,
        className: cn(rootClass, prev.className),
      }
    },
  }
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

function yearFromMonthValue(
  value: StandardTextFieldProps['value'],
): string {
  if (value == null || Array.isArray(value)) return '—'
  const s = String(value)
  const y = s.slice(0, 4)
  return /^\d{4}$/.test(y) ? y : '—'
}

function selectedMonthIndex(
  value: StandardTextFieldProps['value'],
): number | null {
  if (value == null || Array.isArray(value)) return null
  const s = String(value)
  const m = /^(\d{4})-(\d{2})$/.exec(s)
  if (!m) return null
  const idx = Number.parseInt(m[2], 10) - 1
  return idx >= 0 && idx < 12 ? idx : null
}

function mergeInputRef(
  a: Ref<HTMLInputElement> | undefined,
  b: MutableRefObject<HTMLInputElement | null>,
): Ref<HTMLInputElement> {
  return (el: HTMLInputElement | null) => {
    b.current = el
    if (typeof a === 'function') {
      a(el)
    } else if (a && typeof a === 'object' && 'current' in a) {
      ;(a as MutableRefObject<HTMLInputElement | null>).current = el
    }
  }
}

export type HarmonyButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger'

const HARMONY_BUTTON_MAP: Record<
  HarmonyButtonVariant,
  { mui: ButtonProps['variant']; color: ButtonProps['color'] }
> = {
  primary: { mui: 'contained', color: 'primary' },
  secondary: { mui: 'outlined', color: 'primary' },
  tertiary: { mui: 'text', color: 'primary' },
  ghost: { mui: 'text', color: 'inherit' },
  danger: { mui: 'contained', color: 'error' },
}

export type HarmonyButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export const HarmonyButton = forwardRef<HTMLButtonElement, ButtonProps & {
  harmonyVariant?: HarmonyButtonVariant
  /** BEM size; defaults from MUI `size` (small→sm, large→lg, else md). */
  harmonySize?: HarmonyButtonSize
}>(function HarmonyButton(props, ref) {
  const {
    harmonyVariant = 'primary',
    harmonySize: harmonySizeProp,
    className,
    size = 'medium',
    ...rest
  } = props
  const map = HARMONY_BUTTON_MAP[harmonyVariant]
  const bemSize: HarmonyButtonSize =
    harmonySizeProp ??
    (size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md')
  const btnSizeClass = `btn--${bemSize}`

  return (
    <MuiButton
      ref={ref}
      variant={map.mui}
      color={map.color}
      size={size}
      className={cn('btn', `btn--${harmonyVariant}`, btnSizeClass, className)}
      {...rest}
    />
  )
})

const iconSizeClass: Record<
  NonNullable<IconButtonProps['size']>,
  string
> = {
  small: 'btn--icon-sm',
  medium: 'btn--icon-md',
  large: 'btn--icon-lg',
}

export const HarmonyIconButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(function HarmonyIconButton(props, ref) {
  const { className, size = 'medium', ...rest } = props
  return (
    <MuiIconButton
      ref={ref}
      size={size}
      className={cn('btn', 'btn--ghost', iconSizeClass[size], className)}
      {...rest}
    />
  )
})

export type HarmonyAvatarProps = AvatarProps & {
  /** Harmony scale; maps to `.avatar--sm|md|lg` (MUI Avatar has no `size` prop). */
  size?: 'sm' | 'md' | 'lg'
}

export const HarmonyAvatar = forwardRef<HTMLDivElement, HarmonyAvatarProps>(
  function HarmonyAvatar(props, ref) {
    const { className, size = 'md', ...rest } = props
    return (
      <MuiAvatar
        ref={ref}
        className={cn('avatar', `avatar--${size}`, className)}
        {...rest}
      />
    )
  },
)

export const HarmonyTextField = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyTextField(props, ref) {
  const { className, slotProps, ...rest } = props
  return (
    <MuiTextField
      ref={ref}
      variant="standard"
      className={cn('form-group', className)}
      slotProps={mergeStandardTextFieldSlots(slotProps, 'input', 'label')}
      {...rest}
    />
  )
})

export const HarmonyTextareaField = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyTextareaField(props, ref) {
  const { className, slotProps, ...rest } = props
  return (
    <MuiTextField
      ref={ref}
      multiline
      minRows={3}
      variant="standard"
      className={cn('form-group', className)}
      slotProps={mergeStandardTextFieldSlots(slotProps, 'textarea', 'label')}
      {...rest}
    />
  )
})

export const HarmonyFormGroup = forwardRef<
  HTMLDivElement,
  FormGroupProps
>(function HarmonyFormGroup(props, ref) {
  const { className, ...rest } = props
  return (
    <MuiFormGroup ref={ref} className={cn('form-group', className)} {...rest} />
  )
})

export const HarmonyNativeSelect = forwardRef<
  unknown,
  SelectProps & { formControlProps?: FormControlProps }
>(function HarmonyNativeSelect(props, ref) {
  const { className, inputProps, formControlProps, ...rest } = props
  return (
    <MuiFormControl
      fullWidth
      variant="standard"
      {...formControlProps}
      className={cn('dropdown', formControlProps?.className)}
    >
      <MuiSelect
        ref={ref}
        native
        variant="standard"
        className={cn(className)}
        inputProps={{
          ...inputProps,
          className: cn('select', inputProps?.className),
        }}
        {...rest}
      />
    </MuiFormControl>
  )
})

function checkboxIconBox(
  Icon: typeof CheckBoxOutlineBlankIcon,
  fontSize: 'small' | 'medium' | 'large' | 'inherit',
) {
  return (
    <span className="checkbox__box">
      <Icon className="checkbox__icon" fontSize={fontSize} />
    </span>
  )
}

export const HarmonyCheckbox = forwardRef<
  HTMLButtonElement,
  CheckboxProps
>(function HarmonyCheckbox(props, ref) {
  const {
    className,
    color = 'primary',
    slotProps,
    size = 'medium',
    icon,
    checkedIcon,
    indeterminateIcon,
    ...rest
  } = props
  const bemState =
    color === 'error'
      ? 'checkbox--error'
      : color === 'warning'
        ? 'checkbox--warning'
        : ''
  const fs: 'small' | 'medium' | 'large' =
    size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'
  return (
    <MuiCheckbox
      ref={ref}
      color={color}
      size={size}
      icon={icon ?? checkboxIconBox(CheckBoxOutlineBlankIcon, fs)}
      checkedIcon={checkedIcon ?? checkboxIconBox(CheckBoxIcon, fs)}
      indeterminateIcon={
        indeterminateIcon ?? checkboxIconBox(IndeterminateCheckBoxIcon, fs)
      }
      slotProps={mergeHarmonyCheckboxSlotProps(
        slotProps,
        cn('checkbox', bemState, className),
      )}
      {...rest}
    />
  )
})

export const HarmonyRadio = forwardRef<HTMLButtonElement, RadioProps>(
  function HarmonyRadio(props, ref) {
    const {
      className,
      color = 'primary',
      slotProps,
      size = 'medium',
      icon,
      checkedIcon,
      ...rest
    } = props
    const bemState =
      color === 'error'
        ? 'radio--error'
        : color === 'warning'
          ? 'radio--warning'
          : ''
    return (
      <MuiRadio
        ref={ref}
        color={color}
        size={size}
        icon={
          icon ?? (
            <span
              className={cn('radio__circle', 'radio__circle--unselected')}
              data-state="unchecked"
            >
              <span className="radio__dot" />
            </span>
          )
        }
        checkedIcon={
          checkedIcon ?? (
            <span
              className={cn('radio__circle', 'radio__circle--selected')}
              data-state="checked"
            >
              <span className="radio__dot" />
            </span>
          )
        }
        slotProps={mergeHarmonyRadioSlotProps(
          slotProps,
          cn('radio', bemState, className),
        )}
        {...rest}
      />
    )
  },
)

export type HarmonySwitchProps = SwitchProps & {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

/** Native toggle DOM matches Toggle.css (`input` + `track` + `thumb` siblings). */
export const HarmonySwitch = forwardRef<HTMLInputElement, HarmonySwitchProps>(
  function HarmonySwitch(props, ref) {
    const {
      autoFocus,
      checked: checkedProp,
      className,
      defaultChecked,
      disabled,
      disableFocusRipple: _disableFocusRipple,
      disableRipple: _disableRipple,
      id,
      name,
      onChange,
      readOnly,
      required,
      size = 'medium',
      value,
      inputProps,
      color: _color,
      edge: _edge,
      icon: _icon,
      checkedIcon: _checkedIcon,
      slots: _slots,
      slotProps: _slotProps,
      sx: _sx,
      tabIndex,
    } = props

    const [checked, setCheckedState] = useControlled({
      controlled: checkedProp,
      default: Boolean(defaultChecked),
      name: 'HarmonySwitch',
      state: 'checked',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const v = event.target.checked
      if (checkedProp === undefined) {
        setCheckedState(v)
      }
      onChange?.(event, v)
    }

    return (
      <label
        className={cn(
          'toggle',
          size === 'small' && 'toggle--sm',
          disabled && 'toggle--disabled',
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          value={value as string | number | readonly string[] | undefined}
          className="toggle__input"
          checked={checkedProp !== undefined ? checkedProp : checked}
          onChange={handleChange}
          {...inputProps}
        />
        <span className="toggle__track">
          <span className="toggle__thumb" />
        </span>
      </label>
    )
  },
)

export const HarmonyDateInput = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyDateInput(props, ref) {
  const { className, slotProps, ...rest } = props
  return (
    <MuiTextField
      ref={ref}
      type="date"
      variant="standard"
      className={cn('form-group', className)}
      slotProps={mergeStandardTextFieldSlots(slotProps, 'date-input', 'label')}
      {...rest}
    />
  )
})

export const HarmonyTimeInput = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyTimeInput(props, ref) {
  const { className, slotProps, ...rest } = props
  return (
    <div ref={ref} className={cn('time-picker', className)}>
      <MuiTextField
        type="time"
        variant="standard"
        className="form-group"
        slotProps={mergeStandardTextFieldSlots(
          slotProps,
          'time-picker__input',
          'label',
        )}
        {...rest}
      />
    </div>
  )
})

export const HarmonyDatePicker = forwardRef<
  HTMLDivElement,
  MuiDatePickerProps
>(function HarmonyDatePicker({ className, slotProps, ...rest }, ref) {
  return (
    <div ref={ref} className={className}>
      <MuiDatePicker
        slotProps={buildDatePickerSlotProps(slotProps)}
        {...rest}
      />
    </div>
  )
})

export const HarmonyDateTimePicker = forwardRef<
  HTMLDivElement,
  MuiDateTimePickerProps
>(function HarmonyDateTimePicker({ className, slotProps, ...rest }, ref) {
  return (
    <div ref={ref} className={cn('datetime-picker', className)}>
      <MuiDateTimePicker
        slotProps={buildDateTimePickerSlotProps(slotProps)}
        {...rest}
      />
    </div>
  )
})

export const HarmonyNumberField = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyNumberField(props, ref) {
  const {
    className,
    slotProps,
    disabled,
    value,
    onChange,
    name,
    ...rest
  } = props

  const inputElRef = useRef<HTMLInputElement | null>(null)

  const htmlInputStatic = useMemo((): Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'min' | 'max' | 'step'
  > => {
    const hi = slotProps?.htmlInput
    if (typeof hi === 'function') return {}
    return (hi ?? {}) as InputHTMLAttributes<HTMLInputElement>
  }, [slotProps?.htmlInput])

  const stepNum = useMemo(() => {
    const s = htmlInputStatic.step
    const n = s === undefined || s === '' ? 1 : Number(s)
    return Number.isFinite(n) && n > 0 ? n : 1
  }, [htmlInputStatic.step])

  const minNum = useMemo(() => {
    const m = htmlInputStatic.min
    if (m === undefined || m === '') return undefined
    const n = Number(m)
    return Number.isFinite(n) ? n : undefined
  }, [htmlInputStatic.min])

  const maxNum = useMemo(() => {
    const m = htmlInputStatic.max
    if (m === undefined || m === '') return undefined
    const n = Number(m)
    return Number.isFinite(n) ? n : undefined
  }, [htmlInputStatic.max])

  const readNumericValue = useCallback((): number => {
    if (value !== undefined && value !== null && value !== '') {
      const p = parseFloat(String(value))
      return Number.isFinite(p) ? p : 0
    }
    const el = inputElRef.current
    if (el?.value != null && el.value !== '') {
      const p = parseFloat(el.value)
      return Number.isFinite(p) ? p : 0
    }
    return 0
  }, [value])

  const clamp = useCallback(
    (n: number) => {
      let x = n
      if (minNum !== undefined && x < minNum) x = minNum
      if (maxNum !== undefined && x > maxNum) x = maxNum
      return x
    },
    [minNum, maxNum],
  )

  const handleStep = useCallback(
    (delta: number) => {
      const next = clamp(readNumericValue() + delta * stepNum)
      const str = String(next)
      if (onChange) {
        const synthetic = {
          target: { value: str, name },
          currentTarget: { value: str, name },
        } as ChangeEvent<HTMLInputElement>
        onChange(synthetic)
      }
      if (value === undefined && inputElRef.current) {
        inputElRef.current.value = str
      }
    },
    [clamp, readNumericValue, stepNum, onChange, name, value],
  )

  const current = readNumericValue()
  const atMin = minNum !== undefined && current <= minNum
  const atMax = maxNum !== undefined && current >= maxNum

  const mergedSlotProps = useMemo((): StandardTextFieldProps['slotProps'] => {
    const si = slotProps?.input
    const sl = slotProps?.inputLabel
    const hi = slotProps?.htmlInput
    return {
      ...slotProps,
      input: (ownerState) => {
        const prev = typeof si === 'function' ? si(ownerState) : si ?? {}
        const p = prev as {
          className?: string
          startAdornment?: ReactNode
          endAdornment?: ReactNode
        }
        return {
          ...prev,
          disableUnderline: true,
          className: cn('number-input', p.className),
          startAdornment: (
            <>
              <button
                type="button"
                className="number-input__btn"
                aria-label="Decrease"
                disabled={Boolean(disabled) || atMin}
                onClick={() => handleStep(-1)}
              >
                <RemoveIcon fontSize="small" />
              </button>
              {p.startAdornment}
            </>
          ),
          endAdornment: (
            <>
              {p.endAdornment}
              <button
                type="button"
                className="number-input__btn"
                aria-label="Increase"
                disabled={Boolean(disabled) || atMax}
                onClick={() => handleStep(1)}
              >
                <AddIcon fontSize="small" />
              </button>
            </>
          ),
        }
      },
      inputLabel: (ownerState) => {
        const prev = typeof sl === 'function' ? sl(ownerState) : sl ?? {}
        return {
          ...prev,
          className: cn('label', (prev as { className?: string }).className),
        }
      },
      htmlInput: (ownerState) => {
        const prev = typeof hi === 'function' ? hi(ownerState) : hi ?? {}
        const ph = prev as {
          className?: string
          ref?: Ref<HTMLInputElement | null>
        }
        return {
          ...prev,
          ref: mergeInputRef(ph.ref, inputElRef),
          className: cn('number-input__input', ph.className),
        }
      },
    }
  }, [
    slotProps,
    disabled,
    atMin,
    atMax,
    handleStep,
  ])

  return (
    <MuiTextField
      ref={ref}
      type="number"
      variant="standard"
      disabled={disabled}
      value={value}
      onChange={onChange}
      name={name}
      className={cn('form-group', 'number-input-form-wrapper', className)}
      slotProps={mergedSlotProps}
      {...rest}
    />
  )
})

export const HarmonyChip = forwardRef<HTMLDivElement, ChipProps>(
  function HarmonyChip(props, ref) {
    const { className, size = 'medium', variant = 'filled', ...rest } = props
    const sz = size === 'small' ? 'sm' : size === 'medium' ? 'md' : 'lg'
    const chipVariant = variant === 'outlined' ? 'chip--outline' : 'chip--fill'
    return (
      <MuiChip
        ref={ref}
        size={size}
        variant={variant}
        className={cn('chip', `chip--${sz}`, chipVariant, className)}
        {...rest}
      />
    )
  },
)

export type HarmonyBadgeSize = 'sm' | 'md' | 'lg'

export const HarmonyBadge = forwardRef<
  HTMLDivElement,
  BadgeProps & { harmonySize?: HarmonyBadgeSize }
>(function HarmonyBadge(props, ref) {
  const { className, harmonySize = 'md', ...rest } = props
  return (
    <MuiBadge
      ref={ref}
      className={cn('badge', `badge--${harmonySize}`, className)}
      {...rest}
    />
  )
})

export const HarmonyNotificationBadge = forwardRef<
  HTMLDivElement,
  BoxProps & {
    children?: ReactNode
    tone?: 'dot' | 'number'
    /** Harmony BEM size; default `md`. */
    size?: 'sm' | 'md' | 'lg'
  }
>(function HarmonyNotificationBadge(props, ref) {
  const { className, children, tone = 'number', size = 'md', ...rest } = props
  return (
    <MuiBox
      ref={ref}
      component="span"
      className={cn(
        'notification-badge',
        tone === 'dot' ? 'notification-badge--dot' : 'notification-badge--number',
        `notification-badge--${size}`,
        className,
      )}
      {...rest}
    >
      {children}
    </MuiBox>
  )
})

export const HarmonyTooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function HarmonyTooltip(props, ref) {
    const { slotProps, ...rest } = props
    const tt = slotProps?.tooltip
    return (
      <MuiTooltip
        ref={ref}
        slotProps={{
          ...slotProps,
          tooltip: (ownerState) => {
            const prev = typeof tt === 'function' ? tt(ownerState) : tt ?? {}
            return {
              ...prev,
              className: cn('tooltip', prev.className),
            }
          },
        }}
        {...rest}
      />
    )
  },
)

export const HarmonyAlert = forwardRef<HTMLDivElement, AlertProps>(
  function HarmonyAlert(props, ref) {
    const { severity = 'info', className, ...rest } = props
    return (
      <MuiAlert
        ref={ref}
        severity={severity}
        className={cn('alert', `alert--${severity}`, className)}
        {...rest}
      />
    )
  },
)

export const HarmonyDialog = forwardRef<HTMLDivElement, DialogProps>(
  function HarmonyDialog(props, ref) {
    const { slotProps, ...rest } = props
    const paper = slotProps?.paper
    return (
      <MuiDialog
        ref={ref}
        slotProps={{
          ...slotProps,
          paper: (ownerState) => {
            const prev =
              typeof paper === 'function' ? paper(ownerState) : paper ?? {}
            return {
              ...prev,
              className: cn('dialog', prev.className),
            }
          },
        }}
        {...rest}
      />
    )
  },
)

export type HarmonyCardVariant = 'default' | 'elevated' | 'interactive' | 'primary'

export const HarmonyCard = forwardRef<HTMLDivElement, CardProps & {
  harmonyVariant?: HarmonyCardVariant
}>(function HarmonyCard(props, ref) {
  const { harmonyVariant = 'default', className, ...rest } = props
  const mod =
    harmonyVariant === 'default'
      ? ''
      : harmonyVariant === 'elevated'
        ? 'card--elevated'
        : harmonyVariant === 'interactive'
          ? 'card--interactive'
          : 'card--primary'
  return (
    <MuiCard
      ref={ref}
      elevation={0}
      className={cn('card', mod, className)}
      {...rest}
    />
  )
})

export type HarmonyProgressTone = 'default' | 'success' | 'warning' | 'error'

export const HarmonyProgress = forwardRef<
  HTMLDivElement,
  BoxProps & { value: number; tone?: HarmonyProgressTone; size?: 'sm' | 'md' | 'lg' }
>(function HarmonyProgress(props, ref) {
  const { value, tone = 'default', size = 'md', className, ...rest } = props
  const toneClass =
    tone === 'default' ? '' : `progress--${tone}`
  const sizeClass = size === 'md' ? '' : `progress--${size}`
  return (
    <MuiBox
      ref={ref}
      className={cn('progress', toneClass, sizeClass, className)}
      {...rest}
    >
      <MuiBox
        className="progress__bar"
        sx={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </MuiBox>
  )
})

export type HarmonySpinnerSize = 'sm' | 'md' | 'lg'

export const HarmonySpinner = forwardRef<
  HTMLDivElement,
  BoxProps & { harmonySize?: HarmonySpinnerSize }
>(function HarmonySpinner(props, ref) {
  const { harmonySize = 'md', className, ...rest } = props
  const sz =
    harmonySize === 'md' ? '' : `spinner--${harmonySize === 'sm' ? 'sm' : 'lg'}`
  return (
    <MuiBox
      ref={ref}
      role="status"
      className={cn('spinner', sz, className)}
      {...rest}
    />
  )
})

export const HarmonyLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function HarmonyLink(props, ref) {
    const { className, ...rest } = props
    return (
      <MuiLink ref={ref} className={cn('link', className)} {...rest} />
    )
  },
)

export const HarmonyButtonGroup = forwardRef<
  HTMLDivElement,
  ButtonGroupProps & { harmonyLayout?: 'default' | 'bare' }
>(function HarmonyButtonGroup(props, ref) {
  const { harmonyLayout = 'default', className, ...rest } = props
  return (
    <MuiButtonGroup
      ref={ref}
      className={cn(
        'btn-group',
        'btn-group--horizontal',
        harmonyLayout === 'default' ? 'btn-group--default' : '',
        className,
      )}
      {...rest}
    />
  )
})

export const HarmonyStepper = forwardRef<HTMLDivElement, StepperProps>(
  function HarmonyStepper(props, ref) {
    const { className, orientation = 'horizontal', nonLinear, ...rest } = props
    return (
      <MuiStepper
        ref={ref}
        data-stepper=""
        orientation={orientation}
        nonLinear={nonLinear}
        className={cn(
          'stepper',
          orientation === 'vertical' ? 'stepper--vertical' : 'stepper--horizontal',
          nonLinear && 'stepper--non-linear',
          className,
        )}
        {...rest}
      />
    )
  },
)

export const HarmonyStep = forwardRef<
  HTMLDivElement,
  StepProps & {
    harmonyError?: boolean
    harmonyWarning?: boolean
    harmonySuccess?: boolean
  }
>(function HarmonyStep(props, ref) {
  const {
    className,
    active,
    completed,
    disabled,
    harmonyError,
    harmonyWarning,
    harmonySuccess,
    ...rest
  } = props
  return (
    <MuiStep
      ref={ref}
      active={active}
      completed={completed}
      disabled={disabled}
      className={cn(
        'step',
        active && 'is-active',
        completed && 'is-completed',
        disabled && 'is-disabled',
        harmonyError && 'is-error',
        harmonyWarning && 'is-warning',
        harmonySuccess && 'is-success',
        className,
      )}
      {...rest}
    />
  )
})

export const HarmonyStepLabel = forwardRef<HTMLDivElement, StepLabelProps>(
  function HarmonyStepLabel(props, ref) {
    const { classes, optional, ...rest } = props
    const wrappedOptional =
      optional != null ? (
        <span className="step__description">{optional}</span>
      ) : null
    return (
      <MuiStepLabel
        ref={ref}
        {...rest}
        optional={wrappedOptional}
        classes={{
          ...classes,
          iconContainer: cn('step__indicator', classes?.iconContainer),
          labelContainer: cn('step__label', classes?.labelContainer),
          label: cn('step__label-text', classes?.label),
        }}
      />
    )
  },
)

export const HarmonyStepConnector = forwardRef<
  HTMLDivElement,
  StepConnectorProps
>(function HarmonyStepConnector(props, ref) {
  const { className, classes, ...rest } = props
  const stepCtx = useStepContext() as StepContextType | Record<string, never>
  const lineActive = Boolean(stepCtx.active || stepCtx.completed)
  return (
    <MuiStepConnector
      ref={ref}
      {...rest}
      className={className}
      classes={{
        ...classes,
        line: cn('step__connector', lineActive && 'is-active', classes?.line),
      }}
    />
  )
})

export const HarmonyTabs = forwardRef<HTMLDivElement, TabsProps & {
  compact?: boolean
}>(function HarmonyTabs(props, ref) {
  const { className, compact, slotProps, ...rest } = props
  const sr = slotProps?.root
  const ss = slotProps?.scroller
  const sl = slotProps?.list
  return (
    <MuiTabs
      ref={ref}
      slotProps={{
        ...slotProps,
        root: (ownerState: TabsOwnerState) => {
          const prev = typeof sr === 'function' ? sr(ownerState) : sr ?? {}
          return {
            ...prev,
            className: cn(
              'tabstrip',
              compact ? 'tabstrip--compact' : '',
              className,
              prev.className,
            ),
            'data-tabstrip': '',
            'data-variant': compact ? 'compact' : 'default',
          }
        },
        scroller: (ownerState: TabsOwnerState) => {
          const prev = typeof ss === 'function' ? ss(ownerState) : ss ?? {}
          const p = prev as { component?: React.ElementType; className?: string; 'aria-label'?: string }
          return {
            ...prev,
            component: p.component ?? 'nav',
            className: cn('tabstrip__nav', p.className),
            'aria-label': p['aria-label'] ?? 'Tabs',
          }
        },
        list: (ownerState: TabsOwnerState) => {
          const prev = typeof sl === 'function' ? sl(ownerState) : sl ?? {}
          return {
            ...prev,
            className: cn('tabstrip__container', 'tabstrip__tabs', prev.className),
          }
        },
      }}
      {...rest}
    />
  )
})

/** Tabs inject `selected`; it is omitted from MUI `TabProps` types but required at runtime. */
export type HarmonyTabProps = TabProps & { selected?: boolean }

export const HarmonyTab = forwardRef<HTMLDivElement, HarmonyTabProps>(
  function HarmonyTab(props, ref) {
    const { className, label, ...rest } = props
    const selected = (rest as { selected?: boolean }).selected
    const wrappedLabel =
      label != null ? <span className="tab__label">{label}</span> : label
    return (
      <MuiTab
        ref={ref}
        className={cn('tab', selected && 'is-active', className)}
        label={wrappedLabel}
        {...(rest as TabProps)}
      />
    )
  },
)

export const HarmonyAccordion = forwardRef<HTMLDivElement, AccordionProps>(
  function HarmonyAccordion(props, ref) {
    const { className, slotProps, ...rest } = props
    const sr = slotProps?.root
    return (
      <div ref={ref} className={cn('accordion', className)}>
        <MuiAccordion
          elevation={0}
          disableGutters
          slotProps={{
            ...slotProps,
            root: (ownerState: AccordionOwnerState) => {
              const prev = typeof sr === 'function' ? sr(ownerState) : sr ?? {}
              return {
                ...prev,
                className: cn(
                  'accordion__item',
                  ownerState.expanded && 'is-open',
                  prev.className,
                ),
              }
            },
          }}
          {...rest}
        />
      </div>
    )
  },
)

export const HarmonyAccordionSummary = forwardRef<
  HTMLDivElement,
  AccordionSummaryProps
>(function HarmonyAccordionSummary(props, ref) {
  const { className, ...rest } = props
  return (
    <MuiAccordionSummary
      ref={ref}
      className={cn('accordion__trigger', className)}
      {...rest}
    />
  )
})

export const HarmonyAccordionDetails = forwardRef<
  HTMLDivElement,
  AccordionDetailsProps
>(function HarmonyAccordionDetails(props, ref) {
  const { className, ...rest } = props
  return (
    <MuiAccordionDetails
      ref={ref}
      className={cn('accordion__content', className)}
      {...rest}
    />
  )
})

export const HarmonyTableContainer = forwardRef<
  HTMLDivElement,
  TableContainerProps & { headerVariant?: 'gray' | 'white' | 'none' }
>(function HarmonyTableContainer(props, ref) {
  const { className, headerVariant = 'gray', children, ...rest } = props
  const hv =
    headerVariant === 'gray'
      ? 'table--header-gray'
      : headerVariant === 'white'
        ? 'table--header-white'
        : 'table--header-none'
  const tableClasses = cn('table', hv)

  const mergedChildren = Children.map(children, (child) => {
    if (!isValidElement<MuiTableProps>(child) || child.type !== MuiTable) {
      return child
    }
    return cloneElement(child, {
      className: cn(tableClasses, child.props.className),
    })
  })

  return (
    <MuiTableContainer ref={ref} className={className} {...rest}>
      {mergedChildren}
    </MuiTableContainer>
  )
})

export const HarmonyMenu = forwardRef<HTMLDivElement, MenuProps>(
  function HarmonyMenu(props, ref) {
    const { slotProps, ...rest } = props
    const paperSlot = slotProps?.paper
    return (
      <MuiMenu
        ref={ref}
        slotProps={{
          ...slotProps,
          paper: (ownerState) => {
            const prev =
              typeof paperSlot === 'function'
                ? paperSlot(ownerState)
                : paperSlot ?? {}
            return {
              ...prev,
              className: cn('list-menu', prev.className),
            }
          },
        }}
        {...rest}
      />
    )
  },
)

export const HarmonyMenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function HarmonyMenuItem(props, ref) {
    const { className, ...rest } = props
    return (
      <MuiMenuItem
        ref={ref}
        className={cn('list-menu__item', className)}
        {...rest}
      />
    )
  },
)

export const HarmonyPickerPopover = forwardRef<HTMLDivElement, PopoverProps>(
  function HarmonyPickerPopover(props, ref) {
    const { slotProps, ...rest } = props
    const paperSlot = slotProps?.paper
    return (
      <MuiPopover
        ref={ref}
        slotProps={{
          ...slotProps,
          paper: (ownerState) => {
            const prev =
              typeof paperSlot === 'function'
                ? paperSlot(ownerState)
                : paperSlot ?? {}
            return {
              ...prev,
              className: cn('picker-popup', 'is-open', prev.className),
            }
          },
        }}
        {...rest}
      />
    )
  },
)

export const HarmonyKanbanContainer = forwardRef<HTMLDivElement, BoxProps>(
  function HarmonyKanbanContainer(props, ref) {
    const { className, ...rest } = props
    return (
      <MuiBox
        ref={ref}
        className={cn('kanban__container', className)}
        {...rest}
      />
    )
  },
)

export const HarmonyRangeInput = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>(function HarmonyRangeInput(props, ref) {
  const { className, type = 'range', ...rest } = props
  return (
    <input
      ref={ref}
      type={type}
      className={cn('range', className)}
      {...rest}
    />
  )
})

export const HarmonyMonthField = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyMonthField(props, ref) {
  const { className, slotProps, value, ...rest } = props
  const year = yearFromMonthValue(value)
  const sel = selectedMonthIndex(value)
  return (
    <div ref={ref} className={cn('month-picker', className)}>
      <div className="month-picker__header">
        <button
          type="button"
          className="month-picker__nav-btn"
          disabled
          tabIndex={-1}
          aria-hidden
        >
          ‹
        </button>
        <span className="month-picker__year">{year}</span>
        <button
          type="button"
          className="month-picker__nav-btn"
          disabled
          tabIndex={-1}
          aria-hidden
        >
          ›
        </button>
      </div>
      <div className="month-picker__grid" aria-hidden>
        {MONTH_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={cn(
              'month-picker__month',
              sel === i && 'month-picker__month--selected',
              (sel === null || sel !== i) && 'month-picker__month--disabled',
            )}
            disabled
            tabIndex={-1}
          >
            {label}
          </button>
        ))}
      </div>
      <MuiTextField
        type="month"
        variant="standard"
        fullWidth
        className="form-group"
        value={value}
        slotProps={mergeStandardTextFieldSlots(
          slotProps,
          'date-input',
          'label',
        )}
        {...rest}
      />
    </div>
  )
})

export const HarmonyWeekField = forwardRef<
  HTMLDivElement,
  StandardTextFieldProps
>(function HarmonyWeekField(props, ref) {
  const { className, slotProps, value, ...rest } = props
  let yearStr = '—'
  if (value != null && !Array.isArray(value)) {
    const m = /^(\d{4})-W/.exec(String(value))
    if (m) yearStr = m[1] ?? '—'
  }
  return (
    <div ref={ref} className={cn('week-picker', className)}>
      <div className="week-picker__header">
        <button
          type="button"
          className="week-picker__nav-btn"
          disabled
          tabIndex={-1}
          aria-hidden
        >
          ‹
        </button>
        <span className="week-picker__year">{yearStr}</span>
        <button
          type="button"
          className="week-picker__nav-btn"
          disabled
          tabIndex={-1}
          aria-hidden
        >
          ›
        </button>
      </div>
      <div className="week-picker__list" aria-hidden>
        <button
          type="button"
          className="week-picker__week week-picker__week--disabled"
          disabled
          tabIndex={-1}
        >
          <span className="week-picker__week-number">W01</span>
          <span className="week-picker__week-range">Jan 1 – Jan 7</span>
        </button>
        <button
          type="button"
          className="week-picker__week week-picker__week--disabled"
          disabled
          tabIndex={-1}
        >
          <span className="week-picker__week-number">W02</span>
          <span className="week-picker__week-range">Jan 8 – Jan 14</span>
        </button>
      </div>
      <MuiTextField
        type="week"
        variant="standard"
        fullWidth
        className="form-group"
        value={value}
        slotProps={mergeStandardTextFieldSlots(
          slotProps,
          'date-input',
          'label',
        )}
        {...rest}
      />
    </div>
  )
})
