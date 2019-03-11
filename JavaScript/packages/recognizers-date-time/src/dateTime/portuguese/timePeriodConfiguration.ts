import { ITimePeriodExtractorConfiguration, ITimePeriodParserConfiguration } from "../baseTimePeriod"
import { BaseTimeExtractor, BaseTimeParser } from "../baseTime";
import { RegExpUtility, IExtractor } from "@microsoft/recognizers-text";
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { ICommonDateTimeParserConfiguration } from "../parsers"
import { IDateTimeUtilityConfiguration, TimexUtil } from "../utilities";
import { PortugueseTimeExtractorConfiguration } from "./timeConfiguration"
import { IDateTimeExtractor } from "../baseDateTime"
import { PortugueseIntegerExtractor } from "@microsoft/recognizers-text-number";
import { Constants } from "../constants";

export class PortugueseTimePeriodExtractorConfiguration implements ITimePeriodExtractorConfiguration {
    readonly simpleCasesRegex: RegExp[];
    readonly tillRegex: RegExp;
    readonly timeOfDayRegex: RegExp;
    readonly generalEndingRegex: RegExp;
    readonly singleTimeExtractor: IDateTimeExtractor;
    readonly integerExtractor: IExtractor;
    readonly fromRegex: RegExp;
    readonly betweenRegex: RegExp;
    readonly connectorAndRegex: RegExp;

    constructor() {
        this.simpleCasesRegex = [
            RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumFromTo, "gis"),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumBetweenAnd, "gis")
        ];
        this.tillRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TillRegex, "gis");
        this.timeOfDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeOfDayRegex, "gis");
        this.generalEndingRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.GeneralEndingRegex, "gis");
        this.fromRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.FromRegex, "gis");
        this.betweenRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.BetweenRegex, "gis");
        this.connectorAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ConnectorAndRegex);

        this.singleTimeExtractor = new BaseTimeExtractor(new PortugueseTimeExtractorConfiguration());
        this.integerExtractor = new PortugueseIntegerExtractor();
    }

    public getFromTokenIndex(source: string): { matched: boolean, index: number } {
        let index = -1;
        let fromMatches = RegExpUtility.getMatches(this.fromRegex, source);
        if (fromMatches.length) {
            index = fromMatches[0].index;
            return { matched: true, index: index };
        }
        return { matched: false, index: index };
    }

    public getBetweenTokenIndex(source: string): { matched: boolean, index: number } {
        let index = -1;
        let betweenMatches = RegExpUtility.getMatches(this.betweenRegex, source);
        if (betweenMatches.length) {
            index = betweenMatches[0].index;
            return { matched: true, index: index };
        }
        return { matched: false, index: index };
    }

    public hasConnectorToken(source: string): boolean {
        return RegExpUtility.isMatch(this.connectorAndRegex, source);
    }
}

export class PortugueseTimePeriodParserConfiguration implements ITimePeriodParserConfiguration {
    timeExtractor: IDateTimeExtractor;
    timeParser: BaseTimeParser;
    integerExtractor: IDateTimeExtractor;
    pureNumberFromToRegex: RegExp;
    pureNumberBetweenAndRegex: RegExp;
    timeOfDayRegex: RegExp;
    tillRegex: RegExp;
    numbers: ReadonlyMap<string, number>;
    utilityConfiguration: IDateTimeUtilityConfiguration;
    specificTimeFromToRegex: RegExp;
    specificTimeBetweenAndRegex: RegExp;

    constructor(config: ICommonDateTimeParserConfiguration) {
        this.timeExtractor = config.timeExtractor;
        this.timeParser = config.timeParser;
        this.integerExtractor = config.integerExtractor;
        this.pureNumberFromToRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumFromTo);
        this.pureNumberBetweenAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumBetweenAnd);
        this.timeOfDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeOfDayRegex);
        this.tillRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TillRegex, "gis");
        this.numbers = config.numbers;
        this.utilityConfiguration = config.utilityConfiguration;
        this.specificTimeFromToRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificTimeFromTo);
        this.specificTimeBetweenAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificTimeBetweenAnd);
    }

    getMatchedTimexRange(text: string): {
        matched: boolean, timex: string, beginHour: number, endHour: number, endMin: number
    } {
        let trimmedText = text.trim().toLowerCase();
        
        let matched = false,
        timex = null,
        beginHour = 0,
        endHour = 0,
        endMin = 0;

        let timeOfDay = "";
        if (PortugueseDateTime.EarlyMorningTermList.some(o => trimmedText.endsWith(o))){
            timeOfDay = Constants.EarlyMorning;
        } if (PortugueseDateTime.MorningTermList.some(o => trimmedText.endsWith(o))) {
            timeOfDay = Constants.Morning;
        } else if (PortugueseDateTime.AfternoonTermList.some(o => trimmedText.endsWith(o))) {
            timeOfDay = Constants.Afternoon;
        } else if (PortugueseDateTime.EveningTermList.some(o => trimmedText.endsWith(o))) {
            timeOfDay = Constants.Evening;
        } else if (PortugueseDateTime.NightTermList.some(o => trimmedText.endsWith(o))) {
            timeOfDay = Constants.Night;
        } else {
            timex = null;
            matched = false;
            return {matched, timex, beginHour, endHour, endMin};
        }

        let parseResult = TimexUtil.parseTimeOfDay(timeOfDay);
        timex = parseResult.timeX;
        beginHour = parseResult.beginHour;
        endHour = parseResult.endHour;
        endMin = parseResult.endMin;

        matched = true;
        return {matched, timex, beginHour, endHour, endMin};
    }
}
