import { RegExpUtility } from "@microsoft/recognizers-text";
import { PortugueseCardinalExtractor, PortugueseIntegerExtractor, PortugueseOrdinalExtractor, PortugueseNumberParserConfiguration, BaseNumberParser } from "@microsoft/recognizers-text-number";
import { PortugueseDateTime } from "../../resources/portugueseDateTime"
import { BaseDateTime } from "../../resources/baseDateTime"
import { DateTimeFormatUtil, DateTimeResolutionResult, IDateTimeUtilityConfiguration } from "../utilities"
import { BaseDateParserConfiguration } from "../parsers"
import { BaseDateExtractor, BaseDateParser} from "../baseDate"
import { BaseTimeExtractor, BaseTimeParser} from "../baseTime"
import { BaseDatePeriodExtractor, BaseDatePeriodParser} from "../baseDatePeriod"
import { BaseTimePeriodExtractor, BaseTimePeriodParser} from "../baseTimePeriod"
import { BaseDateTimeExtractor, BaseDateTimeParser} from "../baseDateTime"
import { BaseDateTimePeriodExtractor, BaseDateTimePeriodParser} from "../baseDateTimePeriod"
import { BaseDurationExtractor, BaseDurationParser} from "../baseDuration"
import { PortugueseDurationExtractorConfiguration, PortugueseDurationParserConfiguration } from "./durationConfiguration"
import { PortugueseTimeExtractorConfiguration, PortugueseTimeParserConfiguration } from "./timeConfiguration"
import { PortugueseDateExtractorConfiguration, PortugueseDateParserConfiguration } from "./dateConfiguration"
import { PortugueseDateTimeExtractorConfiguration, PortugueseDateTimeParserConfiguration } from "./dateTimeConfiguration"
import { PortugueseTimePeriodExtractorConfiguration, PortugueseTimePeriodParserConfiguration } from "./timePeriodConfiguration"
import { PortugueseDatePeriodExtractorConfiguration, PortugueseDatePeriodParserConfiguration } from "./datePeriodConfiguration"
import { PortugueseDateTimePeriodExtractorConfiguration, PortugueseDateTimePeriodParserConfiguration } from "./dateTimePeriodConfiguration"

export class PortugueseDateTimeUtilityConfiguration implements IDateTimeUtilityConfiguration {
    readonly agoRegex: RegExp;
    readonly laterRegex: RegExp;
    readonly inConnectorRegex: RegExp;
    readonly rangeUnitRegex: RegExp;
    readonly amDescRegex: RegExp;
    readonly pmDescRegex: RegExp;
    readonly amPmDescRegex: RegExp;

    constructor() {
        this.laterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.LaterRegex);
        this.agoRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AgoRegex);
        this.inConnectorRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.InConnectorRegex);
        this.rangeUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RangeUnitRegex);
        this.amDescRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AmDescRegex);
        this.pmDescRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PmDescRegex);
        this.amPmDescRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AmPmDescRegex);
    }
}

export class PortugueseCommonDateTimeParserConfiguration extends BaseDateParserConfiguration {
    constructor() {
        super();
        this.utilityConfiguration = new PortugueseDateTimeUtilityConfiguration();
        this.unitMap = PortugueseDateTime.UnitMap;
        this.unitValueMap = PortugueseDateTime.UnitValueMap;
        this.seasonMap = PortugueseDateTime.SeasonMap;
        this.cardinalMap = PortugueseDateTime.CardinalMap;
        this.dayOfWeek = PortugueseDateTime.DayOfWeek;
        this.monthOfYear = PortugueseDateTime.MonthOfYear;
        this.numbers = PortugueseDateTime.Numbers;
        this.doubleNumbers = PortugueseDateTime.DoubleNumbers;
        this.cardinalExtractor = new PortugueseCardinalExtractor();
        this.integerExtractor = new PortugueseIntegerExtractor();
        this.ordinalExtractor = new PortugueseOrdinalExtractor();
        this.numberParser = new BaseNumberParser(new PortugueseNumberParserConfiguration());
        this.dateExtractor = new BaseDateExtractor(new PortugueseDateExtractorConfiguration());
        this.timeExtractor = new BaseTimeExtractor(new PortugueseTimeExtractorConfiguration());
        this.dateTimeExtractor = new BaseDateTimeExtractor(new PortugueseDateTimeExtractorConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
        this.datePeriodExtractor = new BaseDatePeriodExtractor(new PortugueseDatePeriodExtractorConfiguration());
        this.timePeriodExtractor = new BaseTimePeriodExtractor(new PortugueseTimePeriodExtractorConfiguration());
        this.dateTimePeriodExtractor = new BaseDateTimePeriodExtractor(new PortugueseDateTimePeriodExtractorConfiguration());
        this.durationParser = new BaseDurationParser(new PortugueseDurationParserConfiguration(this));
        this.dateParser = new BaseDateParser(new PortugueseDateParserConfiguration(this));
        this.timeParser = new BaseTimeParser(new PortugueseTimeParserConfiguration(this));
        this.dateTimeParser = new BaseDateTimeParser(new PortugueseDateTimeParserConfiguration(this));
        this.datePeriodParser = new BaseDatePeriodParser(new PortugueseDatePeriodParserConfiguration(this));
        this.timePeriodParser = new BaseTimePeriodParser(new PortugueseTimePeriodParserConfiguration(this));
        this.dateTimePeriodParser = new BaseDateTimePeriodParser(new PortugueseDateTimePeriodParserConfiguration(this));
    }
}