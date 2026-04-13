def map_features_to_signals(features):
    return {
        "visual": features["brightness"],
        "attention": features["contrast"],
        "load": features["complexity"],
    }