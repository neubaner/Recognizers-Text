import { ISetExtractorConfiguration, ISetParserConfiguration } from "../baseSet"
import { BaseDateExtractor, BaseDateParser } from "../baseDate";
import { BaseTimeExtractor, BaseTimeParser } from "../baseTime";
import { BaseDatePeriodExtractor, BaseDatePeriodParser } from "../baseDatePeriod";
import { BaseTimePeriodExtractor, BaseTimePeriodParser } from "../baseTimePeriod";
import { IDateTimeExtractor, BaseDateTimeExtractor, BaseDateTimeParser } from "../baseDateTime";
import { BaseDateTimePeriodExtractor, BaseDateTimePeriodParser } from "../baseDateTimePeriod";
import { BaseDurationExtractor, BaseDurationParser } from "../baseDuration"
import { RegExpUtility } from "@microsoft/recognizers-text";
import { PortugueseDateTime } from "../../resources/PortugueseDateTime";
import { ICommonDateTimeParserConfiguration } from "../parsers"
import { PortugueseDurationExtractorConfiguration } from "./durationConfiguration"
import { PortugueseTimeExtractorConfiguration } from "./timeConfiguration"
import { PortugueseDateExtractorConfiguration } from "./dateConfiguration"
import { PortugueseDateTimeExtractorConfiguration } from "./dateTimeConfiguration"
import { PortugueseTimePeriodExtractorConfiguration } from "./timePeriodConfiguration"
import { PortugueseDatePeriodExtractorConfiguration } from "./datePeriodConfiguration"
import { PortugueseDateTimePeriodExtractorConfiguration } from "./dateTimePeriodConfiguration"

export class PortugueseSetExtractorConfiguration implements ISetExtractorConfiguration {
    readonly lastRegex: RegExp;
    readonly eachPrefixRegex: RegExp;
    readonly periodicRegex: RegExp;
    readonly eachUnitRegex: RegExp;
    readonly eachDayRegex: RegExp;
    readonly beforeEachDayRegex: RegExp;
    readonly setWeekDayRegex: RegExp;
    readonly setEachRegex: RegExp;
    readonly durationExtractor: IDateTimeExtractor;
    readonly timeExtractor: IDateTimeExtractor;
    readonly dateExtractor: IDateTimeExtractor;
    readonly dateTimeExtractor: IDateTimeExtractor;
    readonly datePeriodExtractor: IDateTimeExtractor;
    readonly timePeriodExtractor: IDateTimeExtractor;
    readonly dateTimePeriodExtractor: IDateTimeExtractor;

    constructor() {
        this.durationExtractor = new BaseDurationExtractor(new PortugueseDurationExtractorConfiguration());
        this.timeExtractor = new BaseTimeExtractor(new PortugueseTimeExtractorConfiguration());
        this.dateExtractor = new BaseDateExtractor(new PortugueseDateExtractorConfiguration());
        this.dateTimeExtractor = new BaseDateTimeExtractor(new PortugueseDateTimeExtractorConfiguration());
        this.datePeriodExtractor = new BaseDatePeriodExtractor(new PortugueseDatePeriodExtractorConfiguration());
        this.timePeriodExtractor = new BaseTimePeriodExtractor(new PortugueseTimePeriodExtractorConfiguration());
        this.dateTimePeriodExtractor = new BaseDateTimePeriodExtractor(new PortugueseDateTimePeriodExtractorConfiguration());
        this.lastRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.LastDateRegex)
        this.eachPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.EachPrefixRegex)
        this.periodicRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PeriodicRegex)
        this.eachUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.EachUnitRegex)
        this.eachDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.EachDayRegex)
        this.setWeekDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SetWeekDayRegex)
        this.setEachRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SetEachRegex)
        this.beforeEachDayRegex = null;
    }
}

export class PortugueseSetParserConfiguration implements ISetParserConfiguration {
    readonly durationExtractor: IDateTimeExtractor;
    readonly durationParser: BaseDurationParser;
    readonly timeExtractor: IDateTimeExtractor;
    readonly timeParser: BaseTimeParser;
    readonly dateExtractor: IDateTimeExtractor;
    readonly dateParser: BaseDateParser;
    readonly dateTimeExtractor: IDateTimeExtractor;
    readonly dateTimeParser: BaseDateTimeParser;
    readonly datePeriodExtractor: IDateTimeExtractor;
    readonly datePeriodParser: BaseDatePeriodParser;
    readonly timePeriodExtractor: IDateTimeExtractor;
    readonly timePeriodParser: BaseTimePeriodParser;
    readonly dateTimePeriodExtractor: IDateTimeExtractor;
    readonly dateTimePeriodParser: BaseDateTimePeriodParser;
    readonly unitMap: ReadonlyMap<string, string>;
    readonly eachPrefixRegex: RegExp;
    readonly periodicRegex: RegExp;
    readonly eachUnitRegex: RegExp;
    readonly eachDayRegex: RegExp;
    readonly setWeekDayRegex: RegExp;
    readonly setEachRegex: RegExp;

    constructor(config: ICommonDateTimeParserConfiguration) {
        this.durationExtractor = config.durationExtractor;
        this.timeExtractor = config.timeExtractor;
        this.dateExtractor = config.dateExtractor;
        this.dateTimeExtractor = config.dateTimeExtractor;
        this.datePeriodExtractor = config.datePeriodExtractor;
        this.timePeriodExtractor = config.timePeriodExtractor;
        this.dateTimePeriodExtractor = config.dateTimePeriodExtractor;

        this.durationParser = config.durationParser;
        this.timeParser = config.timeParser;
        this.dateParser = config.dateParser;
        this.dateTimeParser = config.dateTimeParser;
        this.datePeriodParser = config.datePeriodParser;
        this.timePeriodParser = config.timePeriodParser;
        this.dateTimePeriodParser = config.dateTimePeriodParser;
        this.unitMap = config.unitMap;

        this.eachPrefixRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.EachPrefixRegex);
        this.periodicRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.PeriodicRegex);
        this.eachUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.EachUnitRegex);
        this.eachDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.EachDayRegex);
        this.setWeekDayRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SetWeekDayRegex);
        this.setEachRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SetEachRegex);
    }

    public getMatchedDailyTimex(text: string): { matched: boolean, timex: string } {
        let timex = "";
        let trimmedText = PortugueseSetParserConfiguration.normalize(text.trim().toLowerCase());
        if (trimmedText.endsWith("diario") || trimmedText.endsWith("diaria") || trimmedText.endsWith("diariamente")) {
            timex = "P1D";
        }
        else if (trimmedText.endsWith("semanalmente")) {
            timex = "P1W";
        }
        else if (trimmedText.endsWith("quinzenalmente")) {
            timex = "P2W";
        }
        else if (trimmedText.endsWith("mensalmente")) {
            timex = "P1M";
        }
        else if (trimmedText.endsWith("anualmente")) {
            timex = "P1Y";
        }
        else {
            timex = null;
            return { matched: false, timex: timex };
        }
        return { matched: true, timex: timex };
    }

    public getMatchedUnitTimex(text: string): { matched: boolean, timex: string } {
        let timex = "";
        let trimmedText = text.trim().toLowerCase();

        if (trimmedText === "dia" || trimmedText === "dias") {
            timex = "P1D";
        }
        else if (trimmedText === "semana" || trimmedText === "semanas") {
            timex = "P1W";
        }
        else if (trimmedText === "mes" || trimmedText === "meses") {
            timex = "P1M";
        }
        else if (trimmedText === "ano" || trimmedText === "anos") {
            timex = "P1Y";
        }
        else {
            timex = null;
            return { matched: false, timex: timex };
        }

        return { matched: true, timex: timex };
    }

    private static normalize(holiday: string): string {
        return holiday
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
