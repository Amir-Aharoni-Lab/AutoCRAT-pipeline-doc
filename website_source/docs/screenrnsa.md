# ScreenRNSA Script Documentation

<iframe src="../assets/ScreenRNSA_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **ScreenRNSA** script screens cells that appear in the RNSA analysis using a rolling window intensity approach. It identifies cells with sufficiently bright signals by analyzing intensity time-series data and applying threshold-based filtering.

---

## Key Tasks

### &nbsp;&nbsp;- Read Input Files
- The script reads and processes the '**RNSA**', '**Rep Summary**', and '**Results**' files from an AutoCRAT run.

### &nbsp;&nbsp;- Apply Rolling Window Analysis
- Analyzes intensity time series for each cell by dividing the data into **rolling windows** of a predefined length (`window_length`).
- Calculates the average intensity for each window.

### &nbsp;&nbsp;- Filter Out Invalid Windows
- Discards windows where more than 30% of the data points are missing (`NaN`), as they are unreliable.
- Excludes cells with fewer than 25% valid windows, as there isn’t enough data for confident analysis.

### &nbsp;&nbsp;- Categorize Cells as Positive or Negative
- Checks if any valid rolling windows have an average intensity above the specified threshold (`min_intensity`).
- Marks cells as **positive** if they meet the threshold; otherwise, marks them as **negative**.

### &nbsp;&nbsp;- Generate Updated Files
- Creates new '**Rep Summary**' and '**RNSA**' files.
- The RNSA file includes cells that passed the intensity threshold.

---

## How to Use ScreenRNSA

### Step 1: Edit Parameters in the Script

#### &nbsp;&nbsp;• Specify the RNSA File Location
Set the folder and filename of the RNSA file. Ensure the corresponding **Rep Summary** file is located in the same folder:
```python
rnsa_folder = r'path_to_your_folder'
rnsa_filename = 'your_rnsa_file.xlsx'
```

#### &nbsp;&nbsp;• Define the AutoCRAT Results Folders
List all folders containing AutoCRAT "Results" files:
```python
folders = [
    r'path_to_results_folder1',
    r'path_to_results_folder2',
]
```

#### &nbsp;&nbsp;• Set Analysis Parameters
Update the parameters for cell screening:<br>
- `Channel of Interest`: Specify the intensity channel to analyze.<br>
- `Window Length`: Set the length (in timepoints) of the rolling window for intensity averaging.<br>
- `Minimum Intensity Threshold`: Define the threshold for the average intensity during the window.
```python
channel_of_interest = 'EGFP'
window_length = N
min_intensity = T
```

#### &nbsp;&nbsp;• Configure Summary Chart Parameters
Set the appearance of the RNSA summary chart:
```python
colors = ['red', 'orange', 'lime']  # Chart colors
rnsa_x_axis = [-2, 3]  # X-axis range
rnsa_y_axis = [0.1, 0.8]  # Y-axis range
```

---

### Step 2: Run the Script
After editing the parameters: <br>
&nbsp;&nbsp;• Save the script. <br>
&nbsp;&nbsp;• Run the script in your Python environment (e.g., command line, Jupyter Notebook, or PyCharm).

---

### Step 3: Output Files
The script generates two output files, saved in the same folder as the original RNSA file:

&nbsp;&nbsp;•    ```
   your_rnsa_file - Rep Summary - Screened (Window N, Int T).xlsx
   ``` : Summarizes positive and negative cells based on the analysis.  
   


&nbsp;&nbsp;•    ```
   your_rnsa_file - RNSA - Screened (Window N, Int T).xlsx
   ```: Contains RNSA data for cells that passed the intensity threshold.  


---

## Example Configuration
Below is a sample configuration for running the script:
```python
""" Parameters """

# Location and filename of the RNSA file to be screened.
# There must be an AutoCRAT "Rep Summary" file in the same folder,
# and with an identical name (except with "Rep Summary" instead of "RNSA").
rnsa_folder = r'C:\Project\Merged_Results'
rnsa_filename = 'Merged_Project_Results - RNSA.xlsx'

# Folders in which all the relevant AutoCRAT "Results" files are located.
folders = [
    r'C:\Project\Run1',
    r'C:\Project\Run2',
    r'C:\Project\Run3'
]

# Name of channel in which intensity should be examined.
channel_of_interest = 'EGFP'

# Length of time windows (in timepoints) during which the intensity will be averaged.
window_length = 12
# Minimum intensity (average during time window) which qualifies a cell for selection.
min_intensity = 65

# Parameters for RNSA summary chart.
colors = ['red', 'orange', 'lime']
rnsa_x_axis = [-2, 3]
rnsa_y_axis = [0.1, 0.8]
```
### Output:
- `C:\Project\Merged_Results\Merged_Project_Results - Rep Summary - Screened (Window 12, Int 65).xlsx`
- `C:\Project\Merged_Results\Merged_Project_Results - RNSA - Screened (Window 12, Int 65).xlsx`

---


By following these steps, you can efficiently identify and categorize cells based on intensity thresholds, ensuring accurate and reliable RNSA analysis.