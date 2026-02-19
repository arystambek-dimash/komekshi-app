import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/src/shared/components/ui';
import { useAppTheme } from '@/src/shared/theme';
import { QuestionItem } from '../components/QuestionItem';
import { AnswerSection } from '../components/AnswerSection';
import { SAMPLE_MODULES } from '../types';

export function ModuleDetailScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const module = SAMPLE_MODULES.find((m) => m.id === id);

  if (!module) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Module not found</Text>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleQuestionPress = (questionId: string) => {
    // Navigate to question detail or expand
    console.log('Question pressed:', questionId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingHorizontal: theme.spacing.lg }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingHorizontal: theme.spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text variant="h1" style={{ marginBottom: theme.spacing.md }}>
          Card Title
        </Text>

        {/* Description */}
        <Text variant="body" color="secondary" style={{ marginBottom: theme.spacing.xl }}>
          {module.description}
        </Text>

        {/* Correct Answer Section */}
        <AnswerSection
          title="Correct Answer"
          content="Copilot is an AI tool designed to improve productivity by integrating with Microsoft applications, offering content generation and task automation features."
        />

        {/* Your Answer Section */}
        <AnswerSection
          title="Your answer"
          content="Copilot is an AI tool designed to improve productivity by integrating with Microsoft applications, offering content generation and task automation features."
        />

        {/* Questions List */}
        <View style={{ marginTop: theme.spacing.lg }}>
          {module.questions.map((question) => (
            <View key={question.id} style={{ marginBottom: theme.spacing.sm }}>
              <QuestionItem
                id={question.id}
                title={question.title}
                completed={question.completed}
                onPress={() => handleQuestionPress(question.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backButton: {
    marginLeft: -8,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
});
