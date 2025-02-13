# SwarmPlot Script Documentation  

<iframe src="../assets/SwarmPlot_diagram.html" width="800" height="300" style="border:none; margin:0; padding:0; display:block;"></iframe>  

The **SwarmPlot** script generates a combination of swarm and box plots from tabular data copied to the clipboard. The script is designed to **visualize sample distributions, detect outliers, and summarize statistical properties** of the dataset.  

---

## Key Tasks  

### &nbsp;&nbsp;- Read and Process Data  
- Reads tabular data copied to the clipboard.  
- Assumes **each column represents a sample**, and the **first row contains sample names**.  

### &nbsp;&nbsp;- Configure Plot Appearance  
- Defines customized plot styles, including:  
  - Axis line widths  
  - Tick sizes and font settings  
  - Padding adjustments for better spacing  

### &nbsp;&nbsp;- Generate Swarm and Box Plots  
- **Swarm Plot**: Displays **individual data points** with slight jittering to prevent overlap.  
- **Box Plot**: Adds a statistical summary, including:  
  	- **Median line** for central tendency.  
  	- **Interquartile range (IQR) box** for variability.   
  	- **No outliers drawn separately** to avoid redundancy with the swarm plot.  

### &nbsp;&nbsp;- Adjust Labels and Axis Properties  
- Sets the **y-axis label** to `"Replication time"` with a large font.  
- Removes **top and right spines** for a minimalist look.  
- Allows **optional y-axis limit adjustment** (commented out).  

### &nbsp;&nbsp;- Save the Figure  
- Saves the plot as a **PNG file**.  
- Automatically saves to the user's **Desktop** as `"Swarm Plot.png"`.  

---

## How to Use the Script  

### Step 1: Copy Data to Clipboard 
- Ensure data is structured as **columns of numerical values**, with the **first row as sample names**.  
- Copy the dataset from **Excel, Google Sheets, or any text file**.  

### Step 2: Run the Script 
- Execute the script in your Python environment.  

### Step 3: Output Plot  
- The script **displays the combined swarm-box plot**.  
- The figure is **automatically saved** to the **Desktop** as `"Swarm Plot.png"`  

---

## Example Usage  

### Sample Input Data  

<div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">
<pre>
Cy5    tdTom
22.424    43.074
31.705    51.34
16.864    37.234
38.422    54.214
35.913    43.981
22.477    45.285
34.248    41.747
22.752    43.542
35.422    52.266
28.936    40.951
23.495    57.499
30.934    58.835
25.6    48.876
27.739    57.295
21.873    43.249
34.812    44.483
25.729    51.646
26.921    66.686
23.276    29.741
24.753    32.174
16.253    28.497
23.724    36.826
26.043    45.406
19.31    41.457
50.942    73.216
19.72    43.956
39.316    66.106
26.195    68.882
20.717    46.607
43.935    53.436
21.532    46.271
53.375    66.179
24.649    39.159
24.521    57.035
23.195    51.588
29.259    44.077
21.565    50.209
24.632    43.859
31.179    59.249
34.567    39.825
18.389    26.087
30.958    44.6
68.116    87.943
44.72    81.115
60.092    86.054
19.307    47.416
27.369    74.542
22.045    43.637
18.199    43.513
23.163    41.49
26.152    70.354
36.419    54.384
23.559    57.931
34.838    47.811
33.819    53.711
60.238    71.627
33.569    49.298
68.964    94.517
19.886    45.973
38.446    73.402
20.838    43.977
20.091    45.961
25.587    47.235
23.475    30.115
35.031    52.496
22.477    51.4
19.003    32.138
22.002    39.524
18.947    30.481
28.73    37.349
77.638    89.723
12.885    36.745
35.886    41.509
18.469    66.554
16.371    42.349
12.926    35.844
12.322    48.048
20.557    54.819
20.382    43.539
19.687    35.85
20.291    72.417
16.32    61.128
32.843    58.693
19.387    36.642
12.972    41.407
24.284    55.872
27.32    38.833
22.647    42.02
24.543    48.643
24.91    53.147
18.44    35.669
22.972    42.151
19.749    55.872
19.99    44.533
28.729    54.555
29.328    46.208
19.953    61.493
48.996    83.032
24.175    41.118
25.844    55.397
47.223    84.512
28.67    73.195
19.42    30.943
40.064    50.868
12.252    30.865
23.55    39.831
19.017    53.319
25.065    39.634
29.949    48.965
38.25    60.314
28.012    77.632
16.516    33.624
21.646    73.516
43.627    49.87
20.646    35.068
30.881    57.643
28.003    56.171
</pre>
</div>


---

### Expected Output
- `C:\Desktop\Swarm Plot.png`
  
<div align="center">  
    <h3>Swarm-Box Plot</h3>  
    <img src="../assets/Swarm Plot.png" alt="Swarm-Box Plot" width="600">  
    <p><em>Figure: Example of a swarm-box plot showing Cy5 and tdTom signal distributions</em></p>  
</div>  

---

By following these steps, you can efficiently visualize sample distributions and statistical summaries using swarm and box plots. This script provides an effective way to analyze variability, outliers, and compare distributions between samples.
