import { RecordType } from "@/generated/prisma/enums";
import { RecordCategoryType, SeverityLevel } from "@/app/_type/RecordTypes";

// recordTypeの変換
export const convertRecordType = (type: RecordCategoryType): RecordType => {
  switch (type) {
    case "daily":
      return "DAILY";
    case "medical":
      return "MEDICAL";
    default:
      throw new Error("不正なrecordTypeの値です。");
  }
};

// severityLevel（強さ・程度）の変換処理（string→number）
export const convertSeverityLevel = (
  level: SeverityLevel | undefined
): number | null => {
  switch (level) {
    case "mild":
      return 1;
    case "moderate":
      return 2;
    case "severe":
      return 3;
    case "na":
      return 0;
    case null:
      return null;
    case undefined:
      return null;
    default:
      throw new Error("不正なseverityLevelの値です。");
  }
};
