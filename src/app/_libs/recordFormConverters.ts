import { RecordType, TimeZone } from "@/generated/prisma/enums";
import { RecordCategoryType, SeverityLevel, TimeZoneType } from "@/app/_type/RecordTypes";

export const toFormRecordType = (type: RecordType): RecordCategoryType => {
  switch (type) {
    case "DAILY":
      return "daily";
    case "MEDICAL":
      return "medical"
    default:
      throw new Error("不正なrecordTypeの値です。");
  }
}

export const toFormSeverityLevel = (level: number | null): SeverityLevel => {
  switch (level) {
    case 1:
      return "mild";
    case 2:
      return "moderate";
    case 3:
      return "severe";
    case 0:
      return "na";
    case null:
      return null;
    default:
      throw new Error("不正なseverityLevelの値です。");
  }
}

export const toFormTimeZone = (tz: TimeZone): TimeZoneType => {
  switch (tz) {
    case "MORNING":
      return "morning";
    case "AFTERNOON":
      return "afternoon";
    case "EVENING":
      return "evening";
    case "NIGHT":
      return "night";
    case "ALL_DAY":
      return "all_day";
    default:
      throw new Error("不正なtimeZoneの値です。");
  }
}