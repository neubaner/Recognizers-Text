import { ITimeExtractorConfiguration, ITimeParserConfiguration } from "../baseTime"
import { RegExpUtility } from "@microsoft/recognizers-text";
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { ICommonDateTimeParserConfiguration } from "../parsers"
import { IDateTimeUtilityConfiguration } from "../utilities";

export class PortugueseTimeExtractorConfiguration implements ITimeExtractorConfiguration {
    public static timeRegexList: RegExp[] = [
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex1, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex2, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex3, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex4, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex5, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex6, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex7, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex8, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex9, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex10, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex11, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeRegex12, "gis"),
        RegExpUtility.getSafeRegExp(PortugueseDateTime.ConnectNumRegex, "gis")
    ];
    public static atRegex: RegExp = RegExpUtility.getSafeRegExp(PortugueseDateTime.AtRegex, "gis");
    public static lessThanOneHour: RegExp = RegExpUtility.getSafeRegExp(PortugueseDateTime.LessThanOneHour, "gis");
    public static timeSuffix: RegExp = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeSuffix, "gis");

    readonly timeRegexList: RegExp[];
    readonly atRegex: RegExp;
    readonly ishRegex: RegExp;

    constructor() {
        this.timeRegexList = PortugueseTimeExtractorConfiguration.timeRegexList;
        this.atRegex = PortugueseTimeExtractorConfiguration.atRegex;
        this.ishRegex = null;
    }
}

export class PortugueseTimeParserConfiguration implements ITimeParserConfiguration {
    readonly timeTokenPrefix: string;
    readonly atRegex: RegExp
    readonly timeRegexes: RegExp[];
    readonly numbers: ReadonlyMap<string, number>;
    readonly lessThanOneHour : RegExp;
    readonly timeSuffix: RegExp;
    readonly utilityConfiguration: IDateTimeUtilityConfiguration;

    constructor(config: ICommonDateTimeParserConfiguration) {
        this.timeTokenPrefix = PortugueseDateTime.TimeTokenPrefix;
        this.atRegex = PortugueseTimeExtractorConfiguration.atRegex;
        this.timeRegexes = PortugueseTimeExtractorConfiguration.timeRegexList;
        this.lessThanOneHour = PortugueseTimeExtractorConfiguration.lessThanOneHour;
        this.timeSuffix = PortugueseTimeExtractorConfiguration.timeSuffix;

        this.numbers = config.numbers;
        this.utilityConfiguration = config.utilityConfiguration;
    }

    public adjustByPrefix(prefix: string, adjust: { hour: number, min: number, hasMin: boolean }) {
        let deltaMin = 0;
        let trimedPrefix = prefix.trim().toLowerCase();

        if (trimedPrefix.startsWith("quarto") || trimedPrefix.startsWith("e um quarto") ||
            trimedPrefix.startsWith("quinze") || trimedPrefix.startsWith("e quinze")) {
            deltaMin = 15;
        }
        else if (trimedPrefix.startsWith("menos um quarto")) {
            deltaMin = -15;
        }
        else if (trimedPrefix.startsWith("meia") || trimedPrefix.startsWith("e meia")) {
            deltaMin = 30;
        }
        else
        {
            let matches = RegExpUtility.getMatches(this.lessThanOneHour, trimedPrefix);
            if(matches.length) {
                let match = matches[0];
                let minStr = match.groups("deltamin").value;
                if (minStr) {
                    deltaMin = parseInt(minStr);
                }
                else {
                    minStr = match.groups("deltaminnum").value.toLowerCase();
                    if(this.numbers.has(minStr)){
                        deltaMin = this.numbers.get(minStr);
                    }
                }
            }
        }

        if (trimedPrefix.endsWith("passadas") || trimedPrefix.endsWith("pasados") ||
            trimedPrefix.endsWith("depois das") || trimedPrefix.endsWith("depois da") || trimedPrefix.endsWith("depois do") ||
            trimedPrefix.endsWith("passadas as") || trimedPrefix.endsWith("passadas das")) {
        // deltaMin it's positive
        }
        else if (trimedPrefix.endsWith("para a") || trimedPrefix.endsWith("para as") ||
                 trimedPrefix.endsWith("pra") || trimedPrefix.endsWith("pras") ||
                 trimedPrefix.endsWith("antes da") || trimedPrefix.endsWith("antes das")) {
            deltaMin = -deltaMin;
        }

        adjust.min += deltaMin;
        if (adjust.min < 0) {
            adjust.min += 60;
            adjust.hour -= 1;
        }

        adjust.hasMin = adjust.hasMin || adjust.min != 0;
    }

    public adjustBySuffix(suffix: string, adjust: { hour: number, min: number, hasMin: boolean, hasAm: boolean, hasPm: boolean }) {
        let trimedSuffix = suffix.trim().toLowerCase();
        this.adjustByPrefix(trimedSuffix, adjust);

        let deltaHour = 0;
        let matches = RegExpUtility.getMatches(this.timeSuffix, trimedSuffix);
        if (matches.length) {
            let match = matches[0];
            if (match.index === 0 && match.length === trimedSuffix.length) {
                let oclockStr = match.groups("oclock").value;
                if (!oclockStr) {
                    let amStr = match.groups("am").value;
                    if (amStr) {
                        if (adjust.hour >= 12) {
                            deltaHour = -12;
                        }

                        adjust.hasAm = true;
                    }

                    let pmStr = match.groups("pm").value;
                    if (pmStr) {
                        if (adjust.hour < 12) {
                            deltaHour = 12;
                        }

                        adjust.hasPm = true;
                    }
                }
            }
        }

        adjust.hour = (adjust.hour + deltaHour) % 24;
    }
}
