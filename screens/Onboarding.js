import Raect from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default function Onboarding({ navigation }) {
  const handleClick = () => {
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}><Text style={styles.text}>
        <Text style={styles.heading}>About This App:</Text>{"\n\n"}

        <Text style={styles.bullet}>1. </Text>
        <Text>List all movies for user selection:</Text>{"\n"}
        <Text style={styles.subBullet}>- It calls public API to get the movie list</Text>{"\n\n"}
        <Text style={styles.subBullet}>- When the scroll reaches at the bottom of the list, it calls endpoint again to get more data</Text>{"\n\n"}

        <Text style={styles.bullet}>2. </Text>
        <Text>Tap on a movie to view details:</Text>{"\n"}
        <Text style={styles.subBullet}>- It redirects to Detail screen to show more information</Text>{"\n\n"}

        <Text style={styles.bullet}>3. </Text>
        <Text>Favorite an entity:</Text>{"\n"}
        <Text style={styles.subBullet}>- For example, mark one movie as favorite; toggle favorite status locally saved in AsyncStorage</Text>{"\n\n"}

        <Text style={styles.bullet}>4. </Text>
        <Text>Search for entities within the list:</Text>{"\n\n"}

        <Text style={styles.bullet}>5. </Text>
        <Text>Gracefully handle errors and issues:</Text>{"\n\n"}

        <Text style={styles.bullet}>6. </Text>
        <Text>Simple onboarding screen:</Text>{"\n"}
        <Text style={styles.subBullet}>- Introduce the app and its features to users before interaction</Text>{"\n\n"}
      </Text>
      </View>
      <Button title="Next" onPress={handleClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  bullet: {
    fontWeight: 'bold',
  },
  subBullet: {
    marginLeft: 20,
    fontStyle: 'italic',
  }
})