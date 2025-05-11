import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function TimerForm({
  setNameText,setSetName, prepTime, setPrepTime,
  workTime, setWorkTime, restTime, setRestTime,
  reps, setReps
}) {
  // バリデーション用エラーメッセージの状態を追加
  const [errors, setErrors] = useState({
    prepTime: '',
    workTime: '',
    restTime: '',
    reps: '',
    setName: ''
  });

  // 各入力項目に対してバリデーション関数
  const validateNumber = (value, field) => {
    if (value.trim() === '') {
      return '入力してください';
    }
    if (isNaN(value)) {
      return '数字を入力してください';
    }
    const num = Number(value);
    if (num <= 0) {
      return '正の数を入力してください';
    }
    if (field === 'reps' && num > 1000) {
      return '回数が多すぎます';
    }
    return '';
  };

  const validateText = (setNameText) => {
    if (typeof value !== 'string')
      return'名前を入力してください';
    if (!value.trim()) {
      return '名前を入力してください';
    }
    return '';
  };

  // useEffectでリアルタイムバリデーション
  useEffect(() => {
    setErrors({
      prepTime: validateNumber(prepTime, 'prepTime'),
      workTime: validateNumber(workTime, 'workTime'),
      restTime: validateNumber(restTime, 'restTime'),
      reps: validateNumber(reps, 'reps'),
      setName: validateText(setNameText)
    });
  }, [prepTime, workTime, restTime, reps, setNameText]);

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="セット名"
        value={setNameText}
        onChangeText={setSetName}
      />
      {errors.setName ? <Text style={styles.error}>{errors.setName}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="準備時間（秒）"
        keyboardType="numeric"
        value={prepTime}
        onChangeText={setPrepTime}
      />
      {errors.prepTime ? <Text style={styles.error}>{errors.prepTime}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="ワーク時間（秒）"
        keyboardType="numeric"
        value={workTime}
        onChangeText={setWorkTime}
      />
      {errors.workTime ? <Text style={styles.error}>{errors.workTime}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="レスト時間（秒）"
        keyboardType="numeric"
        value={restTime}
        onChangeText={setRestTime}
      />
      {errors.restTime ? <Text style={styles.error}>{errors.restTime}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="反復回数"
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />
      {errors.reps ? <Text style={styles.error}>{errors.reps}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    borderColor: '#999',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'left',
    width: '80%',
  },
});
