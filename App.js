import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import TimerDisplay from './TimerDisplay';
import TimerForm from './TimerForm';

export default function App() {
  const [prepTime, setPrepTime] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [restTime, setRestTime] = useState('');
  const [reps, setReps] = useState('');
  const [setNameText, setSetName] = useState('');

  const [countdown, setCountdown] = useState(0);
  const [phase, setPhase] = useState('準備前');
  const [currentRep, setCurrentRep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && !isPaused && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isRunning && !isPaused && countdown === 0) {
      handleNextPhase();
    }
    return () => clearTimeout(timer);
  }, [countdown, isRunning, isPaused]);

  const startTimer = () => {
    setCurrentRep(1);
    setPhase('準備');
    setCountdown(Number(prepTime));
    setIsRunning(true);
    setIsPaused(false);
    playSound('start');
  };

  const togglePause = () => {
    setIsPaused(prev => {
      const next = !prev;
      playSound(next ? 'pause' : 'resume');
      return next;
    });
  };

  const handleNextPhase = () => {
    if (phase === '準備') {
      setPhase('ワーク');
      playSound('work');
      setCountdown(Number(workTime));
    } else if (phase === 'ワーク') {
      setPhase('レスト');
      playSound('rest');
      setCountdown(Number(restTime));
    } else if (phase === 'レスト') {
      if (currentRep < Number(reps)) {
        setCurrentRep(currentRep + 1);
        setPhase('ワーク');
        playSound('work');
        setCountdown(Number(workTime));
      } else {
        setPhase('完了');
        setIsRunning(false);
        playSound('complete');
      }
    }
  };

  const remainingReps = Math.max(0, Number(reps) - currentRep);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏃 インターバルタイマー</Text>

      <TimerForm
        setNameText={setNameText}
        setSetName={setSetName}
        prepTime={prepTime}
        setPerpTime={setPrepTime}
        workTime={workTime}
        setWorkTime={setWorkTime}
        restTime={restTime}
        setRestTime={setRestTime}
        reps={reps}
        setReps={setReps}
        />

      <View style={styles.buttonRow}>
        <View style={{ marginHorizontal: 5 }}>
          <Button title="スタート" onPress={startTimer} disabled={isRunning} />
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Button title={isPaused ? '再開' : '一時停止'} onPress={togglePause} disabled={!isRunning} />
        </View>
      </View>

      <TimerDisplay
        phase={phase}
        countdown={countdown}
        currentRep={currentRep}
        remainingReps={remainingReps}
        isRunning={isRunning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#999',
    borderWidth: 1,
  },
  timerText: {
    fontSize: 20,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
});

const playSound = async (type) => {
  try {
    let file;
    switch (type) {
      case 'start':
        file = require('./assets/start.mp3');
        break;
      case 'pause':
        file = require('./assets/pause.mp3');
        break;
      case 'resume':
        file = require('./assets/resume.mp3');
        break;
      case 'rest':
        file = require('./assets/rest.mp3');
        break;
      case 'work':
        file = require('./assets/start.mp3');
        break;
      case 'complete':
        file = require('./assets/achievement.mp3');
        break;
      default:
        return;
    }

    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
  } catch (e) {
    console.error('音の再生に失敗しました:', e);
  }
};
