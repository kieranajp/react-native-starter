import React, {
  AsyncStorage,
  Component,
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import Slider from 'react-native-slider';
// import BackgroundImage from './tv_tower.jpg';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    marginTop: 60,
    flex: 1,
    padding: 10,
  },
  welcomeText: {
    color: '#444444',
    textAlign: 'center',
    marginVertical: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
    height: 40,
    width: 150,
    backgroundColor: '#dddddd',
  },
  buttonText: {
    color: '#333333',
  }
});

const os = Platform.OS;

class JournalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0.5,
      saved: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('mood').then(mood => {
      mood = parseFloat(mood);
      this.setState({
        mood: mood,
        saved: mood
      });
    }).done();
  }

  saveData() {
    AsyncStorage.setItem('mood', this.state.mood.toString()).then(() => this.setState({ saved: this.state.mood }));
  }

  render() {
    let Touchable = TouchableHighlight;
    if (os === 'android') {
      Touchable = TouchableNativeFeedback;
    }

    return <View
      style={styles.screen}
    >
      <Text style={styles.welcomeText}>Add a journal entry!</Text>

      <Slider
        value={this.state.mood}
        onValueChange={(mood) => this.setState({mood})} />

      <Text>{this.state.saved}</Text>

      <Touchable
        onPress={this.saveData.bind(this)}
        style={styles.button}
        underlayColor="#abcdef">
        <View>
          <Text style={styles.buttonText}>Button!</Text>
        </View>
      </Touchable>
    </View>;
  }
}

export default JournalScreen;
