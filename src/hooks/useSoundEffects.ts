import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useEffect, useRef } from 'react';

import { SoundEffect } from '../types/game';

const SOURCES = {
  dig: require('../../assets/sounds/success.mp3'),
  flag: require('../../assets/sounds/success.mp3'),
  win: require('../../assets/sounds/win.mp3'),
  lose: require('../../assets/sounds/bomb.mp3'),
} as const;

export function useSoundEffects(enabled: boolean) {
  const playersRef = useRef<Partial<Record<SoundEffect, AudioPlayer>>>({});

  useEffect(() => {
    const players: Partial<Record<SoundEffect, AudioPlayer>> = {
      dig: createAudioPlayer(SOURCES.dig, { keepAudioSessionActive: true }),
      flag: createAudioPlayer(SOURCES.flag, { keepAudioSessionActive: true }),
      win: createAudioPlayer(SOURCES.win, { keepAudioSessionActive: true }),
      lose: createAudioPlayer(SOURCES.lose, { keepAudioSessionActive: true }),
    };

    players.dig!.volume = 0.35;
    players.flag!.volume = 0.25;
    players.win!.volume = 0.7;
    players.lose!.volume = 0.7;

    playersRef.current = players;

    void setAudioModeAsync({
      allowsRecording: false,
      interruptionMode: 'mixWithOthers',
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      shouldRouteThroughEarpiece: false,
    });

    return () => {
      Object.values(players).forEach((player) => player?.remove());
      playersRef.current = {};
    };
  }, []);

  const play = (effect: SoundEffect) => {
    if (!enabled) {
      return;
    }

    const player = playersRef.current[effect];

    if (!player) {
      return;
    }

    void player
      .seekTo(0)
      .catch(() => undefined)
      .finally(() => player.play());
  };

  return { play };
}
