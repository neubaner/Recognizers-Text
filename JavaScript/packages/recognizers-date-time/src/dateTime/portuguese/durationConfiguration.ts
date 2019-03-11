import { IDurationExtractorConfiguration, IDurationParserConfiguration } from "../baseDuration"
import { RegExpUtility } from "@microsoft/recognizers-text";
import { BaseNumberExtractor, BaseNumberParser, PortugueseCardinalExtractor } from "@microsoft/recognizers-text-number"
import { PortugueseDateTime } from "../../resources/portugueseDateTime";
import { ICommonDateTimeParserConfiguration } from "../parsers"

export class PortugueseDurationExtractorConfiguration implements IDurationExtractorConfiguration {
    readonly allRegex: RegExp
    readonly halfRegex: RegExp
    readonly followedUnit: RegExp
    readonly numberCombinedWithUnit: RegExp
    readonly anUnitRegex: RegExp
    readonly inexactNumberUnitRegex: RegExp
    readonly suffixAndRegex: RegExp
    readonly relativeDurationUnitRegex: RegExp
    readonly moreThanRegex: RegExp;
    readonly lessThanRegex: RegExp;
    readonly cardinalExtractor: PortugueseCardinalExtractor

    constructor() {
        this.allRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AllRegex);
        this.halfRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.HalfRegex);
        this.followedUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.FollowedUnit);
        this.numberCombinedWithUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.DurationNumberCombinedWithUnit);
        this.anUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AnUnitRegex);
        this.inexactNumberUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.InexactNumberUnitRegex);
        this.suffixAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SuffixAndRegex);
        this.relativeDurationUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.RelativeDurationUnitRegex);
        this.moreThanRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.MoreThanRegex);
        this.lessThanRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.LessThanRegex);
        this.cardinalExtractor = new PortugueseCardinalExtractor();
    }
}

export class PortugueseDurationParserConfiguration implements IDurationParserConfiguration {
    readonly cardinalExtractor: BaseNumberExtractor
    readonly numberParser: BaseNumberParser
    readonly followedUnit: RegExp
    readonly suffixAndRegex: RegExp
    readonly numberCombinedWithUnit: RegExp
    readonly anUnitRegex: RegExp
    readonly allDateUnitRegex: RegExp
    readonly halfDateUnitRegex: RegExp
    readonly inexactNumberUnitRegex: RegExp
    readonly unitMap: ReadonlyMap<string, string>
    readonly unitValueMap: ReadonlyMap<string, number>
    readonly doubleNumbers: ReadonlyMap<string, number>

    constructor(config: ICommonDateTimeParserConfiguration) {
        this.cardinalExtractor = config.cardinalExtractor;
        this.numberParser = config.numberParser;
        this.followedUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.FollowedUnit);
        this.suffixAndRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.SuffixAndRegex);
        this.numberCombinedWithUnit = RegExpUtility.getSafeRegExp(PortugueseDateTime.DurationNumberCombinedWithUnit);
        this.anUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AnUnitRegex);
        this.allDateUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.AllRegex);
        this.halfDateUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.HalfRegex);
        this.inexactNumberUnitRegex = RegExpUtility.getSafeRegExp(PortugueseDateTime.InexactNumberUnitRegex);
        this.unitMap = config.unitMap;
        this.unitValueMap = config.unitValueMap;
        this.doubleNumbers = config.doubleNumbers;
    }
}
