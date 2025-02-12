# RNSAsigmoid Script Documentation
<iframe src="../assets/RNSAsigmoid_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>
The **RNSAsigmoid** script fits a sigmoidal function to the averaged replisome-normalized signal in an RNSA file over a specified time window. This allows for identifying key trends in cellular signal behavior and extracting meaningful parameters from the fitted curve.

---

## Key Tasks

### &nbsp;&nbsp;- Read and Process Input Files
- Loads an **RNSA** Excel file and extracts data from the **RNSA Summary** sheet.
- Identifies the available **channels** from the sheet names.
- Selects the values for the **specified time window**.

### &nbsp;&nbsp;- Fit a Sigmoidal Function
- Uses a **logistic function** to model the signal trend.

$$
f(x) = \text{base} + \frac{\text{height}}{1 + e^{-\text{steepness} \cdot (x - \text{midpoint})}}
$$


- Fits the function using **SciPy's curve fitting algorithm** to determine the best-fit parameters:
  	- **Base level**: The lower asymptote.
  	- **Height**: Difference between upper and lower asymptotes.
  	- **Steepness**: Controls the curve's slope.
  	- **Midpoint**: The normalized time at which the signal reaches half of its maximum height.

### &nbsp;&nbsp;- Generate and Save Updated RNSA File
- Creates a **new Excel file** that contains only the **'RNSA_Summary'** sheet.
- Saves the fitted **sigmoid values** along with the original data.
- Adds a **sigmoid trendline** to the summary chart.
- Annotates the **midpoint** in the exported file.

---

## How to Use RNSAsigmoid

### Step 1: Edit Parameters in the Script
Modify the following parameters in the script to customize your analysis.

#### &nbsp;&nbsp;• Specify the RNSA File Location
Set the folder path and filename of the **RNSA file**:
```python
rnsa_folder = r'path_to_your_folder'
rnsa_filename = 'your_rnsa_file.xlsx'
```

#### &nbsp;&nbsp;• Define the Sigmoidal Fit Window
Specify the time range where the fit should be applied:
```python
fit_window_start = -1
fit_window_end = 1.8
```

#### &nbsp;&nbsp;• Choose the Signal Channel
Specify the channel for which to perform the fitting:
```python
channel_of_interest = 'EGFP'
```

#### &nbsp;&nbsp;• Configure Chart Axes
Set the appearance of the **RNSA summary chart**:
```python
colors = ['red', 'orange', 'lime']  # Chart colors
rnsa_x_axis = [-1, 3]  # X-axis range
rnsa_y_axis = [0.1, 0.8]  # Y-axis range
```

---

### Step 2: Run the Script
After setting the parameters:<br>
• Save the script.<br>
• Run it in your Python environment (e.g., Command Line, Jupyter Notebook, PyCharm).

---

### Step 3: Output Files
The script generates an **updated RNSA file**, stored in the same folder as the original:

```
your_rnsa_file - Sigmoid.xlsx
```

---

## Example Configuration

Below is a sample configuration that sets up the script to fit a **sigmoidal function** within the time window of **-1 to 1.8** normalized time units. The fitting will be applied to the **EGFP** signal channel, and the results will be visualized within the x-axis range of **-1 to 3** and y-axis range of **0.1 to 0.8**.

```python
""" Parameters """

# Location and filename of the relevant RNSA file.
rnsa_folder = r'C:\Project\RNSA_Results'
rnsa_filename = 'Merged_Project_Results - RNSA.xlsx'

# Start and end point for the sigmoidal fit.
fit_window_start = -1
fit_window_end = 1.8

# Name of channel for which to perform fitting.
channel_of_interest = 'EGFP'

# Parameters for RNSA summary chart.
colors = ['red', 'orange', 'lime']
rnsa_x_axis = [-1, 3]
rnsa_y_axis = [0.1, 0.8]

```

---

## Expected Output

After running the script, the **sigmoid-fitted RNSA file** (containing only the **'RNSA_Summary'** sheet) will be saved at:

• ```C:\Project\RNSA_Results\Merged_Project_Results - RNSA - Sigmoid.xlsx```

---

By following these steps, you can efficiently **analyze and visualize RNSA signal trends** using **sigmoidal fitting**. 