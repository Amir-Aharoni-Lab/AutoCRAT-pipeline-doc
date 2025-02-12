# RNSAheatmap Script Documentation

<iframe src="../assets/RNSAheatmap_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **RNSAheatmap** script generates a clustered heatmap from an RNSA file, visualizing the signal intensities of individual cells across normalized time. This visualization enables the detection of clustering patterns in the data and provides a visual summary of cell behavior.

---

## Key Tasks

### &nbsp;&nbsp;- Read and Process Input Files
- Reads the **'RNSA'** file and extracts the relevant signal data from the **third sheet** of the file.
- Aggregates data to **reduce resolution** for better visualization and computation by grouping and averaging data points into intervals *(intervals are defined by rounding normalized time values to two decimal places, resulting in a more compact representation of the data)*.

### &nbsp;&nbsp;- Filter Data
- Restricts the data to a segment of the normalized time axis, as specified by `rnsa_x_axis`.
- Removes cells with excessive missing data by checking the **percentage of missing values** within the defined range (`max_nan_range`) and excluding cells that exceed the threshold (`max_nans`).

### &nbsp;&nbsp;- Cluster Data
- Uses **hierarchical clustering** to group cells with similar signal patterns.
- Reorganizes the data to reflect clustering results.

### &nbsp;&nbsp;- Generate and Save Clustered Heatmap
- Visualizes the clustered data as a **heatmap**.
- Saves the heatmap as a **PNG image**.

### &nbsp;&nbsp;- Save Clustered Data
- Creates an updated **Excel file** containing the clustered **RNSA** data for further examination.

---

## How to Use RNSAheatmap

### Step 1: Edit Parameters in the Script
Customize the following parameters to configure the script for your analysis.

#### &nbsp;&nbsp;• Specify the RNSA File Location
Set the folder and filename of the RNSA file:
```python
rnsa_folder = r'path_to_your_folder'
rnsa_filename = 'your_rnsa_file.xlsx'
```

#### &nbsp;&nbsp;• Set Heatmap Appearance
Specify the desired color for the heatmap:
```python
heatmap_color = 'lime'
```

#### &nbsp;&nbsp;• Configure X-Axis Range
Restrict the **normalized time axis** for clustering and visualization:
```python
rnsa_x_axis = [-2, 3]
```

#### &nbsp;&nbsp;• Missing Data Threshold
Set the range and threshold to remove cells with missing data:<br>
- **Define the range** for evaluating missing data using `max_nan_range`.<br>
- **Set the threshold** for the maximum allowed percentage of missing data using `max_nans`.
```python
max_nan_range = [0, 3]  # Range for evaluating missing data
max_nans = 30           # Maximum allowed percentage of missing data
```

---

### Step 2: Run the Script
After editing the parameters:

- Save the script.
- Run the script in your Python environment (e.g., Command Line, Jupyter Notebook, PyCharm).

---

### Step 3: Output Files
The script generates two output files, saved in the same folder as the original RNSA file:

&nbsp;&nbsp;• ```your_rnsa_file - Clustered.xlsx``` - Clustered RNSA file that contains clustered cell data for detailed analysis.<br>
&nbsp;&nbsp;• ```your_rnsa_file - Heatmap.png```- Clustered heatmap PNG file that visualizes the clustered data

---

## Example Configuration
Below is an example setup for running the script. The script will filter the data to include only values within the time range of **-1 to 3 normalized time units**. Cells with more than **30% missing data** in the range **0 to 3** will be excluded.

```python
""" Parameters """

# Location and filename of the relevant RNSA file.
rnsa_folder = r'C:\Project\RNSA_Results'
rnsa_filename = 'Merged_Project_Results - RNSA.xlsx'

# Desired color of heatmap.
heatmap_color = 'lime'

# Lower and upper bounds of the X axis to display.
# This is the 'normalized time' axis in RNSA charts.
# Note: this will also affect clustering results, since clustering
# is performed only on the desired segment of the data.
rnsa_x_axis = [-1, 3]

# Omit cells with a high proportion of missing data.
# Cells for which too much data is missing within these bounds
# will be omitted from the heatmap. This range must be smaller
# than or equal to the range defined in rnsa_x_axis.
max_nan_range = [0, 3]
# The maximum allowed percentage of missing data within the above bound.
max_nans = 30
```

### Expected Output
- `C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Clustered.xlsx`
- `C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Heatmap.png`

<div align="center">
    <h3>Clustered Heatmap</h3>
    <img src="../assets/RNSAheatmap.png" alt="Clustered Heatmap" width="600">
    <p><em>Figure: Example of a clustered heatmap for RNSA data</em></p>
</div>


---

By following these steps, you can efficiently cluster and visualize RNSA data, enabling the identification of meaningful patterns in cellular signals.
