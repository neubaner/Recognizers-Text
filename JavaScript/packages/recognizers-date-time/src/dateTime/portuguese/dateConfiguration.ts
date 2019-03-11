import { IDateExtractorConfiguration, IDateParserConfiguration } from "../baseDate"
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { IDateTimeUtilityConfiguration } from "../utilities";
import { RegExpUtility } from "@microsoft/recognizers-text";
import { BaseNumberParser, BaseNumberExtractor, PortugueseOrdinalExtractor, PortugueseIntegerExtractor, PortugueseNumberParserConfiguration } from "@microsoft/recognizers-text-number";
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { PortugueseCommonDateTimeParserConfiguration, PortugueseDateTimeUtilityConfiguration } from "./baseConfiguration"
import { PortugueseDurationExtractorConfiguration } from "./durationConfiguration"
import { IDateTimeParser } from "../parsers"
import { IDateTimeExtractor } from "../baseDateTime";
import { Constants } from "../constants";

export class PortugueseDateExtractorConfiguration implements IDateExtractorConfiguration {
    readonly dateRegexList: RegExp[];
    readonly implicitDateList: RegExp[];
    readonly monthEnd: RegExp;
    readonly ofMonth: RegExp;
    readonly dateUnitRegex: RegExp;
    readonly forTheRegex: RegExp;
    readonly weekDayAndDayOfMonthRegex: RegExp;
    readonly relativeMonthRegex: RegExp;
    readonly weekDayRegex: RegExp;
    readonly dayOfWeek: ReadonlyMap<string, number>;
    readonly ordinalExtractor: BaseNumberExtractor;
    readonly integerExtractor: BaseNumberExtractor;
    readonly numberParser: BaseNumberParser;
    readonly durationExtractor: IDateTimeExtractor;
    readonly utilityConfiguration: IDateTimeUtilityConfiguration;

    constructor() {
        this.dateRegexList = [
            RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor1),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor2),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor3),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor5):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor4),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor8):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor6),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor9):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor7),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor4):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor5),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor6):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor8),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor7):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor9),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor10):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor10),

            PortugueseDateTime.DefaultLanguageFallback === Constants.DefaultLanguageFallback_DMY?
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor11):
                RegExpUtility.getSafeRegExp(PortugueseDateTime.DateExtractor11),
        ];
        this.implicitDateList = [
            RegExpUtility.getSafeRegExp(PortugueseDateTime.OnRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.RelaxedOnRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecialDayRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.ThisRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.LastDateRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.NextDateRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayOfMonthRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecialDateRegex),
        ];
        this.dateUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.DateUnitRegex);
        this.forTheRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ForTheRegex);
        this.weekDayAndDayOfMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayAndDayOfMonthRegex);
        this.relativeMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeMonthRegex);
        this.weekDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayRegex);
        this.dayOfWeek = PortugueseDateTime.DayOfWeek;
        this.ordinalExtractor = new PortugueseOrdinalExtractor();
        this.integerExtractor = new PortugueseIntegerExtractor();
        this.numberParser = new BaseNumberParser(new PortugueseNumberParserConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
        this.utilityConfiguration = new PortugueseDateTimeUtilityConfiguration();
    }
}

export class PortugueseDateParserConfiguration implements IDateParserConfiguration {
    readonly ordinalExtractor: BaseNumberExtractor
    readonly integerExtractor: BaseNumberExtractor
    readonly cardinalExtractor: BaseNumberExtractor
    readonly durationExtractor: IDateTimeExtractor
    readonly numberParser: BaseNumberParser
    readonly durationParser: IDateTimeParser
    readonly monthOfYear: ReadonlyMap<string, number>
    readonly dayOfMonth: ReadonlyMap<string, number>
    readonly dayOfWeek: ReadonlyMap<string, number>
    readonly unitMap: ReadonlyMap<string, string>
    readonly cardinalMap: ReadonlyMap<string, number>
    readonly dateRegex: RegExp[]
    readonly onRegex: RegExp
    readonly specialDayRegex: RegExp
    readonly specialDayWithNumRegex: RegExp
    readonly nextRegex: RegExp
    readonly unitRegex: RegExp
    readonly monthRegex: RegExp
    readonly weekDayRegex: RegExp
    readonly lastRegex: RegExp
    readonly thisRegex: RegExp
    readonly weekDayOfMonthRegex: RegExp
    readonly forTheRegex: RegExp;
    readonly weekDayAndDayOfMonthRegex: RegExp;
    readonly relativeMonthRegex: RegExp;
    readonly relativeWeekDayRegex: RegExp;
    readonly utilityConfiguration: IDateTimeUtilityConfiguration
    readonly dateTokenPrefix: string

    // The following three regexes only used in this configuration
    // They are not used in the base parser, therefore they are not extracted
    // If the spanish date parser need the same regexes, they should be extracted
    static readonly relativeDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeDayRegex);
    static readonly nextPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);
    static readonly previousPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);

    constructor(config: PortugueseCommonDateTimeParserConfiguration) {
        this.ordinalExtractor = config.ordinalExtractor;
        this.integerExtractor = config.integerExtractor;
        this.cardinalExtractor = config.cardinalExtractor;
        this.durationExtractor = config.durationExtractor;
        this.numberParser = config.numberParser;
        this.durationParser = config.durationParser;
        this.monthOfYear = config.monthOfYear;
        this.dayOfMonth = config.dayOfMonth;
        this.dayOfWeek = config.dayOfWeek;
        this.unitMap = config.unitMap;
        this.cardinalMap = config.cardinalMap;
        this.dateRegex = new PortugueseDateExtractorConfiguration().dateRegexList;
        this.onRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.OnRegex);
        this.specialDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecialDayRegex);
        this.specialDayWithNumRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SpecialDayWithNumRegex);
        this.nextRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextDateRegex);
        this.unitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.DateUnitRegex);
        this.monthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthRegex);
        this.weekDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayRegex);
        this.lastRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.LastDateRegex);
        this.thisRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ThisRegex);
        this.weekDayOfMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayOfMonthRegex);
        this.forTheRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ForTheRegex);
        this.weekDayAndDayOfMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekDayAndDayOfMonthRegex);
        this.relativeMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeMonthRegex);
        this.relativeWeekDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeWeekDayRegex);
        this.utilityConfiguration = config.utilityConfiguration;
        this.dateTokenPrefix = PortugueseDateTime.DateTokenPrefix;
    }

    getSwiftDay(source: string): number {
        return this.getSwift(source);
    }

    getSwiftMonth(source: string): number {
        return this.getSwift(source);
    }

    getSwift(source: string): number {
        let trimmedText = source.trim().toLowerCase();
        let swift = 0;
        let nextPrefixMatches = RegExpUtility.getMatches(PortugueseDateParserConfiguration.nextPrefixRegex, trimmedText);
        let pastPrefixMatches = RegExpUtility.getMatches(PortugueseDateParserConfiguration.previousPrefixRegex, trimmedText);
        if (nextPrefixMatches.length) {
            swift = 1;
        } else if (pastPrefixMatches.length) {
            swift = -1;
        }
        return swift;
    }

    isCardinalLast(source: string): boolean {
        let trimmedText = source.trim().toLowerCase();
        return RegExpUtility.getMatches(PortugueseDateParserConfiguration.previousPrefixRegex, trimmedText).length > 0;
    }
}
