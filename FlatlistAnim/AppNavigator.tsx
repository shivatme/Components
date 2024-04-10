import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatlistAnime from './FlatlistAnime';
import Description from './Description';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={FlatlistAnime} />
      <Stack.Screen name="Description" component={Description} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
