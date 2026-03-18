# Issues Library

Catalog of seedable UI issues mapped to pages and Nielsen heuristics.

## Format

| id | page | heuristicId | short_desc | severity | implementation_hint |

## Issues

| id | page | heuristicId | short_desc | severity | implementation_hint |
|----|------|-------------|--------------|----------|---------------------|
| HOME-01 | home | H1 | ambiguous_cta | medium | CTA button text says "Do It" instead of "Create Task" |
| HOME-02 | home | H4 | modal_no_close | high | Quick-add modal missing visible close button |
| AUTH-01 | auth | H1 | missing_labels | high | Input fields show placeholders only, no labels |
| AUTH-02 | auth | H9 | cryptic_error | high | Error message shows "ERR_AUTH_FAIL" instead of helpful text |
| TASKS-01 | tasks | H5 | no_confirm_delete | high | Delete task has no confirmation dialog |
| TASKS-02 | tasks | H8 | small_hit_target | medium | Delete icon is 12x12px, hard to click |
| TASK-01 | task | H4 | save_affordance_confusing | medium | Save button looks disabled (low contrast) |
| TASK-02 | task | H1 | nonstandard_date_format | low | Date shows as "20260315" instead of "Mar 15, 2026" |
| PROJ-01 | projects | H4 | icons_inconsistent | low | Some actions use icons, others use text |
| PROJ-02 | projects | H6 | hidden_controls | medium | Reorder handles only visible on hover |
| CAL-01 | calendar | H1 | no_spinner | medium | No loading indicator on slow loads |
| CAL-02 | calendar | H4 | ambiguous_timepicker | medium | Time picker shows "00:00" without AM/PM indicator |
| SRCH-01 | search | H5 | filters_reset | high | Filters reset when sorting changes |
| SRCH-02 | search | H3 | missing_no_results_help | medium | No suggestions when search returns 0 results |
| SET-01 | settings | H5 | destructive_toggle_no_warn | high | Toggle "Delete Account" has no confirmation |
| SET-02 | settings | H4 | ambiguous_toggle_labels | medium | Toggle labels say "Enable/Disable" without context |
| ONB-01 | onboarding | H5 | skip_too_easy | low | Skip button is more prominent than Next |

## Nielsen Heuristics Reference

1. **Visibility of system status**
2. **Match between system and the real world**
3. **User control and freedom**
4. **Consistency and standards**
5. **Error prevention**
6. **Recognition rather than recall**
7. **Flexibility and efficiency of use**
8. **Aesthetic and minimalist design**
9. **Help users recognize, diagnose, and recover from errors**
10. **Help and documentation**

## Mode Definitions

- **lite**: Only low/medium severity issues active
- **full**: All issues including high severity active

## How Seeds Work

Each issue maps to a flag in `seed.json`. When enabled, the UI component injects the fault.

Example:
```json
{
  "tasks": {
    "no_confirm_delete": true,
    "small_hit_target": true
  }
}
```

When `no_confirm_delete` is true, the delete action skips confirmation.
