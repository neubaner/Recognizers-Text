import { IExtractor } from "@microsoft/recognizers-text";
import { IDateTimePeriodExtractorConfiguration, IDateTimePeriodParserConfiguration } from "../baseDateTimePeriod"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { BaseTimeExtractor, BaseTimeParser } from "../baseTime";
import { IDateTimeExtractor, BaseDateTimeExtractor, BaseDateTimeParser } from "../baseDateTime";
import { BaseTimePeriodExtractor } from "../baseTimePeriod";
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { RegExpUtility } from "@microsoft/recognizers-text";
import { PortugueseCardinalExtractor } from "@microsoft/recognizers-text-number";
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { PortugueseCommonDateTimeParserConfiguration } from "./baseConfiguration"
import { PortugueseDurationExtractorConfiguration } from "./durationConfiguration"
import { PortugueseTimeExtractorConfiguration } from "./timeConfiguration"
import { PortugueseDateTimeExtractorConfiguration } from "./dateTimeConfiguration"
import { PortugueseDateExtractorConfiguration } from "./dateConfiguration"
import { PortugueseTimePeriodExtractorConfiguration } from "../portuguese/timePeriodConfiguration";
import { IDateTimeParser } from "../parsers"
import { PortugueseDatePeriodParserConfiguration } from "./datePeriodConfiguration";

export class PortugueseDateTimePeriodExtractorConfiguration implements IDateTimePeriodExtractorConfiguration {
    readonly cardinalExtractor: PortugueseCardinalExtractor
    readonly singleDateExtractor: IDateTimeExtractor
    readonly singleTimeExtractor: IDateTimeExtractor
    readonly singleDateTimeExtractor: IDateTimeExtractor
    readonly durationExtractor: IDateTimeExtractor
    readonly timePeriodExtractor: IDateTimeExtractor
    readonly simpleCasesRegexes: RegExp[]
    readonly prepositionRegex: RegExp
    readonly tillRegex: RegExp
    readonly specificTimeOfDayRegex: RegExp
    readonly timeOfDayRegex: RegExp
    readonly periodTimeOfDayWithDateRegex: RegExp
    readonly followedUnit: RegExp
    readonly numberCombinedWithUnit: RegExp
    readonly timeUnitRegex: RegExp
    readonly previousPrefixRegex: RegExp
    readonly nextPrefixRegex: RegExp
    readonly connectorAndRegex: RegExp
    readonly relativeTimeUnitRegex: RegExp
    readonly restOfDateTimeRegex: RegExp
    readonly generalEndingRegex: RegExp
    readonly middlePauseRegex: RegExp
    
    readonly fromRegex: RegExp;
    readonly betweenRegex: RegExp;

    constructor() {
        this.cardinalExtractor = new PortugueseCardinalExtractor();
        this.singleDateExtractor = new BaseDateExtractor(new PortugueseDateExtractorConfiguration());
        this.singleTimeExtractor = new BaseTimeExtractor(new PortugueseTimeExtractorConfiguration());
        this.singleDateTimeExtractor = new BaseDateTimeExtractor(new PortugueseDateTimeExtractorConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
        this.timePeriodExtractor = new BaseTimePeriodExtractor(new PortugueseTimePeriodExtractorConfiguration())
        this.simpleCasesRegexes = [
            RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumFromTo),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumBetweenAnd),
        ]
        this.prepositionRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PrepositionRegex);
        this.tillRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TillRegex);
        this.specificTimeOfDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificTimeOfDayRegex);
        this.timeOfDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeOfDayRegex);
        this.periodTimeOfDayWithDateRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PeriodTimeOfDayWithDateRegex);
        this.followedUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeFollowedUnit);
        this.numberCombinedWithUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeNumberCombinedWithUnit);
        this.timeUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TimeUnitRegex);
        this.previousPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);
        this.nextPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);
        this.connectorAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ConnectorAndRegex);
        this.relativeTimeUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeTimeUnitRegex);
        this.restOfDateTimeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RestOfDateTimeRegex);
        this.generalEndingRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.GeneralEndingRegex);
        this.middlePauseRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MiddlePauseRegex);

        this.fromRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.FromRegex);
        this.betweenRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.BetweenRegex);
    }

    getFromTokenIndex(source: string) {
        let result = { matched: false, index: -1 };
        let fromMatches = RegExpUtility.getMatches(this.fromRegex, source);
        if (fromMatches.length > 0) {
            result.index = fromMatches[0].index;
            result.matched = true;
        }
        return result;
    };

    getBetweenTokenIndex(source: string) {
        let result = { matched: false, index: -1 };
        let betweenMatches = RegExpUtility.getMatches(this.betweenRegex, source);
        if (betweenMatches.length > 0) {
            result.index = betweenMatches[0].index;
            result.matched = true;
        }
        return result;
    };

    hasConnectorToken(source: string): boolean {
        return RegExpUtility.getMatches(this.connectorAndRegex, source).length > 0;
    };
}

export class PortugueseDateTimePeriodParserConfiguration implements IDateTimePeriodParserConfiguration {
    readonly pureNumberFromToRegex: RegExp
    readonly pureNumberBetweenAndRegex: RegExp
    readonly periodTimeOfDayWithDateRegex: RegExp
    readonly specificTimeOfDayRegex: RegExp
    readonly pastRegex: RegExp
    readonly futureRegex: RegExp
    readonly relativeTimeUnitRegex: RegExp
    readonly numbers: ReadonlyMap<string, number>
    readonly unitMap: ReadonlyMap<string, string>
    readonly dateExtractor: IDateTimeExtractor
    readonly timePeriodExtractor: IDateTimeExtractor
    readonly timeExtractor: IDateTimeExtractor
    readonly dateTimeExtractor: IDateTimeExtractor
    readonly durationExtractor: IDateTimeExtractor
    readonly dateParser: BaseDateParser
    readonly timeParser: BaseTimeParser
    readonly dateTimeParser: BaseDateTimeParser
    readonly timePeriodParser: IDateTimeParser
    readonly durationParser: BaseDurationParser
    readonly restOfDateTimeRegex: RegExp

    constructor(config: PortugueseCommonDateTimeParserConfiguration) {
        this.pureNumberFromToRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumFromTo);
        this.pureNumberBetweenAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PureNumBetweenAnd);
        this.periodTimeOfDayWithDateRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PeriodTimeOfDayWithDateRegex);
        this.specificTimeOfDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecificTimeOfDayRegex);
        this.pastRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);
        this.futureRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);
        this.relativeTimeUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeTimeUnitRegex);
        this.numbers = config.numbers;
        this.unitMap = config.unitMap;
        this.dateExtractor = config.dateExtractor;
        this.timePeriodExtractor = config.timePeriodExtractor;
        this.timeExtractor = config.timeExtractor;
        this.dateTimeExtractor = config.dateTimeExtractor;
        this.durationExtractor = config.durationExtractor;
        this.dateParser = config.dateParser;
        this.timeParser = config.timeParser;
        this.dateTimeParser = config.dateTimeParser;
        this.timePeriodParser = config.timePeriodParser;
        this.durationParser = config.durationParser;
        this.restOfDateTimeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RestOfDateTimeRegex);
    }

    getMatchedTimeRange(source: string): { timeStr: string, beginHour: number, endHour: number, endMin: number, success: boolean } {
        let trimmedText = PortugueseDateTimePeriodParserConfiguration.normalize(source.trim().toLowerCase());

        let timeStr: string;
        let beginHour = 0;
        let endHour = 0;
        let endMin = 0;
        let success = false;

        if (trimmedText.endsWith("madrugada")) {
            timeStr = 'TDA';
            beginHour = 4;
            endHour = 8;
            success = true;
        } else if (trimmedText.endsWith("madrugada")) {
            timeStr = 'TMO';
            beginHour = 8;
            endHour = 12;
            success = true;
        } else if (trimmedText.includes("passado o meio dia") || trimmedText.includes("depois do meio dia")) {
            timeStr = 'TAF';
            beginHour = 12;
            endHour = 16;
            success = true;
        } else if (trimmedText.includes("tarde")) {
            timeStr = 'TEV';
            beginHour = 16;
            endHour = 20;
            success = true;
        } else if (trimmedText.includes("noite")) {
            timeStr = 'TNI';
            beginHour = 20;
            endHour = 23;
            endMin = 59;
            success = true;
        }
        return { timeStr: timeStr, beginHour: beginHour, endHour: endHour, endMin: endMin, success: success };
    }

    getSwiftPrefix(source: string): number {
        let trimmedText = PortugueseDateTimePeriodParserConfiguration.normalize(source.trim().toLowerCase());

        let swift = 0;
        if (RegExpUtility.getFirstMatchIndex(this.futureRegex, trimmedText).matched){
            swift = 1;
        }
        else if (RegExpUtility.getFirstMatchIndex(this.pastRegex, trimmedText).matched) {
            swift = -1;
        }
        return swift;
    }

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
