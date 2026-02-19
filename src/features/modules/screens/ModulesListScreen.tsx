import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/src/shared/components/ui';
import { useAppTheme } from '@/src/shared/theme';
import { ModuleCard } from '../components/ModuleCard';
import { SAMPLE_MODULES, Module } from '../types';

export function ModulesListScreen() {
  const theme = useAppTheme();
  const router = useRouter();

  const handleModulePress = (module: Module) => {
    router.push(`/module/${module.id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={[styles.content, { paddingHorizontal: theme.spacing.lg }]}>
        <Text variant="h1" style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.lg }}>
          Modules
        </Text>

        <FlatList
          data={SAMPLE_MODULES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: theme.spacing.md }}>
              <ModuleCard
                id={item.id}
                title={item.title}
                metadata={item.metadata}
                description={item.description}
                completed={item.completed}
                onPress={() => handleModulePress(item)}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
