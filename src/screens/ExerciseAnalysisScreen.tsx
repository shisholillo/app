import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useCameraDevices } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import { ExerciseAnalyzer } from '../utils/ExerciseAnalyzer';
import { MuscleActivationOverlay } from '../components/MuscleActivationOverlay';

const ExerciseAnalysisScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [exerciseData, setExerciseData] = useState<any>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const onFrame = (frame: any) => {
    const analyzer = new ExerciseAnalyzer();
    const analysis = analyzer.analyzeFrame(frame);
    runOnJS(setExerciseData)(analysis);
  };

  if (!hasPermission || !device) {
    return (
      <View style={styles.container}>
        <Text>Cargando cámara...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={onFrame}
        frameProcessorFps={30}
      />
      
      {exerciseData && (
        <MuscleActivationOverlay
          style={styles.overlay}
          exerciseData={exerciseData}
        />
      )}
      
      <View style={styles.infoPanel}>
        <Text style={styles.infoPanelText}>
          {exerciseData?.exercise || 'Analizando...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  infoPanelText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ExerciseAnalysisScreen;