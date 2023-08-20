import { View, Text } from "react-native";
import { Button, Steps,Result , SwipeAction,List ,Accordion , Modal  } from 'antd-mobile-rn'

export default function App() {
  const Step = Steps.Step

  const right = [
    {
      text: 'More',
      onPress: () => console.log('more'),
      backgroundColor: 'orange',
      color: 'white',
    },
    {
      text: 'Delete',
      onPress: () => console.log('delete'),
      backgroundColor: 'red',
      color: 'white',
    },
  ]
  return (


    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    
      <Button >12 </Button>
     
      <SwipeAction
            right={right}
            onSwipeableOpen={() => console.log('open')}
            onSwipeableClose={() => console.log('close')}>
            <Text>Jennie</Text>
          </SwipeAction>
  
    </View>
  );
}
