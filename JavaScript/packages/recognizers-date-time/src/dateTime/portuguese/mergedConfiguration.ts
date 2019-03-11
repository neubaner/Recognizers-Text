import { IMergedExtractorConfiguration, IMergedParserConfiguration } from "../baseMerged"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { BaseTimeExtractor, BaseTimeParser } from "../baseTime";
import { BaseSetExtractor, BaseSetParser } from "../baseSet";
import { BaseHolidayExtractor, BaseHolidayParser } from "../baseHoliday";
import { BaseDatePeriodExtractor, BaseDatePeriodParser } from "../baseDatePeriod";
import { BaseTimePeriodExtractor, BaseTimePeriodParser } from "../baseTimePeriod";
import { IDateTimeExtractor, BaseDateTimeExtractor, BaseDateTimeParser } from "../baseDateTime";
import { BaseDateTimePeriodExtractor, BaseDateTimePeriodParser } from "../baseDateTimePeriod";
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { RegExpUtility } from "@microsoft/recognizers-text";
import { BaseNumberExtractor, PortugueseIntegerExtractor } from "@microsoft/recognizers-text-number";
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { PortugueseCommonDateTimeParserConfiguration } from "./baseConfiguration"
import { PortugueseDurationExtractorConfiguration } from "./durationConfiguration"
import { PortugueseTimeExtractorConfiguration } from "./timeConfiguration"
import { PortugueseDateExtractorConfiguration } from "./dateConfiguration"
import { PortugueseDateTimeExtractorConfiguration } from "./dateTimeConfiguration"
import { PortugueseTimePeriodExtractorConfiguration } from "./timePeriodConfiguration"
import { PortugueseDatePeriodExtractorConfiguration } from "./datePeriodConfiguration"
import { PortugueseDateTimePeriodExtractorConfiguration } from "./dateTimePeriodConfiguration"
import { PortugueseSetExtractorConfiguration, PortugueseSetParserConfiguration } from "./setConfiguration"
import { PortugueseHolidayExtractorConfiguration, PortugueseHolidayParserConfiguration } from "./holidayConfiguration"

export class PortugueseMergedExtractorConfiguration implements IMergedExtractorConfiguration {
    readonly dateExtractor: IDateTimeExtractor
    readonly timeExtractor: IDateTimeExtractor
    readonly dateTimeExtractor: IDateTimeExtractor
    readonly datePeriodExtractor: IDateTimeExtractor
    readonly timePeriodExtractor: IDateTimeExtractor
    readonly dateTimePeriodExtractor: IDateTimeExtractor
    readonly holidayExtractor: IDateTimeExtractor
    readonly durationExtractor: IDateTimeExtractor
    readonly setExtractor: IDateTimeExtractor
    readonly integerExtractor: BaseNumberExtractor
    readonly afterRegex: RegExp
    readonly sinceRegex: RegExp
    readonly beforeRegex: RegExp
    readonly fromToRegex: RegExp
    readonly singleAmbiguousMonthRegex: RegExp
    readonly prepositionSuffixRegex: RegExp
    readonly numberEndingPattern: RegExp
    readonly filterWordRegexList: RegExp[]

    constructor() {
        this.dateExtractor = new BaseDateExtractor(new PortugueseDateExtractorConfiguration());
        this.timeExtractor = new BaseTimeExtractor(new PortugueseTimeExtractorConfiguration());
        this.dateTimeExtractor = new BaseDateTimeExtractor(new PortugueseDateTimeExtractorConfiguration());
        this.datePeriodExtractor = new BaseDatePeriodExtractor(new PortugueseDatePeriodExtractorConfiguration());
        this.timePeriodExtractor = new BaseTimePeriodExtractor(new PortugueseTimePeriodExtractorConfiguration());
        this.dateTimePeriodExtractor = new BaseDateTimePeriodExtractor(new PortugueseDateTimePeriodExtractorConfiguration());
        this.holidayExtractor = new BaseHolidayExtractor(new PortugueseHolidayExtractorConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
        this.setExtractor = new BaseSetExtractor(new PortugueseSetExtractorConfiguration());
        this.integerExtractor = new PortugueseIntegerExtractor();
        this.afterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AfterRegex);
        this.sinceRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SinceRegex);
        this.beforeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.BeforeRegex);
        this.fromToRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.FromToRegex);
        this.singleAmbiguousMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SingleAmbiguousMonthRegex);
        this.prepositionSuffixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PrepositionSuffixRegex);
        this.numberEndingPattern = RegExpUtility.getSafeRegExp(PortugueseDateTime.NumberEndingPattern);
        this.filterWordRegexList = [];
    }
}

export class PortugueseMergedParserConfiguration implements IMergedParserConfiguration {
    readonly beforeRegex: RegExp
    readonly afterRegex: RegExp
    readonly sinceRegex: RegExp
    readonly dateParser: BaseDateParser
    readonly holidayParser: BaseHolidayParser
    readonly timeParser: BaseTimeParser
    readonly dateTimeParser: BaseDateTimeParser
    readonly datePeriodParser: BaseDatePeriodParser
    readonly timePeriodParser: BaseTimePeriodParser
    readonly dateTimePeriodParser: BaseDateTimePeriodParser
    readonly durationParser: BaseDurationParser
    readonly setParser: BaseSetParser

    constructor(config: PortugueseCommonDateTimeParserConfiguration) {
        this.beforeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.BeforeRegex);
        this.afterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AfterRegex);
        this.sinceRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SinceRegex);
        this.holidayParser = new BaseHolidayParser(new PortugueseHolidayParserConfiguration());
        this.dateParser = config.dateParser;
        this.timeParser = config.timeParser;
        this.dateTimeParser = config.dateTimeParser;
        this.datePeriodParser = config.datePeriodParser;
        this.timePeriodParser = config.timePeriodParser;
        this.dateTimePeriodParser = config.dateTimePeriodParser;
        this.durationParser = config.durationParser;
        this.setParser = new BaseSetParser(new PortugueseSetParserConfiguration(config));
    }
}
