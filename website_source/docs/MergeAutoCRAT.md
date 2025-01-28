# MergeAutoCRAT Script Documentation

<iframe src="../assets/MergeAutoCRAT_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **MergeAutoCRAT** script consolidates the results from multiple AutoCRAT runs by merging their respective **'Rep Summary'** and **'RNSA'** files. The script generates two unified output files: `Rep Summary.xlsx` and `RNSA.xlsx`.

---
## Key Tasks

### &nbsp;&nbsp;- Read Input Files
- Reads the **'Rep Summary'** and **'RNSA'** files from multiple AutoCRAT runs, as specified in the batch file.

### &nbsp;&nbsp;- Merge Files
- Merges the specified **'Rep Summary'** and, if available, **'RNSA'** files from multiple AutoCRAT runs into two unified output files.

### &nbsp;&nbsp;- Generate Updated Files
- Creates final output files with the merged results in the defined merged results folder.

---

## How to Use MergeAutoCRAT

### Step 1: Edit the Batch File

Locate the batch file:  
**`MergeAutoCRAT (Edit me then double-click to run!).bat`**  
Open it in a text editor and update the following parameters as needed:

#### &nbsp;&nbsp;• Specify Folders Containing AutoCRAT Runs
Provide the paths to the folders where the AutoCRAT results are stored. 
```
--folders "C:\Data\AutoCRAT_Run1" "C:\Data\AutoCRAT_Run2" "C:\Data\AutoCRAT_Run3"
```

#### &nbsp;&nbsp;• List 'Rep Summary' Files to Merge
List the filenames of the 'Rep Summary' files you want to merge.  
```
--rep_summary_filenames "Run1 - Rep Summary.xlsx" "Run2 - Rep Summary.xlsx" "Run3 - Rep Summary.xlsx"
```

#### &nbsp;&nbsp;• Destination Folder for Merged Results
Indicate the folder where the merged files should be saved.  
```
--merged_folder "C:\Data\Merged_Results"
```

#### &nbsp;&nbsp;• Set Output Filenames
Define the base name for the merged files. The script will automatically append appropriate suffixes (`- Rep Summary` and `- RNSA`).  
```
--merged_filename "Combined_Results"
```

---

### Step 2: Run the Script
After editing the file, save the changes and double-click it to execute. The merged results will be saved to the specified location.

---

## Example Configuration
Here’s a complete example of the batch file configuration:

```
venv\Scripts\python.exe MergeAutoCRAT.py ^
--folders "C:\Project\Run1" "C:\Project\Run2" "C:\Project\Run3" ^
--rep_summary_filenames "Run1_Rep_Summary.xlsx" "Run2_Rep_Summary.xlsx" "Run3_Rep_Summary.xlsx" ^
--merged_folder "C:\Project\Merged_Results" ^
--merged_filename "Merged_Project_Results"
```

### Output:
- `C:\Project\Merged_Results\Merged_Project_Results - Rep Summary.xlsx`
- `C:\Project\Merged_Results\Merged_Project_Results - RNSA.xlsx`

---


By following these steps, you can efficiently merge the results of multiple AutoCRAT runs into comprehensive summary files.




