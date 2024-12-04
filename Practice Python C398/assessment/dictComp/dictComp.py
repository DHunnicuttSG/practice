def filterDict(*args):
    filtered = {k: v for k, v in dict.items() if v < 9}
    return filtered