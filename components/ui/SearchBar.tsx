import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../theme/tokens';
import { GradientIcon } from './atoms/GradientIcon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onFilter?: () => void;
  filterCount?: number;
  className?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search events...',
  onClear,
  onFilter,
  filterCount = 0,
  className = '',
}: SearchBarProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {/* Input */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <GradientIcon name="search" size={20} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          style={{
            flex: 1,
            marginLeft: 8,
            color: colors.textPrimary,
            fontSize: 15,
            paddingVertical: 0,
          }}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear ?? (() => onChangeText(''))}>
            <GradientIcon name="close-circle" size={18} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter button */}
      {onFilter && (
        <TouchableOpacity onPress={onFilter} style={{ position: 'relative', width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <GradientIcon name="options" size={24} />
          {filterCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                minWidth: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#0066CC',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 3,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', lineHeight: 12 }}>
                {filterCount > 9 ? '9+' : filterCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
