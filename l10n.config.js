module.exports = {
    "middlewares": {
        "summary": [
            "summary?sourcePattern=i18n-messages/**/*.json"
        ],
        "process": [
            "fetchLocal?source=locales,skip",
            "metaToResult?from=defaultMessage,to=zh",
            "google?from=en,to=zh-cn",
            "reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta"
        ],
        "emit": [
            "save?dest=locales"
        ]
    }
}
