import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Pedometer } from 'expo-sensors'
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {

  const [pedometer, setPedometer] = useState("")
  const [stepCount, setStepCount] = useState(0)


  var Dist = stepCount / 1300
  var DistaceCovered = Dist.toFixed(4)

  var cal = DistaceCovered * 60

  var caloriesBurnt = cal.toFixed(4)

  useEffect(() => {
    subscribe() 
  }, [])

  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps)
    })


    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometer(String(result))
      },
      (error) => {
        setPedometer(error)
      }
    )
  }

  
  
  return (
    <View style={styles.container}>
      <ImageBackground 
        style={{flex: 1}}
        resizeMode='cover'
        source={require('./assets/bg-6.jpeg')}
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headingDesign}>Pedometer is available in this device : { pedometer }</Text>
          
          <View style={{flex: 2}}>
            <CircularProgress 
              value={stepCount}
              maxValue={6500}
              radius={180}
              activeStrokeColor={'#fff'}
              inActiveStrokeColor={'blue'}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={40}
              activeStrokeWidth={40}
              title={"Step Count"}
              titleColor={'#ECF0F1'}
              titleStyle={{ fontWeight: 'bold' }}
            />
          </View>


          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text style={styles.textDesign}>
                Daily Target : 6500 steps(5kms)
              </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDesign}>
                Distance Covered : {DistaceCovered} km 
              </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.textDesign}>Calories Burnt : {caloriesBurnt} </Text>
            </View>

          </View>

        </View>
        
      </ImageBackground>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  headingDesign: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: '',
    textAlign: 'center'
  },

  textDesign: {
    backgroundColor: 'rgba(1, 24, 15, 0.5)',
    height: 50,
    width: '85%',
    borderColor: 'white',
    borderWidth: 1, 
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: '',
    padding: 10
  }
});
