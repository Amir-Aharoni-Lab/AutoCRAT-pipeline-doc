# MergeAutoCRAT Script Documentation

<iframe src="../assets/MergeAutoCRAT_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **MergeAutoCRAT** script consolidates the results from multiple AutoCRAT runs by merging their respective **'Rep Summary'** and **'RNSA'** files. The script generates two unified output files: `Rep Summary.xlsx` and `RNSA.xlsx`.

---

## How to Use MergeAutoCRAT

### Step 1: Edit the Batch File

Locate the batch file:  
**`MergeAutoCRAT (Edit me then double-click to run!).bat`**  
Open it in a text editor and update the following parameters as needed:

#### 1. Specify Folders Containing AutoCRAT Runs
Provide the paths to the folders where the AutoCRAT results are stored. 
**Example:**
```
--folders "C:\Data\AutoCRAT_Run1" "C:\Data\AutoCRAT_Run2" "C:\Data\AutoCRAT_Run3"
```

#### 2. List 'Rep Summary' Files to Merge
List the filenames of the 'Rep Summary' files you want to merge.  
**Example:**
```
--rep_summary_filenames "Run1 - Rep Summary.xlsx" "Run2 - Rep Summary.xlsx" "Run3 - Rep Summary.xlsx"
```

#### 3. Destination Folder for Merged Results
Indicate the folder where the merged files should be saved.  
**Example:**
```
--merged_folder "C:\Data\Merged_Results"
```

#### 4. Set Output Filenames
Define the base name for the merged files. The script will automatically append appropriate suffixes (`- Rep Summary` and `- RNSA`).  
**Example:**
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




