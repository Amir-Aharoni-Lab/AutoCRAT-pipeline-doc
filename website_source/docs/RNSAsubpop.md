# RNSAsubpop Script Documentation

<iframe src="../assets/RNSAsubpop_diagram.html" width="800" height="400" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **RNSAsubpop** script processes an RNSA file to automatically classify positive cells into predefined subpopulations based on their signal intensity in specific time windows. It enables efficient **categorization, visualization, and clustering** of cellular data.

There are **two versions** of the script:

- **RNSAsubpop** – Divides cells into predefined subpopulations based on signal intensity and generates output files.  
- **RNSAsubpop_clustered** – Performs additional hierarchical clustering within each subpopulation after subpopulation selection, enhancing visualization and pattern detection.

---

## Key Tasks

### &nbsp;&nbsp;- Read and Process Input Files
- Reads the **RNSA** and **Replication Summary** files, both expected to be obtained after running **ScreenRNSA** script.
- Loads the **'Positive'** sheet from the Replication Summary and processes the **third sheet** from the RNSA file.

### &nbsp;&nbsp;- Subpopulation Selection
- Divides cells into **three predefined subpopulations** (**Early**, **Late**, **Other**) based on **intensity thresholds** during specific **time windows**.
- Filters out cells with **excessive missing data** (above the threshold `max_nans`).

### &nbsp;&nbsp;- Generate and Save Subpopulation Data
- Creates and **exports Rep Summary** for each subpopulation.
- Generates and **exports RNSA files** specific to each subpopulation.

### &nbsp;&nbsp;- Generate and Save Heatmap (Both Versions)

- **RNSAsubpop**:
	- Creates a **heatmap** visualizing subpopulation data.
	- Saves the heatmap as a **PNG** image.

- **RNSAsubpop_clustered:**
	- Performs **hierarchical clustering** within each subpopulation before heatmap generation.
	- Saves the clustered heatmap as **PNG** and **PDF** files.

### &nbsp;&nbsp;- Save Subpopulation Data for Heatmap
- Creates an updated **Excel file** containing the processed **RNSA** data for each subpopulation, structured for heatmap generation and further analysis.

---

## How to Use RNSAsubpop

### Step 1: Edit Parameters in the Script
Modify the following parameters before running the script.

#### &nbsp;&nbsp;• Specify the RNSA File Location
Set the folder and filename of the RNSA file. The script requires an **RNSA** file generated after running the **ScreenRNSA script**. The script will automatically detect and process the corresponding **Replication Summary** file.

```python
folder = r'path_to_your_folder'
rnsa_filename = 'your_rnsa_file.xlsx'
```

#### &nbsp;&nbsp;• Define Subpopulation Parameters  
By default, the script **automatically assigns cells** into three **predefined subpopulations** based on their signal intensities during specific time windows.

##### Default Subpopulations and Classification Conditions:

| **Subpopulation** | **Window 1 (-0.5 to 0)** | **Window 2 (0.6 to 1.6)** | **Window 3 (2.2 to 3)** | **Missing Data Threshold** |
|-------------------|-------------------------|---------------------------|-------------------------|-----------------------------|
| **Early (pop1)** | Mean intensity **< 0.35** | Mean intensity **> 0.3**  | Mean intensity **< 0.4** | Below **75%** in each window |
| **Late (pop2)**  | Mean intensity **< 0.35** | Mean intensity **< 0.4**  | Mean intensity **> 0.3** | Below **75%** in each window |
| **Other**        | N/A | N/A | N/A | Below **75%**, does not fit Early/Late |

> **Note:** Time windows, subpopulation names, and intensity thresholds are configurable.


```python
time_windows = ([-0.5, 0], [0.6, 1.6], [2.2, 3])  
pop1_thresholds = (0.35, 0.3, 0.4)  
pop2_thresholds = (0.35, 0.4, 0.3)  
pop_names = ['Early', 'Late', 'Other']
```

#### &nbsp;&nbsp;• Set Missing Data Threshold
Define the allowed percentage of missing data:

```python
max_nans = 75  # Exclude cells with more than 75% missing data in time windows
```

#### &nbsp;&nbsp;• Configure Heatmap Output
Define the subpopulations to appear in the heatmap:

```python
heatmap_pops = ['Early', 'Late', 'Other']
```
#### &nbsp;&nbsp;• Configure Summary Chart Parameters
Set the appearance of the RNSA summary chart:

```python
colors = ['red', 'orange', 'lime']  # Colors for the chart
rnsa_x_axis = [-1, 3]              # X-axis range
rnsa_y_axis = [0.1, 0.8]           # Y-axis range
```

---

### Step 2: Run the Script
After editing the parameters:

- Save the script.
- Run the script in your Python environment (e.g., Command Line, Jupyter Notebook, PyCharm).

---

### Step 3: Output Files
The script generates multiple output files, saved in the **same folder** as the original RNSA file. These files include **subpopulation-specific data** and **heatmap visualizations**.

##### **Replication Summary files for each subpopulation:**

&nbsp;&nbsp;• ```your_RepSummary_file - All.xlsx```<br>
&nbsp;&nbsp;• ```your_RepSummary_file - Early.xlsx```<br>
&nbsp;&nbsp;• ```your_RepSummary_file - Late.xlsx```<br>
&nbsp;&nbsp;• ```your_RepSummary_file - Other.xlsx```<br>


##### **RNSA files for each subpopulation:**

&nbsp;&nbsp;• ```your_rnsa_file - All.xlsx```<br>
&nbsp;&nbsp;• ```your_rnsa_file - Early.xlsx```<br>
&nbsp;&nbsp;• ```your_rnsa_file - Late.xlsx```<br>
&nbsp;&nbsp;• ```your_rnsa_file - Other.xlsx```


##### **Excel file containing all subpopulation data for heatmap generation:**

&nbsp;&nbsp;• ```your_rnsa_file - Subpopulations.xlsx```

##### **A heatmap visualization of subpopulations, saved as an image:**

&nbsp;&nbsp;• ```your_rnsa_file - Subpopulation Heatmap.png```

##### A clustered heatmap visualization of subpopulations as a PDF (for RNSAsubpop_clustered version of the script):

&nbsp;&nbsp;• ```your_rnsa_file - Subpopulation Heatmap.pdf```

---

## Example Configuration
Below is an example setup for running the script.

The script will:<br>
- **Assign cells** to subpopulations (**Early, Late, Other**) based on **intensity thresholds**.<br>
- **Exclude cells** with more than **75% missing data** in the specified time windows.<br>
- **Plot** a heatmap visualization of subpopulations

```python
""" Parameters """

# Location and filename of the relevant RNSA file.
folder = r'C:\Project\RNSA_Results'
rnsa_filename = 'Merged_Project_Results - RNSA.xlsx'

# Define time windows and thresholds for subpopulation selection
time_windows = ([-0.5, 0], [0.6, 1.6], [2.2, 3])
pop1_thresholds = (0.35, 0.3, 0.4)
pop2_thresholds = (0.35, 0.4, 0.3)

# The maximum allowed percentage of missing data in the examined time windows.
max_nans = 75

# Names of the subpopulations (must be 3 subpopulations).
pop_names = ['Early', 'Late', 'Other']

# Which of the above populations should appear in the final heatmap.
heatmap_pops = ['Early', 'Late', 'Other']

# Parameters for RNSA summary chart.
colors = ['red', 'orange', 'lime']
rnsa_x_axis = [-1, 3]
rnsa_y_axis = [0.1, 0.8]
```

### Expected Output

&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - Rep Summary - All.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - Rep Summary - Early.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - Rep Summary - Late.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - Rep Summary - Other.xlsx```

&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - All.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Early.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Late.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Other.xlsx```<br>

&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Subpopulations.xlsx```<br>
&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Subpopulation Heatmap.png```<br>

For the **clustering version**, an additional **PDF heatmap** is created:

&nbsp;&nbsp;• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Subpopulation Heatmap.pdf```

<div align="center">
    <h3>Hierarchically Clustered Heatmap of Detected Early, Late, and Other Subpopulations</h3>
    <img src="../assets/RNSAsubpop.png" alt="Clustered Heatmap" width="600">
    <p><em>Figure: Example of a heatmap with hierarchical clustering applied to Early, Late, and Other subpopulations in RNSA data</em></p>
</div>
---

By following these steps, the script automatically classifies cells into predefined subpopulations based on intensity thresholds applied within specific time windows and generates a heatmap for visual representation. 

This automated approach enables efficient analysis and visualization of RNSA data, facilitating the identification of meaningful trends in cellular behavior.

