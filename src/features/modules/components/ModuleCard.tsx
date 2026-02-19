import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/src/shared/components/ui';
import { useAppTheme } from '@/src/shared/theme';

interface ModuleCardProps {
  id: string;
  title: string;
  metadata: string;
  description: string;
  completed?: boolean;
  onPress: () => void;
}

export function ModuleCard({
  title,
  metadata,
  description,
  completed = false,
  onPress,
}: ModuleCardProps) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border.default,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor: completed
                  ? theme.colors.success.light
                  : theme.colors.primary[100],
                borderRadius: theme.borderRadius.md,
              },
            ]}
          >
            <Ionicons
              name={completed ? 'checkmark' : 'document-text-outline'}
              size={20}
              color={completed ? theme.colors.white : theme.colors.primary[500]}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text variant="body" weight="semibold" color="primary">
            {title}
          </Text>
          <Text variant="caption" color="secondary">
            {metadata}
          </Text>
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={22} color={theme.colors.gray[400]} />
        </TouchableOpacity>
      </View>

      <Text
        variant="bodySmall"
        color="secondary"
        numberOfLines={3}
        style={{ marginTop: theme.spacing.sm }}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  infoButton: {
    padding: 4,
  },
});
