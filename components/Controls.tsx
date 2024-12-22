
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import useKeypress from 'react-use-keypress';

interface ControlsProps {
  onPressDirection: (delta: { x: number, y: number }) => void;
}

export const Controls: React.FC<ControlsProps> = ({ onPressDirection }) => {
  useKeypress(['ArrowLeft', 'ArrowRight', "ArrowUp", "ArrowDown"], (event) => {
    if (event.key === 'ArrowLeft') {
      onPressDirection({ x: -1, y: 0 });
    }
    if (event.key === 'ArrowRight') {
      onPressDirection({ x: 1, y: 0 });
    }
    if (event.key === 'ArrowUp') {
      onPressDirection({ x: 0, y: -1 });
    }
    if (event.key === 'ArrowDown') {
      onPressDirection({ x: 0, y: 1 });
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <DirectionButton direction="up" onPress={() => onPressDirection({ x: 0, y: -1 })} />
      </View>
      <View style={styles.row}>
        <DirectionButton direction="left" onPress={() => onPressDirection({ x: -1, y: 0 })} />
        <View style={{ width: 50 }} />
        <DirectionButton direction="right" onPress={() => onPressDirection({ x: 1, y: 0 })} />
      </View>
      <View style={styles.row}>
        <DirectionButton direction="down" onPress={() => onPressDirection({ x: 0, y: 1 })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
});

interface DirectionButtonProps {
  direction: 'up' | 'down' | 'left' | 'right';
  onPress: () => void;
}

const DirectionButton: React.FC<DirectionButtonProps> = ({ direction, onPress }) => {
  const iconName = {
    up: 'caretup',
    down: 'caretdown',
    left: 'caretleft',
    right: 'caretright',
  }[direction];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.button}>
      <AntDesign name={iconName} size={40} color="black" />
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
