import { View, Text, TouchableOpacity } from 'react-native';
import type { Poll } from '@sidehusl/types';
import { StatusBadge } from '../ui/StatusBadge';
import { colors, radius } from '../../theme/tokens';

interface PollCardProps {
  poll: Poll;
  selectedOptionId?: string | null;
  onVote?: (optionId: string) => void;
  onPress?: () => void;
  className?: string;
}

export function PollCard({ poll, selectedOptionId, onVote, onPress, className = '' }: PollCardProps) {
  const totalVotes = poll.poll_options.reduce((sum, o) => sum + o.vote_count, 0);
  const isActive = poll.status === 'active';
  const hasVoted = !!selectedOptionId;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: '600', lineHeight: 22, flex: 1, marginRight: 8 }}>
          {poll.question}
        </Text>
        <StatusBadge
          label={isActive ? 'Active' : 'Ended'}
          variant={isActive ? 'success' : 'completed'}
        />
      </View>

      <View style={{ gap: 8 }}>
        {poll.poll_options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.vote_count / totalVotes) * 100) : 0;
          const isSelected = option.id === selectedOptionId;

          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => isActive && !hasVoted && onVote?.(option.id)}
              disabled={!isActive || hasVoted}
              style={{
                borderRadius: radius.sm,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
              }}
            >
              <View style={{ position: 'relative', paddingHorizontal: 12, paddingVertical: 10 }}>
                {/* Progress fill */}
                {hasVoted && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${pct}%`,
                      backgroundColor: isSelected
                        ? 'rgba(0, 102, 204, 0.2)'
                        : 'rgba(255, 255, 255, 0.04)',
                    }}
                  />
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      color: isSelected ? colors.primary : colors.textPrimary,
                      fontSize: 14,
                      fontWeight: isSelected ? '600' : '400',
                      lineHeight: 20,
                    }}
                  >
                    {option.text}
                  </Text>
                  {hasVoted && (
                    <Text style={{ color: colors.textSecondary, fontSize: 13, fontWeight: '600' }}>{pct}%</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={{ color: colors.textTertiary, fontSize: 12, lineHeight: 16, marginTop: 10 }}>
        {totalVotes.toLocaleString()} votes
      </Text>
    </TouchableOpacity>
  );
}
