import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TimerDisplay({ phase, countdown, currentRep, remainingReps, isRunning }) {
    if (!isRunning|| phase ==='完了') return null;

    return (
        <View style={styles.display}>
            //<Text style={styles.text}>フェーズ：{phase}</Text>
            <Text style={styles.text}>残り：{countdown} 秒</Text>
            <Text style={styles.text}>現在のラウンド：{currentRep} 回目</Text>
            <Text style={styles.text}>残り：{remainingReps} 回</Text>
        </View>
    );
}

const sytles = StyleSheet.create({
    display:{
        marginTop: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginVertical: 2,
    },
});
