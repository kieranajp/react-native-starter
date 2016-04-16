import React, {
  Component,
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter,
  Platform
} from 'react-native';

import NativeModules from 'NativeModules';
import { BarChart } from 'react-native-charts'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
      textAlign: 'center'
    }
});

class SensorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 50,
      y: 50,
      z: 50
    }
  }

  componentDidMount() {
    const tickInterval = 0.5;

    this.Accelerometer = NativeModules.Accelerometer;
    if (Platform.OS === 'android') {
      this.Accelerometer = NativeModules.SensorManager;
      this.Accelerometer.startAccelerometer(tickInterval * 1000);
    } else {
      this.Accelerometer.setAccelerometerUpdateInterval(tickInterval);
      this.Accelerometer.startAccelerometerUpdates();
    }

    DeviceEventEmitter.addListener('AccelerationData', this.updateChart.bind(this));
    DeviceEventEmitter.addListener('Accelerometer', this.updateChart.bind(this));
  }

  updateChart(data) {
    console.log(data);
    this.setState({
      x: Math.abs(data.x),
      y: Math.abs(data.y),
      z: Math.abs(data.z)
    });
  }

  render() {
    return <View
      style={styles.container}
    >
      <BarChart
        dataSets={[
          {
            fillColor: '#46b3f7',
            data: [
              { value: this.state.x },
              { value: this.state.y },
              { value: this.state.z }
            ]
          }
        ]}
        valueScaleSpringFriction={0}
        graduation={0}
        horizontal={false}
        showGrid={true}
        barSpacing={5}
        style={{
          height: 300,
          margin: 15,
        }} />

        <Text style={styles.text}>
          X: {this.state.x}{"\n"}
          Y: {this.state.y}{"\n"}
          Z: {this.state.z}
        </Text>
    </View>;
  }
}

export default SensorScreen;
