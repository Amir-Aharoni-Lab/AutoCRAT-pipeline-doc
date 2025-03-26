### Running via Batch Script
The AutoCRAT.bat script is provided for convenience:

```batch
:: Execute AutoCRAT with configured parameters
%PYTHON_EXEC% %SCRIPT_PATH% %MOVIE_PATH% %MOVIE_FILE% %CONFIG_PATH% -p %POS_RANGE%
```


Modify the AutoCRAT config - Template.yml file to specify analysis parameters.

### Running via Command Line
Alternatively, you can execute AutoCRAT.py manually:

```bash
python AutoCRAT.py "path_to_movie" "filename" "config.yml" --positions 1 2
```

### Running in a Python Script
```python
main(path, filename, config, positions, prev_summary, prev_RNSA)
```
path: Path to the microscopy data.
filename: The name of your microscopy movie file(s).
config: YAML configuration file.
positions: Positions to analyze (optional).
prev_summary: Previous summary file (not in use).
prev_rnsa: Previous RNSA file (not in use).
