import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import RootNavigator from './src/router/rootNavigator'
import DrawerMenu from './src/router/drawerMenu'


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}




export default App
