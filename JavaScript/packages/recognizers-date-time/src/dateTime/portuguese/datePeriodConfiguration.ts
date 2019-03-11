import { IDatePeriodExtractorConfiguration, IDatePeriodParserConfiguration } from "../baseDatePeriod"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { RegExpUtility } from "@microsoft/recognizers-text";
import { BaseNumberParser, BaseNumberExtractor, PortugueseIntegerExtractor, PortugueseNumberParserConfiguration } from "@microsoft/recognizers-text-number"
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { BaseDateTime } from "../../resources/baseDateTime"
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { PortugueseCommonDateTimeParserConfiguration } from "./baseConfiguration"
import { PortugueseDurationExtractorConfiguration } from "./durationConfiguration"
import { PortugueseDateExtractorConfiguration } from "./dateConfiguration"
import { IDateTimeExtractor } from "../baseDateTime";

export class PortugueseDatePeriodExtractorConfiguration implements IDatePeriodExtractorConfiguration {
    readonly simpleCasesRegexes: RegExp[]
    readonly illegalYearRegex: RegExp
    readonly YearRegex: RegExp
    readonly tillRegex: RegExp
    readonly followedUnit: RegExp
    readonly numberCombinedWithUnit: RegExp
    readonly pastRegex: RegExp
    readonly futureRegex: RegExp
    readonly weekOfRegex: RegExp
    readonly monthOfRegex: RegExp
    readonly dateUnitRegex: RegExp
    readonly inConnectorRegex: RegExp
    readonly rangeUnitRegex: RegExp
    readonly datePointExtractor: IDateTimeExtractor
    readonly integerExtractor: BaseNumberExtractor
    readonly numberParser: BaseNumberParser
    readonly durationExtractor: IDateTimeExtractor
    readonly rangeConnectorRegex: RegExp
    readonly connectorAndRegex: RegExp

    constructor() {
        this.simpleCasesRegexes = [
            RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleCasesRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.BetweenRegex),
            // This Regex fails to parse on (?<=\\b(de|do|da|o|a)\\s+)?(pr[oó]xim[oa](s)?|[uú]ltim[oa]s?|est(e|a))
            //RegExpUtility.getSafeRegExp(PortugueseDateTime.OneWordPeriodRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthWithYearRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthNumWithYearRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.YearRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekOfMonthRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekOfYearRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthFrontBetweenRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthFrontSimpleCasesRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.QuarterRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.QuarterRegexYearFront),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.AllHalfYearRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.SeasonRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.WhichWeekRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.RestOfDateRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.LaterEarlyPeriodRegex),
            RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekWithWeekDayRangeRegex)
        ];
        this.illegalYearRegex = RegExpUtility.getSafeRegExp(BaseDateTime.IllegalYearRegex);
        this.YearRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.YearRegex);
        this.tillRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.TillRegex);
        this.followedUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.FollowedDateUnit);
        this.numberCombinedWithUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.NumberCombinedWithDateUnit);
        this.pastRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);
        this.futureRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);
        this.weekOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekOfRegex);
        this.monthOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthOfRegex);
        this.dateUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.DateUnitRegex);
        this.inConnectorRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.InConnectorRegex);
        this.rangeUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RangeUnitRegex);
        this.connectorAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ConnectorAndRegex);

        this.datePointExtractor = new BaseDateExtractor(new PortugueseDateExtractorConfiguration());
        this.integerExtractor = new PortugueseIntegerExtractor();
        this.numberParser = new BaseNumberParser(new PortugueseNumberParserConfiguration());
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
    }

    getFromTokenIndex(source: string) {
        let result = { matched: false, index: -1 };
        if (source.endsWith("from")) {
            result.index = source.lastIndexOf("from");
            result.matched = true;
        }
        return result;
    };

    getBetweenTokenIndex(source: string) {
        let result = { matched: false, index: -1 };
        if (source.endsWith("between")) {
            result.index = source.lastIndexOf("between");
            result.matched = true;
        }
        return result;
    };

    hasConnectorToken(source: string): boolean {
        return RegExpUtility.getFirstMatchIndex(this.connectorAndRegex, source).matched;
    };
}

export class PortugueseDatePeriodParserConfiguration implements IDatePeriodParserConfiguration {
    readonly dateExtractor: IDateTimeExtractor
    readonly dateParser: BaseDateParser
    readonly durationExtractor: IDateTimeExtractor
    readonly durationParser: BaseDurationParser
    readonly monthFrontBetweenRegex: RegExp
    readonly betweenRegex: RegExp
    readonly monthFrontSimpleCasesRegex: RegExp
    readonly simpleCasesRegex: RegExp
    readonly oneWordPeriodRegex: RegExp
    readonly monthWithYear: RegExp
    readonly monthNumWithYear: RegExp
    readonly yearRegex: RegExp
    readonly pastRegex: RegExp
    readonly futureRegex: RegExp
    readonly inConnectorRegex: RegExp
    readonly weekOfMonthRegex: RegExp
    readonly weekOfYearRegex: RegExp
    readonly quarterRegex: RegExp
    readonly quarterRegexYearFront: RegExp
    readonly allHalfYearRegex: RegExp
    readonly seasonRegex: RegExp
    readonly weekOfRegex: RegExp
    readonly monthOfRegex: RegExp
    readonly whichWeekRegex: RegExp
    readonly thisPrefixRegex: RegExp
    readonly restOfDateRegex : RegExp
    readonly laterEarlyPeriodRegex: RegExp
    readonly weekWithWeekDayRangeRegex: RegExp
    readonly unspecificEndOfRangeRegex: RegExp
    readonly tokenBeforeDate: string
    readonly dayOfMonth: ReadonlyMap<string, number>
    readonly monthOfYear: ReadonlyMap<string, number>
    readonly cardinalMap: ReadonlyMap<string, number>
    readonly seasonMap: ReadonlyMap<string, string>
    readonly unitMap: ReadonlyMap<string, string>

    public static readonly nextPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);
    public static readonly previousPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);
    public static readonly thisPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ThisPrefixRegex);
    
    constructor(config: PortugueseCommonDateTimeParserConfiguration) {
        this.dateExtractor = config.dateExtractor;
        this.dateParser = config.dateParser;
        this.durationExtractor = config.durationExtractor;
        this.durationParser = config.durationParser;
        this.monthFrontBetweenRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthFrontBetweenRegex);
        this.betweenRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.BetweenRegex);
        this.monthFrontSimpleCasesRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthFrontSimpleCasesRegex);
        this.simpleCasesRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleCasesRegex);
        // OneWordPeriodRegex fails to compile to RegExp. Ignoring for now
        this.oneWordPeriodRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SimpleCasesRegex) //RegExpUtility.getSafeRegExp(PortugueseDateTime.OneWordPeriodRegex);;
        this.monthWithYear = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthWithYearRegex);
        this.monthNumWithYear = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthNumWithYearRegex);
        this.yearRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.YearRegex);
        this.pastRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PreviousPrefixRegex);
        this.futureRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.NextPrefixRegex);
        this.inConnectorRegex = config.utilityConfiguration.inConnectorRegex;
        this.weekOfMonthRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekOfMonthRegex);
        this.weekOfYearRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekOfYearRegex);
        this.quarterRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.QuarterRegex);
        this.quarterRegexYearFront = RegExpUtility.getSafeRegExp(PortugueseDateTime.QuarterRegexYearFront);
        this.allHalfYearRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AllHalfYearRegex);
        this.seasonRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SeasonRegex);
        this.weekOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekOfRegex);
        this.monthOfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MonthOfRegex);
        this.whichWeekRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WhichWeekRegex);
        this.thisPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.ThisPrefixRegex);
        this.restOfDateRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RestOfDateRegex);
        this.laterEarlyPeriodRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.LaterEarlyPeriodRegex);
        this.weekWithWeekDayRangeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.WeekWithWeekDayRangeRegex);
        this.unspecificEndOfRangeRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.UnspecificEndOfRangeRegex);
        this.tokenBeforeDate = PortugueseDateTime.TokenBeforeDate;
        this.dayOfMonth = config.dayOfMonth;
        this.monthOfYear = config.monthOfYear;
        this.cardinalMap = config.cardinalMap;
        this.seasonMap = config.seasonMap;
        this.unitMap = config.unitMap;
    }

    getSwiftDayOrMonth(source: string): number {
        let trimmedSource = source.trim().toLowerCase();
        let swift = 0;
        if (RegExpUtility.getMatches(PortugueseDatePeriodParserConfiguration.nextPrefixRegex, trimmedSource).length > 0) {
            swift = 1;
        } else if (RegExpUtility.getMatches(PortugueseDatePeriodParserConfiguration.previousPrefixRegex, trimmedSource).length > 0) {
            swift = -1;
        }
        return swift;
    }

    getSwiftYear(source: string): number {
        let trimmedSource = source.trim().toLowerCase();
        let swift = -10;
        if (RegExpUtility.getMatches(PortugueseDatePeriodParserConfiguration.nextPrefixRegex, trimmedSource).length > 0) {
            swift = 1;
        } else if (RegExpUtility.getMatches(PortugueseDatePeriodParserConfiguration.previousPrefixRegex, trimmedSource).length > 0) {
            swift = -1;
        } else if (RegExpUtility.getMatches(this.thisPrefixRegex, trimmedSource).length > 0) {
            swift = 0;
        }
        return swift;
    }

    isFuture(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return RegExpUtility.getFirstMatchIndex(this.thisPrefixRegex, trimmedSource).matched ||
            RegExpUtility.getFirstMatchIndex(PortugueseDatePeriodParserConfiguration.nextPrefixRegex, trimmedSource).matched;
    }

    isYearToDate(source: string): boolean {
        let trimmedSource = PortugueseDatePeriodParserConfiguration.normalize(source.trim().toLowerCase());
        return PortugueseDateTime.YearToDateTerms.some(o => trimmedSource === o);
    }

    isMonthToDate(source: string): boolean {
        let trimmedSource = PortugueseDatePeriodParserConfiguration.normalize(source.trim().toLowerCase());
        return PortugueseDateTime.MonthToDateTerms.some(o => trimmedSource === o);
    }

    isWeekOnly(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return PortugueseDateTime.WeekTerms.some(o => trimmedSource.endsWith(o));
    }

    isWeekend(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return PortugueseDateTime.WeekendTerms.some(o => trimmedSource.endsWith(o));
    }

    isMonthOnly(source: string): boolean {
        let trimmedSource = PortugueseDatePeriodParserConfiguration.normalize(source.trim().toLowerCase());
        return PortugueseDateTime.MonthTerms.some(o => trimmedSource.endsWith(o));
    }

    isYearOnly(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return PortugueseDateTime.YearTerms.some(o => trimmedSource.endsWith(o));
    }

    isLastCardinal(source: string): boolean {
        let trimmedSource = source.trim().toLowerCase();
        return RegExpUtility.getFirstMatchIndex(PortugueseDatePeriodParserConfiguration.previousPrefixRegex, trimmedSource).matched;
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
