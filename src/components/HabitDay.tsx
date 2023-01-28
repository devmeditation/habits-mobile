import clsx from "clsx";
import dayjs from "dayjs";
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const WEEK_DAY = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MAGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAY - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayPops extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({
  amount = 0,
  completed = 0,
  date,
  ...rest
}: HabitDayPops) {
  const completedPercentage = amount > 0 ? generateProgressPercentage(amount, completed) : 0;
  const toDay = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(toDay)
  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        "bg-zinc-900 border-zinc-800": completedPercentage === 0,
        " !bg-violet-900 border-violet-800":
          completedPercentage > 0 && completedPercentage < 20,
        " !bg-violet-800 border-violet-700":
          completedPercentage >= 20 && completedPercentage < 40,
        " !bg-violet-700 border-violet-600":
          completedPercentage >= 40 && completedPercentage < 60,
        " !bg-violet-600 border-violet-500":
          completedPercentage >= 60 && completedPercentage < 80,
        " !bg-violet-500 border-violet-400": completedPercentage >= 80,
        "border-white border-2": isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    ></TouchableOpacity>
  );
}
