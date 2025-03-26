# Pipeline Workflow

- [Overview](#overview)
- [Step 1: Importing Movies](#step-1-importing-movies)
- [Step 2: Fluorescent Dot Detection, Tracking & Cell Identification](#step-2-fluorescent-dot-detection-tracking-cell-identification)
- [Step 3: Replication Analysis](#step-3-replication-analysis)
- [Step 4: Replisome-Normalized Signal Averaging (RNSA)](#step-4-replisome-normalized-signal-averaging-rnsa)
- [Step 5: Double-Strand Break Detection](#step-5-double-strand-break-detection)
- [Step 6: Results Export](#step-6-results-export)


        - Overview: pipeline.md
        - Step 1: Importing Movies: pipeline.md#import-movies
        - Step 2: Fluorescent Dot Tracking: pipeline.md#dot-tracking
        - Step 3: Replication Analysis: pipeline.md#replication-analysis
        - Step 4: Double-Strand Break Detection: pipeline.md#dsb-analysis

## Overview

AutoCRAT is a Python-based pipeline for analyzing time-lapse microscopy images of chromosomal replication. It automatically identifies, tracks, and analyzes fluorescently labeled loci over time to quantify replication dynamics.

The AutoCRAT pipeline performs:

- Fluorescent dot identification & tracking (using TrackPy)
- Replication time analysis (sigmoid fitting of fluorescence intensity)
- Double-strand break detection (based on co-localization loss)
- Replisome-normalized signal averaging (RNSA) (quantifying signal dynamics relative to replication timing)

It integrates multiple submodules:

- AutoCRAT_IDCL.py – Identifies dots by co-localization
- AutoCRAT_Slicer.py – Extracts relevant data regions
- AutoCRAT_RNSA.py – Performs RNSA analysis
- AutoCRAT_DSB.py – Detects double-strand breaks
- AutoCRAT_RepTime.py – Fits sigmoidal curves to replication time data
- AutoCRAT_cfg.py – Handles configuration parameters

## Step 1: Importing Movies

- Loads microscopy movies using PIMS.
- Supports BioFormats and TIFF sequence modes.
- Reads metadata (e.g., pixel size, timepoints, channels).

## Step 2: Fluorescent Dot Detection, Tracking & Cell Identification

- Uses TrackPy for tracking.
- Dynamically thresholds fluorescence intensities.
- Removes spurious signals & clusters.
- Tracks dots across timepoints.
- Groups co-localized tracks into cells.
- Ensures required channels are present.

## Step 3: Replication Analysis

- Fits sigmoidal curves to intensity time series.
- Identifies replication time midpoints.
- Generates summary statistics.

## Step 4: Replisome-Normalized Signal Averaging (RNSA)

- Normalizes signals based on replication timing.
- Aligns intensities in replisome time units.

## Step 5: Double-Strand Break Detection

- Detects loss of co-localization between loci.
- Requires pre-defined dsb_channels in YAML.

## Step 6: Results Export

- Saves Excel files with tracked data.
- Generates summary reports & visualizations.