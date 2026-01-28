import { HapticTab } from '@/components/haptic-tab';
import { Tabs } from 'expo-router';
import React from 'react';


import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000', // 🔥 cor da barra
        },
        tabBarActiveTintColor: '#ffff00',   // ícone ativo
        tabBarInactiveTintColor: '#838301', // ícone inativo
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="criar"
        options={{
          title: 'Lembretes',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
