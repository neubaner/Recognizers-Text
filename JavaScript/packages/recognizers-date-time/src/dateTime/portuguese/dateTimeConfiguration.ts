import { IDateTimeExtractor, IDateTimeExtractorConfiguration, IDateTimeParserConfiguration } from "../baseDateTime"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { BaseTimeExtractor, BaseTimeParser } from "../baseTime";
import { RegExpUtility, StringUtility } from "@microsoft/recognizers-text";
import { BaseNumberExtractor, BaseNumberParser } from "@microsoft/recognizers-text-number"
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { ICommonDateTimeParserConfiguration, IDateTimeParser } from "../parsers"
import { PortugueseDateTimeUtilityConfiguration } from "./baseConfiguration"
import { IDateTimeUtilityConfiguration } from "../utilities";
import { PortugueseDurationExtractorConfiguration } from "./durationConfiguration"
import { PortugueseDateExtractorConfiguration } from "./dateConfiguration"
import { PortugueseTimeExtractorConfiguration } from "./timeConfiguration"

export class PortugueseDateTimeExtractorConfiguration implements IDateTimeExtractorConfiguration {
    readonly datePointExtractor: IDateTimeExtractor
    readonly timePointExtractor: IDateTimeExtractor
    readonly durationExtractor: IDateTimeExtractor
    readonly suffixRegex: RegExp
    readonly nowRegex: RegExp
    readonly timeOfTodayAfterRegex: RegExp
    readonly simpleTimeOfTodayAfterRegex: RegExp
    readonly nightRegex: RegExp
    readonly timeOfTodayBeforeRegex: RegExp
    readonly simpleTimeOfTodayBeforeRegex: RegExp
    readonly specificEndOfRegex: RegExp
    readonly unspecificEndOfRegex: RegExp
    readonly unitRegex: RegExp
    readonly prepositionRegex: RegExp
    readonly connectorRegex: RegExp
    readonly utilityConfiguration: IDateTimeUtilityConfiguration

    constructor() {
        this.datePointExtractor = new BaseDateExtractor(new PortugueseDateExtractorConfiguration());
        this.timePointExtractor = new BaseTimeExtractor(new PortugueseTimeExtractorConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
        this.suffixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SuffixRegex);
        this.nowRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NowRegex);
        this.timeOfTodayAfterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeOfTodayAfterRegex);
        this.simpleTimeOfTodayAfterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleTimeOfTodayAfterRegex);
        this.nightRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeOfDayRegex);
        this.timeOfTodayBeforeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeOfTodayBeforeRegex);
        this.simpleTimeOfTodayBeforeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleTimeOfTodayBeforeRegex);
        this.specificEndOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificEndOfRegex);
        this.unspecificEndOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.UnspecificEndOfRegex);
        this.unitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeUnitRegex);
        this.prepositionRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PrepositionRegex);
        this.connectorRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ConnectorRegex);
        this.utilityConfiguration = new PortugueseDateTimeUtilityConfiguration();
    }
            
    isConnectorToken(source: string): boolean {
        return (StringUtility.isNullOrWhitespace(source)
                    || RegExpUtility.getMatches(this.connectorRegex, source).length > 0
                    || RegExpUtility.getMatches(this.prepositionRegex, source).length > 0);
            }
}
  

export class PortugueseDateTimeParserConfiguration implements IDateTimeParserConfiguration {
    tokenBeforeDate: string;
    tokenBeforeTime: string;
    dateExtractor: IDateTimeExtractor;
    timeExtractor: IDateTimeExtractor;
    dateParser: BaseDateParser;
    timeParser: BaseTimeParser;
    cardinalExtractor: BaseNumberExtractor;
    numberParser: BaseNumberParser;
    durationExtractor: IDateTimeExtractor;
    durationParser: IDateTimeParser;
    nowRegex: RegExp;
    amTimeRegex: RegExp;
    pmTimeRegex: RegExp;
    simpleTimeOfTodayAfterRegex: RegExp;
    simpleTimeOfTodayBeforeRegex: RegExp;
    specificTimeOfDayRegex: RegExp;
    specificEndOfRegex: RegExp;
    unspecificEndOfRegex: RegExp;
    unitRegex: RegExp;
    previousPrefixRegex: RegExp;
    nextPrefixRegex: RegExp;

    unitMap: ReadonlyMap<string, string>;
    numbers: ReadonlyMap<string, number>;
    utilityConfiguration: IDateTimeUtilityConfiguration;

    constructor(config: ICommonDateTimeParserConfiguration) {
        this.tokenBeforeDate = PortugueseDateTime.TokenBeforeDate;
        this.tokenBeforeTime = PortugueseDateTime.TokenBeforeTime;
        this.dateExtractor = config.dateExtractor;
        this.timeExtractor = config.timeExtractor;
        this.dateParser = config.dateParser;
        this.timeParser = config.timeParser;
        this.nowRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NowRegex);
        this.amTimeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AmTimeRegex);
        this.pmTimeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PmTimeRegex);
        this.simpleTimeOfTodayAfterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleTimeOfTodayAfterRegex);
        this.simpleTimeOfTodayBeforeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleTimeOfTodayBeforeRegex);
        this.specificTimeOfDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificTimeOfDayRegex);
        this.specificEndOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificEndOfRegex);
        this.unspecificEndOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.UnspecificEndOfRegex);
        this.unitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeUnitRegex);
        this.previousPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);
        this.nextPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);

        this.numbers = config.numbers;
        this.cardinalExtractor = config.cardinalExtractor;
        this.numberParser = config.numberParser;
        this.durationExtractor = config.durationExtractor;
        this.durationParser = config.durationParser;
        this.unitMap = config.unitMap;
        this.utilityConfiguration = config.utilityConfiguration;
    }

    public getHour(text: string, hour: number): number {
        let trimmedText = PortugueseDateTimeParserConfiguration.normalize(text.trim().toLowerCase());
        let result = hour;
        if ((trimmedText.endsWith("manha") || trimmedText.endsWith("madrugada")) && hour >= 12) {
            result -= 12;
        }
        else if (!(trimmedText.endsWith("manha") || trimmedText.endsWith("madrugada")) && hour < 12) {
            result += 12;
        }
        return result;
    }

    public getMatchedNowTimex(text: string): { matched: boolean, timex: string } {
        let trimmedText = PortugueseDateTimeParserConfiguration.normalize(text.trim().toLowerCase());
        let timex: string;
        if (trimmedText.endsWith("agora") || trimmedText.endsWith("mesmo") || trimmedText.endsWith("momento")) {
            timex = "PRESENT_REF";
        }
        else if (trimmedText.endsWith("mente")) {
            timex = "PAST_REF";
        }
        else if (trimmedText.endsWith("possivel") || trimmedText.endsWith("possa") ||
                 trimmedText.endsWith("possas") || trimmedText.endsWith("possamos") || trimmedText.endsWith("possam")) {
            timex = "FUTURE_REF";
        }
        else {
            timex = null;
            return { matched: false, timex: timex };
        }
        return { matched: true, timex: timex };
    }

    public getSwiftDay(text: string): number {
        let trimmedText = text.trim().toLowerCase();
        let swift = 0;
        if (RegExpUtility.getFirstMatchIndex(this.nextPrefixRegex, trimmedText).matched) {
            swift = 1;
        }
        else if (RegExpUtility.getFirstMatchIndex(this.previousPrefixRegex, trimmedText).matched) {
            swift = -1;
        }
        return swift;
    }

    public haveAmbiguousToken(text: string, matchedText: string): boolean { return false; }

    private static normalize(source: string): string {
        return source
            .replace(/á/g, "a")
            .replace(/é/g, "e")
            .replace(/í/g, "i")
            .replace(/ó/g, "o")
            .replace(/ú/g, "u")
            .replace(/ê/g, "e")
            .replace(/ô/g, "o")
            .replace(/ü/g, "u")
            .replace(/ã/g, "a")
            .replace(/õ/g, "o")
            .replace(/ç/g, "c");
    }
}
