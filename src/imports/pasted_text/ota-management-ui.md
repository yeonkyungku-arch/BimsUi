Create a web dashboard UI for **“OTA Management”** in a B2B device management system (BIMS).

The UI should follow a clean, modern SaaS dashboard style with a structured layout.

---

## 1. Overall Layout

* Top: Page Title → “OTA Management”
* Below: Filter & Action Bar
* Main Content:

  * Left: OTA Version List (or Campaign List)
  * Right: Detail Panel

Use a 2-column layout:

* Left: 40% (List)
* Right: 60% (Detail)

---

## 2. Filter & Action Bar

Include the following elements:

* Dropdown: Customer (All / Select customer)
* Dropdown: Device Type
* Dropdown: Status (All / Pending / In Progress / Completed / Failed)
* Search Input: Version or Campaign name

Right side:

* Primary Button: “Create OTA Campaign”

---

## 3. OTA Campaign List (Left Panel)

Display a vertical list of OTA campaigns.

Each item should include:

* Campaign Name (e.g., “v1.2.3 Firmware Update”)
* Target:

  * Number of Stations
  * Number of Devices
* Status Badge:

  * Pending (gray)
  * In Progress (blue)
  * Completed (green)
  * Failed (red)
* Progress Bar (if in progress)
* Last Updated Date

Interaction:

* Clicking an item loads its detail in the right panel
* Selected item should be highlighted

---

## 4. OTA Detail Panel (Right)

When a campaign is selected, show:

### 4.1 Header

* Campaign Name
* Status Badge
* Action Buttons:

  * Pause / Resume
  * Cancel
  * Retry Failed

---

### 4.2 Summary Section

Show key metrics:

* Total Devices
* Completed
* In Progress
* Failed
* Success Rate (%)

Use card-style KPI blocks.

---

### 4.3 Target Scope

Display:

* Customer Name
* Stations List (collapsed/expandable)
* Device Count

---

### 4.4 Device Status Table

Table columns:

* Device ID
* Station Name
* Status
* Battery
* Communication
* Last Update Time

Include:

* Row status color indicator
* Sorting or filtering options

---

### 4.5 Progress Visualization

* Horizontal progress bar (overall)
* Optional: small chart (completion over time)

---

## 5. UX Behavior

* Filters update the list only (do not change layout)
* Selecting a campaign updates detail panel only
* Status should be visually clear (color-coded)
* Focus on monitoring and control, not editing

---

## 6. Visual Style

* Minimal, clean, enterprise SaaS UI
* Rounded cards (8–12px radius)
* Soft shadows
* Neutral background (light gray)
* Accent color: blue for active states

---

## 7. Key UX Principle

* Left = selection / navigation
* Right = detail / control
* Status visibility is the highest priority

---

Design the UI so that users can quickly:

* Identify OTA progress
* Detect failures
* Take action immediately
