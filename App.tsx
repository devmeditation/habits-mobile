import "./src/lib/dayjs";
import { Button, StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications"
import { useEffect, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
})

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  // const [notificationTime, setNotificationTime] = useState(1020)
  
  async function scheduleNotification() {
    // const trigger = new Date(Date.now())
        
    // if (19 > trigger.getHours()) {
    //   const seconds = (19 - trigger.getHours()) * 60
           
    //  setNotificationTime(seconds);
    // }
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Habits, olá Dev Meditation!',
        body: 'Você praticou seus hábitos hoje?',
      },
      trigger: { seconds: 30 },
    })

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
    } 
  }

  async function getScheduleNotification() {
    const schedules = await Notifications.getAllScheduledNotificationsAsync()
    console.log(schedules);
  }

  useEffect(() => {
    scheduleNotification()
  }, [])

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      {/* <Button title="Enviar Notificação" onPress={scheduleNotification} />
      <Button title="Agendadas" onPress={getScheduleNotification} /> */}
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
