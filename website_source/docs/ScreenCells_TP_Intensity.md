# ScreenCells_TP_Intensity Script Documentation

<iframe src="../assets/ScreenCells_TP_intensity_diagram.html" width="800" height="350" style="border:none; margin:0; padding:0; display:block;"></iframe>

---
The **ScreenCells_TP_Intensity** script analyzes cell intensity data from AutoCRAT output files at specific time points. It classifies cells as **positive** or **negative** based on whether the intensity in a specified channel exceeds a threshold. The script handles missing data with neighbor interpolation and summarizes results with classification sheets and summary plots embedded directly in Excel.

---

> ### 📌 Region Size for Intensity Detection  
> To adjust the **region AutoCRAT uses to detect dot intensity** (e.g., for channels like EGFP), update the following parameter in the `AutoCRAT config - Template.yml` file:
>
> ```
> idcl_slice_diameter:
>   *c2: [3, 5, 5]
> ```
>
> This sets the region size in pixels as `[z, y, x]`, where AutoCRAT measures intensity.  
> Increasing these values widens the detection zone and can help capture signals that are **not co-localized**.

---

## Key Tasks

### &nbsp;&nbsp;- Read and Parse Input Files
- Loads the '**Rep Summary**' file to identify imaging fields (positions) to analyze. 
- Finds matching '**Results**' files for each field.

### &nbsp;&nbsp;- Extract and Evaluate Intensity Values  Per Time Point
- For each specified time point (`required_time_points`), scans each cell sheet in each '**Results**' file.
- Extracts the intensity values for a list of channels (`channel_set`).
- Handles missing values in the channel of interest (`channel_of_interest`) using neighboring values (time-1 and time+1, if available).

### &nbsp;&nbsp;- Classify Cells as Positive or Negative
- Marks a cell as **positive** if the intensity for the channel of interest exceeds the defined threshold (`min_intensity`).
- Otherwise, the cell is marked as **negative**.

### &nbsp;&nbsp;- Generate Output Files
- For each time point (`required_time_points`), creates an Excel file with two sheets:<br>
    - Positive: Cells meet the intensity criterion.
    - Negative: Cells that do not.
- Create Excel Summary File with:
    - Total cells, positive cells, and percentage per time point.
    - Two embedded plots (counts and percentages).

---
## How to Use ScreenCells_TP_Intensity Script

### Step 1: Edit Parameters in the Script

#### &nbsp;&nbsp;• Specify the RNSA File Location
Set the folder and filename of the '**Rep Summary**' file. Ensure the corresponding '**Results**' filel are located in the same folder:
```python
rep_summary_folder = Path('path_to_your_folder')
rep_summary_filename = 'your_rep_summary_file.xlsx'
```

#### &nbsp;&nbsp;• Set Analysis Parameters
Update the parameters for cell screening:<br>
- `Required Time Points`: List of specific time points to analyze.<br>
- `Chanel Set`: List of channels to extract from each Cell sheet.<br>
- `Channel of Interest`: The specific channel used to decide if a cell is **positive** (channel to analyze).<br>
- `Minimum Intensity Threshold`: The minimum intensity value that qualifies a cell as positive.
```python
required_time_points = [10, 20, ..., 170]  # List of time points
channel_set = ['Cy5', 'tdTom', 'EGFP']     # Channels to extract
channel_of_interest = 'EGFP'               # Channel used for classification
min_intensity = 65                         # Intensity threshold
```
---

### Step 2: Run the Script
After editing the parameters: <br>
&nbsp;&nbsp;• Save the script. <br>
&nbsp;&nbsp;• Run the script in your Python environment (e.g., command line, Jupyter Notebook, or PyCharm).

---

### Step 3: Output Files
The script generates output files, saved in the same folder as the original '**Rep Summary**' file. These include both per-time-point classification reports and a cumulative summary with embedded charts.

- Per-Time Point Classification Files:

``` <rep_summary_filename> - Screened (TP <time_point>, Int <min_intensity>).xlsx``` : <br> 
<br>
For each time point in `required_time_points`, the script summarizes positive and negative cells based on the analysis.  Each file includes summary information: the total number of cells evaluated at the given time point; the number of cells classified as positive/negative; and the percentage of positive/negative cells.  
   
- Summary File with Plots

```<rep_summary_filename> - Screened Sum (TP [<list>], Int <min_intensity>).xlsx```: <br> 
<br>
An additional Excel file is generated to summarize all time points. This file contains: <br>
- A summary table showing, for each time point: the total number of cells evaluated, the number of positive cells, and the percentage of positives.<br>
- Two embedded bar plots: total and positive cell counts per time point; percentage of positive cells per time point.

---
## Example Configuration
Below is a sample setup for running the **ScreenCells_TP_Intensity** script. 
This configuration will:
- Process 5 time points: 10, 20, 30, 40, and 50
- Extract intensity values for three channels: Cy5, tdTom, and EGFP
- Classify cells based on whether their EGFP intensity is greater than 65
- Generate per-time-point Excel files and a cumulative summary file with statistics and charts

```python
""" Parameters """
# Path to the folder where your AutoCRAT outputs are stored.
# This folder must contain the "Rep Summary" file and the relevant "Results" files.
rep_summary_folder = Path('C:\Project\AutoCRAT_Output')

# Name of the AutoCRAT "Rep Summary" file to analyze.
# This file defines which fields (positions) will be used to locate the corresponding Results files.
rep_summary_filename = 'MyProject - Rep Summary (AutoCRAT 20250612 1450).xlsx'

# === Screening Parameters ===

# List of specific time points you want to evaluate.
required_time_points = [10, 20, 30, 40, 50]

# List of channels that exist in your dataset and should be extracted from each cell's data sheet.
# These channels should match the names used in your AutoCRAT output.
channel_set = ['Cy5', 'tdTom', 'EGFP']

# The specific fluorescence channel that will be used for cell classification.
# A cell will be marked "positive" if the intensity in this channel exceeds the threshold.
channel_of_interest = 'EGFP'

# Intensity threshold: if a cell's intensity in the channel of interest is greater than this value,
# it will be classified as positive for that time point.
min_intensity = 65
```

### Expected Output
All output files are saved in the same folder as the original Rep Summary file (rep_summary_folder). The script creates the following:<br>
**Per-Time Point Classification Files**<br>
For each time point in required_time_points, the script generates a separate Excel file which contains:<br>
    &nbsp;&nbsp;•  A Positive sheet and a Negative sheet. Only cells that include the specified time point are considered.<br>
    &nbsp;&nbsp;• Intensity values for each channel in channel_set (e.g., Cy5, tdTom, EGFP)<br>
    &nbsp;&nbsp;• Summary rows at the top of each sheet, specific to that time point<br>

- `C:\Project\AutoCRAT_Output\MyProject - Rep Summary (AutoCRAT 20250612 1450) - Screened (TP 10, Int 65).xlsx`
- `C:\Project\AutoCRAT_Output\MyProject - Rep Summary (AutoCRAT 20250612 1450) - Screened (TP 20, Int 65).xlsx`
- `C:\Project\AutoCRAT_Output\MyProject - Rep Summary (AutoCRAT 20250612 1450) - Screened (TP 30, Int 65).xlsx`
- `C:\Project\AutoCRAT_Output\MyProject - Rep Summary (AutoCRAT 20250612 1450) - Screened (TP 40, Int 65).xlsx`
- `C:\Project\AutoCRAT_Output\MyProject - Rep Summary (AutoCRAT 20250612 1450) - Screened (TP 50, Int 65).xlsx`

**Summary File with Plots**<br>
In addition, a single summary Excel file is generated to aggregate results across all specified time points:<br>
`C:\Project\AutoCRAT_Output\MyProject - Rep Summary (AutoCRAT 20250612 1450) - Screened Sum (TP [10,20,30,40,50], Int 65).xlsx`

This file includes a summary table:

|                | 10  | 20  | 30  | 40  | 50  |
|----------------|-----|-----|-----|-----|-----|
| **Total Cells**    | 743 | 826 | 858 | 872 | 872 |
| **Positive Cells** | 90  | 280 | 325 | 386 | 261 |
| **Percentage**     | 12.11 | 33.9 | 37.88 | 44.27 | 29.93 |

and two embedded bar plots:

<div align="center">
    <img src="../assets/plot_counts.png" alt="Total and Positive Cell Counts per time point" width="600">
    <p><em>Figure: Example of Total and Positive Cell Counts per time point</em></p>
</div>

<div align="center">
    <img src="../assets/plot_percentage.png" alt="Percentage of Positive Cells per time point" width="600">
    <p><em>Figure: Example of Percentage of Positive Cells per time point</em></p>
</div>

---

By following these steps, you can automate time-point-specific classification of cells using defined intensity thresholds, enabling identification of signal-positive cells across time — such as RPA foci–positive cells.
