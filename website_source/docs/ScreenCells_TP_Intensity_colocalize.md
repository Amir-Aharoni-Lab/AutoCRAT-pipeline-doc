# ScreenCells_TP_Intensity_colocalize Script Documentation

<iframe src="../assets/ScreenCells_TP_intensity_colocalize_diagram.html" width="800" height="350" style="border:none; margin:0; padding:0; display:block;"></iframe>

---
The **ScreenCells_TP_Intensity_colocalize** script extends the functionality of the **ScreenCells_TP_Intensity** script. It analyzes and compares two sets of AutoCRAT output files: one for a Basic condition and one for a GroupB condition. For each selected time point, it checks cell intensity in a chosen channel and classifies cells as positive or negative based on a defined threshold. Missing intensity values are handled using neighboring time points.
The script then compares the positive cells only between the two conditions (Basic vs. GroupB) to determine if they are colocalized — based on either spatial closeness (within a defined x/y/z tolerance) or small intensity differences. All results are saved as time-point-specific Excel files, along with a summary Excel file that includes colocalization statistics and embedded plots.

---

>### 📌 Region Size for Intensity Detection in Basic vs GroupB
>To compare colocalized vs non-colocalized signal intensities (e.g., EGFP), the AutoCRAT pipeline should be run twice with different
>region sizes, configured using the `idcl_slice_diameter` parameter in the AutoCRAT config - **Template.yml** file.
>
>🔹 **Basic Condition** – Colocalized Detection
>Use a small region to focus on tightly colocalized intensity:
>
> ```
>idcl_slice_diameter:
>  *c2: [3, 5, 5]
> ```
>
>This defines the region in pixels as [z, y, x], targeting signals that are strongly colocalized with other markers.<br>
>
>🔹 **GroupB Condition** – Broad Detection for Non-Colocalized Signals
>Use a larger region to capture broader or displaced intensity:
>
> ```
>idcl_slice_diameter:
>  *c2: [7, 20, 20]
> ```
>
>This setting expands the detection area, allowing AutoCRAT to identify signal that is not necessarily colocalized but still present in
>the surrounding cellular region.<br>
>
>⚠️ **Limitation** <br>
>AutoCRAT detects only a single maximum intensity point per channel within the defined region.
>However, in some biological cases, multiple spatially distinct maxima may exist (e.g., multiple foci with similar intensity). 
>This means:<br>
>- Only one of the potential maxima is reported. <br>
>- Other relevant high-intensity signals within the region might be ignored. <br>
>This limitation should be considered when interpreting results—especially when using large regions where multiple distinct signals might 
>be present.

---

## Key Tasks

### - Independently Process Basic and GroupB Conditions

The script separately analyzes two AutoCRAT runs: one labeled **Basic** and the other **GroupB**.  
For each condition, it:

- Loads the corresponding **Rep Summary** file to extract the list of imaging fields.
- Finds and loads all matching **Results** files.
- For each specified time point, extracts intensity and spatial data from cell sheets.
- Handles missing intensity values in the `channel_of_interest` using neighbor-based interpolation.
- Classifies each cell as **Positive** or **Negative** based on the defined intensity threshold (`min_intensity`).  
  Cells are marked **Positive** if intensity in the `channel_of_interest` exceeds the threshold. All others are marked **Negative**.
- Outputs per-time-point Excel files (Positive and Negative sheets).

### - Perform Colocalization Analysis

- For each time point, compares only **Positive** cells from GroupB to **Positive** cells from Basic.
- A GroupB cell is declared **Colocalized** if:
  - It matches a Basic cell (same Field and Cell ID), and  
    either:
    - Their spatial coordinates (x, y, z) are within `position_tolerance`, or
    - Their intensity difference is within `intensity_delta_threshold` (if spatial data is unavailable).
- Cells that do not match or do not meet these criteria are labeled **Non-colocalized**.

### - Generate Summary Excel File with Plots

At the end of the analysis, the script generates a single Excel file that consolidates results across all specified time points.  
This file contains **three sheets**:

- **Basic** and **GroupB** sheets  
  Each sheet contains:
    - A summary table with total cells, positive cells, and percentage per time point
    - Two embedded plots (counts and percentages)

- **Analysis** sheet  
  This sheet compares the two conditions and includes:
    - A merged table showing: Total and positive cell counts for both Basic and GroupB; Percentage of positives; Colocalized and Non-Colocalized cell counts per time point
    - One embedded plot summarizing the above data


> ### ⚠️ Important: Cell Order Consistency Between Runs
>
> For accurate colocalization analysis, it's **critical** to ensure that both AutoCRAT runs (**Basic** and **GroupB**) assigned cell numbers in the same order within each field.
>
> This means:
>
> - **Cell 1** in the Basic Results file must correspond to **Cell 1** in the GroupB file,
> - **Cell 2** to **Cell 2**, and so on.
>
> ✅ You can verify this by comparing cell coordinates or intensity values in **other channels** (e.g., `Cy5` or `tdTom`) — they should be consistent across the two runs for the same Field and Cell number.
>
> ❗ If the order differs between runs, the colocalization results will be invalid.

---

## How to Use ScreenCells_TP_Intensity_colocalize Script

### Step 1: Edit Parameters in the Script

#### • Specify the File Locations for Both Conditions  
Set the folder and filename of the '**Rep Summary**' file for both the **Basic** and **GroupB** conditions.  
Make sure the corresponding '**Results**' files are located in the same folders as the summary files.

```python
# Basic condition
rep_summary_folder_basic = Path('path_to_basic_folder')
rep_summary_filename_basic = 'your_basic_rep_summary_file.xlsx'

# GroupB condition
rep_summary_folder_groupb = Path('path_to_groupb_folder')
rep_summary_filename_groupb = 'your_groupb_rep_summary_file.xlsx'
```

#### • Set Output Folder

Specify the folder where all output files (classified Excel files and summary Excel) will be saved:

```python
output_folder = Path('path_to_output_folder')
```

#### • Set Analysis Parameters

Update the screening and colocalization settings:

* `required_time_points`: List of specific time points to analyze
* `channel_set`: List of channels to extract from each cell sheet
* `channel_of_interest`: Channel used to classify cells as positive
* `min_intensity`: Minimum intensity required for a cell to be considered positive
* `position_tolerance`: Max allowed x/y/z spatial difference for colocalization
* `intensity_delta_threshold`: Max allowed intensity difference for fallback colocalization

```python
required_time_points = [10, 20, 30, 40, 50]
channel_set = ['Cy5', 'tdTom', 'EGFP']
channel_of_interest = 'EGFP'
min_intensity = 65
position_tolerance = 1.0
intensity_delta_threshold = 10
```
---

>### 📐 About `position_tolerance` and `intensity_delta_threshold`
>
>These two parameters control how the script determines whether a **GroupB-positive** cell is **colocalized** with a **Basic-positive** 
>cell.  
>Both checks apply only to cells that share the same `Field` and `Cell ID`, and the comparison is performed **per cell, per field, at each 
>specified time point**.
>
>#### • `position_tolerance`  
>Defines the **maximum allowed spatial difference** (in pixels) to consider two matching cells colocalized.  
>It compares the **x, y, z coordinates** of the `channel_of_interest` (e.g., EGFP) between GroupB and Basic cell:
>
> $$ |x_{basic} - x_{groupb}| < \text{position\_tolerance} $$  
> $$ |y_{basic} - y_{groupb}| < \text{position\_tolerance} $$  
> $$ |z_{basic} - z_{groupb}| < \text{position\_tolerance} $$
>
> **Important:**
> **All three coordinates (x, y, and z)** must be within the threshold to declare the cell **colocalized**.
>
>**Example:**
> 
>If `position_tolerance = 1.0`, and a cell in GroupB (EGFP) has coordinates:
>
>```
>x = 105.1, y = 210.5, z = 2.0
>```
>
>and the corresponding Basic cell has:
>
>```
>x = 104.5, y = 210.0, z = 2.1
>```
>
>Then:
>
>```
>dx = 0.6, dy = 0.5, dz = 0.1
>```
>
>→ All are below the threshold → ✅ **Colocalized**
>
>---
> #### • `intensity_delta_threshold`
> 
> Used as a **fallback** when x/y/z coordinates for the `channel_of_interest` are **missing**.
> It defines the **maximum allowed difference in intensity values** between GroupB and Basic:
> 
> $$ |intensity_{basic} - intensity_{groupb}| <= \text{intensity\_delta\_threshold} $$
> 
> **Example:**
> If `intensity_delta_threshold = 10`, and:
> 
> * GroupB EGFP intensity = 91.0
> * Basic EGFP intensity = 85.4
>   → Difference = 5.6 → ✅ **Colocalized**
> 
> If the difference were 15.0 → ❌ **Non-colocalized**
>

---

### Step 2: Run the Script

After updating all parameters:

* Save the script
* Run it in your Python environment (e.g., Terminal, Jupyter Notebook, PyCharm, VS Code)

---

### Step 3: Output Files

The script generates multiple output files in the specified `output_folder`:

#### • Per-Time Point Classification Files

For **each time point** and **each condition**, the script produces an Excel file:

```
<rep_summary_filename> - Screened (TP <time_point>, Int <min_intensity>).xlsx
```

Each file includes:

* A **Positive** sheet: cells classified as positive in the selected channel
* A **Negative** sheet: cells that did not meet the intensity threshold
* Summary rows at the top of each sheet: total cell count, positive count, and percentage

#### • Final Combined Summary File

```
<rep_summary_filename> - Screened Sum (TP [<list>], Int <min_intensity>).xlsx
```

This summary Excel file includes **three sheets**:

- **Basic** and **GroupB**:
  Each contains a time-point summary table and two embedded plots:

    * Total and positive cell counts
    * Percentage of positive cells

- **Analysis**:
  Combines the two conditions and shows:

    * Cell counts and percentages for both Basic and GroupB
    * Number of Colocalized and Non-Colocalized cells per time point
    * One embedded plot comparing colocalization results

> **📌 Important:**
> Ensure that cell numbering is consistent between the Basic and GroupB runs for valid comparison.
> Cell 1 in Basic must correspond to Cell 1 in GroupB, and so on.

---

## Example Configuration  

Below is a sample setup for running the **ScreenCells_TP_Intensity_colocalize** script.  
This configuration will:

- Analyze two AutoCRAT runs: **Basic** (colocalized region) and **GroupB** (broader region)  
- Process 5 time points: 10, 20, 30, 40, and 50  
- Extract intensity and coordinate values for three channels: Cy5, tdTom, and EGFP  
- Classify cells as **positive** if their EGFP intensity is greater than 65  
- Compare positive cells between conditions to determine **colocalization**  
- Generate per-time-point classification files and a combined summary file with statistics and embedded charts

```python
""" Parameters """

# === File Paths ===

# Path and filename for Basic condition (e.g., small region to detect colocalized signals)
rep_summary_folder_basic = Path('C:\Project\AutoCRAT_Output\Run_Basic')
rep_summary_filename_basic = 'MyProject - Rep Summary (AutoCRAT 20250611 1411).xlsx'

# Path and filename for GroupB condition (e.g., wide region to detect broader signal)
rep_summary_folder_groupb = Path('C:\Project\AutoCRAT_Output\Run_GroupB')
rep_summary_filename_groupb = 'MyProject - Rep Summary (AutoCRAT 20250612 1301).xlsx'

# Folder to save output results
output_folder = Path('C:\Project\AutoCRAT_Output\Colocalization_Results')

# === Screening and Comparison Parameters ===

required_time_points = [10, 20, 30, 40, 50]   # Time points to analyze
channel_set = ['Cy5', 'tdTom', 'EGFP']        # Channels to extract from each Results file
channel_of_interest = 'EGFP'                  # Channel used for classification
min_intensity = 65                            # Minimum intensity to define a "positive" cell
position_tolerance = 1.0                      # Max allowed difference (in pixels) for x/y/z to be considered colocalized
intensity_delta_threshold = 10                # Max allowed intensity difference if position data is missing
```

### Expected Output

All output files will be saved to the specified `output_folder`. The script generates:

**Per-Time Point Classification Files**
For each condition (**Basic** and **GroupB**) and each time point, an Excel file is created with:

* A **Positive** sheet and a **Negative** sheet
* Intensity and coordinate values for each channel
* Summary rows at the top of each sheet (Total cells, Positive cells, Percentage)

Examples:

* `C:\Project\AutoCRAT_Output\Colocalization_Results\MyProject - Rep Summary (AutoCRAT 20250611 1411) - Screened (TP 10, Int 65).xlsx`
* `C:\Project\AutoCRAT_Output\Colocalization_Results\MyProject - Rep Summary (AutoCRAT 20250612 1301) - Screened (TP 10, Int 65).xlsx`

**Final Combined Summary File with Colocalization**
An additional summary file is generated that combines both conditions and colocalization statistics:

* `C:\Project\AutoCRAT_Output\Colocalization_Results\MyProject - Rep Summary - Screened Sum (TP [10,20,30,40,50], Int 65).xlsx`

This file contains:

* A **Basic** sheet and a **GroupB** sheet with per-time-point summary tables and embedded plots
* An **Analysis** sheet that includes:

    * Total and positive cell counts for each condition
    * Colocalized and Non-Colocalized counts per time point
    * A plot comparing Coloc vs NonColoc cells

### 📊 Example Output: Basic Condition Summary

The **Basic** sheet in the final summary Excel file shows per-time-point statistics of signal-positive cells based on the selected intensity threshold.

#### Summary Table

|                | 10  | 20  | 30  | 40  | 50  |
|----------------|-----|-----|-----|-----|-----|
| **Total Cells**    | 576 | 626 | 642 | 651 | 650 |
| **Positive Cells** | 15  | 64  | 46  | 55  | 60  |
| **Percentage**     | 2.6 | 10.22 | 7.17 | 8.45 | 9.23 |

#### Plots

<div align="center">
    <img src="../assets/plot_counts_Basic.png" alt="Total and Positive Cells - Basic Condition" width="500">
    <p><em>Figure: Total and Positive Cell Counts per Time Point (Basic condition)</em></p>
</div>

<div align="center">
    <img src="../assets/plot_percentage_Basic.png" alt="Percentage of Positive Cells - Basic Condition" width="500">
    <p><em>Figure: Percentage of Positive Cells per Time Point (Basic condition)</em></p>
</div>



### 📊 Example: Analysis Sheet Table

The `Analysis` sheet in the final summary Excel file shows the comparison between Basic and GroupB conditions, as well as colocalization statistics per time point.

| Time Point | Total Cells Basic | Positive Cells Basic | Percentage Basic | Total Cells GroupB | Positive Cells GroupB | Percentage GroupB | Coloc | NonColoc |
|------------|-------------------|-----------------------|------------------|---------------------|------------------------|-------------------|-------|----------|
| 10         | 576               | 15                    | 2.6              | 576                 | 60                     | 10.42             | 14    | 46       |
| 20         | 626               | 64                    | 10.22            | 626                 | 222                    | 35.46             | 58    | 164      |
| 30         | 642               | 46                    | 7.17             | 642                 | 181                    | 28.19             | 44    | 137      |
| 40         | 651               | 55                    | 8.45             | 651                 | 223                    | 34.25             | 53    | 170      |
| 50         | 650               | 60                    | 9.23             | 650                 | 194                    | 29.85             | 56    | 138      |

### 📈 Example Plot: Colocalized vs Non-Colocalized Cells

This plot from the **Analysis** sheet visualizes the number of colocalized and non-colocalized cells for each time point.

<div align="center">
  <img src="../assets/plot_analysis_coloc.png" alt="Coloc vs NonColoc per Time Point" width="600">
  <p><em>Figure: Colocalized vs Non-Colocalized Cells Across Time Points</em></p>
</div>

---

By following these steps, you can systematically compare two AutoCRAT conditions across time points, identify signal-positive cells based on intensity thresholds, and assess whether matching cells from both runs are colocalized — assuming the Basic run was performed with the goal of detecting colocalized signals.


