# CherryPicker Script Documentation

<iframe src="../assets/CherryPicker_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **CherryPicker** script creates filtered versions of 'Rep Summary' and 'RNSA' files by selecting a specific subset of cells. This script is useful for selecting a targeted group of cells for further analysis or visualization.

---

## Key Tasks

### &nbsp;&nbsp;- Read Input Files
- Reads the AutoCRAT '**Rep Summary**' file.
- Optionally processes the '**RNSA**' file if present in the same folder.
- Loads a cell selection file to determine which cells to keep in the output.

### &nbsp;&nbsp;- Filter Cells Based on Selection
- Matches cells in the 'Rep Summary' and 'RNSA' files to the user-provided cell selection list.
- Filters out unselected cells from the data.

### &nbsp;&nbsp;- Generate Updated Files
- Creates filtered versions of '**Rep Summary**' and optional '**RNSA**' files that include only the selected cells.

---

## How to Use CherryPicker

### Step 0: Create an Excel File for Cell Selection

Create an Excel file (`.xlsx`) with two columns:<br>
   &nbsp;&nbsp;- **Position**: Position name for each cell.<br>
   &nbsp;&nbsp;- **Cell**: Unique cell identifier (e.g., `Cell_2`, `Cell_4`).
```markdown

   | Position                                         | Cell    |
   |--------------------------------------------------|---------|
   | 20241126-1428wo-1428E ex2 FAPPG-01 - Position 1  | Cell_2  |
   | 20241126-1428wo-1428E ex2 FAPPG-01 - Position 1  | Cell_4  |
   | 20241128-1428wo-1428E FAPPG-01 - Position 2      | Cell_19 |

```

Save the file in the same folder as the **Rep Summary** file. This file will serve as the key input for selecting cells.

---

### Step 1: Edit Parameters in the Script

#### &nbsp;&nbsp;• Specify the Folder and File Names
Define the folder and filename of the **Rep Summary** file. If an **RNSA** file exists in the same folder, it will also be processed. Provide the filename of the Excel file listing the cells for selection.

```python
folder = r'path_to_your_folder'  # Folder containing all input files
rep_summary_filename = 'your_rep_summary_file.xlsx'  # Rep Summary file name
selected_cells_filename = 'your_selected_cells_file.xlsx'  # File with selected cells
```

#### &nbsp;&nbsp;• Configure Summary Chart Parameters
Set the appearance of the RNSA summary chart:

```python
colors = ['red', 'orange', 'lime']  # Colors for the chart
rnsa_x_axis = [-2, 3]              # X-axis range
rnsa_y_axis = [0.1, 0.8]           # Y-axis range
```

---

### Step 2: Run the Script

After editing the parameters:<br>
1. Save the script.<br>
2. Run the script in your Python environment (e.g., command line, Jupyter Notebook, or PyCharm).

---

### Step 3: Output Files

The script generates the following output files in the same folder as the input files:<br>
- Filtered Rep Summary File:  
  `your_rep_summary_file - Screened by your_selected_cells_file.xlsx`<br>
- Filtered RNSA File (if provided):  
  `your_rep_summary_file - RNSA - Screened by your_selected_cells_file.xlsx`

---

## Example Configuration

Below is an example setup to filter cells specified in a file called `Selected_Cells.xlsx` from a Rep Summary file named `Experiment_Results.xlsx`.

```python
""" Parameters """


# Folder in which all the relevant files are located.
folder = r'C:\Experiment\Results'

# Name of the AutoCRAT "Rep Summary" file to be cherry-picked.
# If a RNSA file is located in the same folder with an identical name
# (except with "RNSA" instead of "Rep Summary"), it will also undergo cherry-picking.
rep_summary_filename = 'Experiment_Results - Rep Summary.xlsx'

# Name of an Excel file with the list of cells to select. This file should be
# formatted with position names in the first column and cell numbers in the second
# (as the "Clustered" file created by the RNSAheatmap script).
selected_cells_filename = 'Selected_Cells.xlsx'

# Parameters for RNSA summary chart.
colors = ['red', 'orange', 'lime']
rnsa_x_axis = [-2, 3]
rnsa_y_axis = [0.1, 0.8]
```

### Expected Output
- Filtered Rep Summary File:  
  `C:\Experiment\Results\Experiment_Results - Rep Summary - Screened by Selected_Cells.xlsx`

- Filtered RNSA File (if provided):  
  `C:\Experiment\Results\Experiment_Results - RNSA - Screened by Selected_Cells.xlsx`

---

By following these steps, you can efficiently filter AutoCRAT-generated data files to focus on specific cells of interest.