# Component Manifest

**Purpose:** One row per `reference-components/*.tsx` component. Tracks where styles live, host framework equivalents, and mapping status.

**How to use:** During Pass 6 (Component Overrides) of the [MAPPING_PLAYBOOK.md](MAPPING_PLAYBOOK.md), work through each row. Update the Status column as you map or gap each component.

**Status values:** `pending` | `mapped` | `gap` (add to inventory §13) | `n/a` (not applicable to host)

---

## Form Controls

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| Button.tsx | none | BUTTON (line 8) | MuiButton | Button | pending |
| Input.tsx | Input.css | INPUT (line 458) | MuiTextField / MuiInput | Input | pending |
| Textarea.tsx | Textarea.css | TEXTAREA (line 526) | MuiTextField (multiline) | Textarea | pending |
| Label.tsx | Label.css | LABEL (line 579) | MuiInputLabel / MuiFormLabel | Label | pending |
| Checkbox.tsx | Checkbox.css | CHECKBOX (line 834) | MuiCheckbox | Checkbox | pending |
| CheckboxGroup.tsx | CheckboxGroup.css | RADIO GROUP / CHECKBOX GROUP (line 672) | MuiFormGroup | CheckboxGroup (custom) | pending |
| RadioButton.tsx | RadioButton.css | RADIO (line 985) | MuiRadio | RadioGroup | pending |
| RadioGroup.tsx | RadioGroup.css | RADIO GROUP / CHECKBOX GROUP (line 672) | MuiRadioGroup | RadioGroup | pending |
| Toggle.tsx | Toggle.css | TOGGLE / SWITCH (line 1135) | MuiSwitch | Switch | pending |
| Dropdown.tsx | Dropdown.css | SELECT / DROPDOWN (line 1223) | MuiSelect / MuiMenu | Select | pending |
| DateInput.tsx | DateInput.css | DATE INPUT (line 2973) | MuiDateField | DateInput (custom) | pending |
| DatePicker.tsx | DatePicker.css | DATE PICKER (line 3138) | MuiDatePicker | DatePicker (custom) | pending |
| TimePicker.tsx | TimePicker.css | TIME PICKER (line 3484) | MuiTimePicker | TimePicker (custom) | pending |
| DateTimePicker.tsx | DateTimePicker.css | DATETIME PICKER (line 3626) | MuiDateTimePicker | DateTimePicker (custom) | pending |
| MonthPicker.tsx | MonthPicker.css | MONTH PICKER (line 3652) | MuiDatePicker (views) | MonthPicker (custom) | pending |
| WeekPicker.tsx | WeekPicker.css | WEEK PICKER (line 3772) | custom | WeekPicker (custom) | pending |
| NumberInput.tsx | NumberInput.css | NUMBER INPUT (line 3921) | MuiTextField (type=number) | Input (type=number) | pending |
| RangeInput.tsx | RangeInput.css | RANGE INPUT (line 4002) | MuiSlider | Slider | pending |

## Feedback

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| Alert.tsx | Alert.css | ALERT (line 2081) | MuiAlert | Alert | pending |
| Badge.tsx | Badge.css | BADGE (line 1574) | MuiBadge | Badge | pending |
| NotificationBadge.tsx | NotificationBadge.css | NOTIFICATION BADGE (line 1660) | MuiBadge (variant) | Badge (variant) | pending |
| Chip.tsx | Chip.css | CHIP (line 1781) | MuiChip | Badge / custom | pending |
| Tooltip.tsx | Tooltip.css | TOOLTIP (line 2460) | MuiTooltip | Tooltip | pending |
| ProgressBar.tsx | ProgressBar.css | PROGRESS BAR (line 2737) | MuiLinearProgress | Progress | pending |
| Spinner.tsx | Spinner.css | SPINNER (line 2783) | MuiCircularProgress | Spinner (custom) | pending |
| Dialog.tsx | Dialog.css | DIALOG / MODAL (line 2589) | MuiDialog | Dialog | pending |

## Data Display

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| Card.tsx | none | CARD (line 2277) | MuiCard | Card | pending |
| Accordion.tsx | Accordion.css | ACCORDION (line 2390) | MuiAccordion | Accordion | pending |
| Table.tsx | Table.css | TABLE (line 5771) | MuiTable / MuiDataGrid | Table | pending |
| Kanban.tsx | Kanban.css | KANBAN BOARD (line 7082) | custom | custom | pending |
| KanbanCard.tsx | KanbanCard.css | KANBAN BOARD (line 7082) | custom | custom | pending |
| ListMenu.tsx | ListMenu.css | LIST MENU (line 4841) | MuiList / MuiMenu | DropdownMenu / Command | pending |
| TabStrip.tsx | TabStrip.css | TABS (line 2811) | MuiTabs | Tabs | pending |

## Actions and Navigation

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| Link.tsx | Link.css | LINK (line 2920) | MuiLink | Link (custom) | pending |
| ButtonGroup.tsx | ButtonGroup.css | BUTTON GROUP (line 4606) | MuiButtonGroup | ButtonGroup (custom) | pending |
| Stepper.tsx | none | STEPPER (line 4106) | MuiStepper | Stepper (custom) | pending |
| Step.tsx | Step.css | STEPPER (line 4106) | MuiStep | Step (custom) | pending |
| Avatar.tsx | Avatar.css | AVATAR (line 6310) | MuiAvatar | Avatar | pending |

## Shell

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| ShellLayout.tsx | ShellLayout.css | SHELL LAYOUT (line 6352) | custom layout | custom layout | pending |
| ShellHeader.tsx | none | — (styles in layout.css `.header*`) | MuiAppBar | custom header | pending |
| ShellPageHeader.tsx | ShellPageHeader.css | — (styles in layout.css `.page-header*`) | custom | custom | pending |
| LeftSidebar.tsx | LeftSidebar.css | LEFT SIDEBAR (line 5241) | MuiDrawer | Sheet / custom | pending |
| RightSidebar.tsx | RightSidebar.css | RIGHT SIDEBAR (line 5484) | MuiDrawer | Sheet / custom | pending |
| ShellFooter.tsx | ShellFooter.css | — (footer in layout.css) | MuiBottomNavigation | custom | pending |
| FloatingNav.tsx | FloatingNav.css | CP FLOATING NAV (line 5031) | custom FAB bar | custom | pending |
| ShellPanel.tsx | ShellPanel.css | SHELL PANEL (line 6489) | MuiDrawer (anchor=right) | Sheet | pending |

## Utilities

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| Icon.tsx | none | — (icon sizing in tokens.css) | SvgIcon | custom icon component | pending |
| PickerPopup.tsx | PickerPopup.css | PICKER POPUP (line 3058) | MuiPopover / MuiPopper | Popover | pending |

## Types

| File | Colocated CSS | components.css section | MUI equivalent | shadcn equivalent | Status |
|------|---------------|----------------------|----------------|-------------------|--------|
| types.ts | n/a | n/a | TypeScript types | TypeScript types | n/a |
