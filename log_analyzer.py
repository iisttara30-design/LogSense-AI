def analyze_log(text):
    info_count = text.count("INFO")
    warning_count = text.count("WARNING")
    error_count = text.count("ERROR")

    return {
        "total": info_count + warning_count + error_count,
        "info": info_count,
        "warning": warning_count,
        "error": error_count
    }