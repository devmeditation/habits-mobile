import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <>
      <Text className="text-zinc-400 text-base">
        Você não possuie nem um hábito sendo monitorádo,
        <Text
          className="text-violet-400 text-base underline active:text-violet-500"
          onPress={() => navigate("new")}
        >
          {" "}
          comece cadastrando um.
        </Text>
      </Text>
    </>
  );
}
