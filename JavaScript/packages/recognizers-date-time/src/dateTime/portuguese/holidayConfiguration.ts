import { IHolidayExtractorConfiguration, BaseHolidayParserConfiguration } from "../baseHoliday"
import { RegExpUtility } from "@microsoft/recognizers-text";
import { DateUtils } from "../utilities";
import { EnglishDateTime } from "../../resources/englishDateTime";
import { PortugueseDatePeriodParserConfiguration } from "./datePeriodConfiguration";

export class PortugueseHolidayExtractorConfiguration implements IHolidayExtractorConfiguration {
    readonly holidayRegexes: RegExp[]
            
    constructor() {
        this.holidayRegexes = [
                    RegExpUtility.getSafeRegExp(EnglishDateTime.HolidayRegex1, "gis"),
                    RegExpUtility.getSafeRegExp(EnglishDateTime.HolidayRegex2, "gis"),
                    RegExpUtility.getSafeRegExp(EnglishDateTime.HolidayRegex3, "gis")
                ];
            }
}
   
export class PortugueseHolidayParserConfiguration extends BaseHolidayParserConfiguration {
    constructor() {
        super();
        this.holidayRegexList = [
            RegExpUtility.getSafeRegExp(EnglishDateTime.HolidayRegex1, "gis"),
            RegExpUtility.getSafeRegExp(EnglishDateTime.HolidayRegex2, "gis"),
            RegExpUtility.getSafeRegExp(EnglishDateTime.HolidayRegex3, "gis")
        ];
        this.holidayNames = EnglishDateTime.HolidayNames;
        this.holidayFuncDictionary = this.initHolidayFuncs();
    }

    protected initHolidayFuncs(): ReadonlyMap<string, (year: number) => Date> {
        return new Map<string, (year: number) => Date>(
            [
                ...super.initHolidayFuncs(),
                [ "pai", PortugueseHolidayParserConfiguration.FathersDay ],
                [ "mae", PortugueseHolidayParserConfiguration.MothersDay ],
                [ "acaodegracas", PortugueseHolidayParserConfiguration.ThanksgivingDay ],
                [ "trabalho", PortugueseHolidayParserConfiguration.LabourDay ],
                [ "pascoa", PortugueseHolidayParserConfiguration.EasterDay ],
                [ "natal", PortugueseHolidayParserConfiguration.ChristmasDay ],
                [ "vesperadenatal", PortugueseHolidayParserConfiguration.ChristmasEve ],
                [ "anonovo", PortugueseHolidayParserConfiguration.NewYear ],
                [ "versperadeanonovo", PortugueseHolidayParserConfiguration.NewYearEve ],
                [ "yuandan", PortugueseHolidayParserConfiguration.NewYear ],
                [ "professor", PortugueseHolidayParserConfiguration.TeacherDay ],
                [ "todosossantos", PortugueseHolidayParserConfiguration.HalloweenDay ],
                [ "crianca", PortugueseHolidayParserConfiguration.ChildrenDay ],
                [ "mulher", PortugueseHolidayParserConfiguration.FemaleDay ],
            ]);
    }

    // All JavaScript dates are zero-based (-1)
    private static NewYear(year: number): Date { return new Date(year, 1 - 1, 1); }
    private static NewYearEve(year: number): Date { return new Date(year, 12 - 1, 31); }
    private static ChristmasDay(year: number): Date { return new Date(year, 12 - 1, 25); }
    private static ChristmasEve(year: number): Date { return new Date(year, 12 - 1, 24); }
    private static FemaleDay(year: number): Date { return new Date(year, 3 - 1, 8); }
    private static ChildrenDay(year: number): Date { return new Date(year, 6 - 1, 1); }
    private static TeacherDay(year: number): Date { return new Date(year, 9 - 1, 10); }
    private static HalloweenDay(year: number): Date { return new Date(year, 10 - 1, 31); }
    private static EasterDay(year: number): Date { return DateUtils.minValue(); }

    public getSwiftYear(text: string): number {
        let trimmedText = text.trim().toLowerCase();
        let swift = -10;
        if (RegExpUtility.isMatch(PortugueseDatePeriodParserConfiguration.nextPrefixRegex, trimmedText)) {
            swift = 1;
        }
        else if (RegExpUtility.isMatch(PortugueseDatePeriodParserConfiguration.previousPrefixRegex, trimmedText)) {
            swift = -1;
        }
        else if (RegExpUtility.isMatch(PortugueseDatePeriodParserConfiguration.thisPrefixRegex, trimmedText)) {
            swift = 0;
        }
        return swift;
    }

    public sanitizeHolidayToken(holiday: string): string {
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