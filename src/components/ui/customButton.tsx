import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { RouteType } from '../routes/RouteType'
import { screenHeight } from '../../utils/constants'

type Props = RouteType<'customButton'>

const CustomButton: React.FC<Props> = (props) => {
    const {title } = props
    return (
        <TouchableOpacity {...props} style={styles.container}>
            <Text style={{ fontSize: 24,color:"white", fontWeight:"600" }}> {title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#37d67a",
        margin:10,
        minHeight:screenHeight * 0.07,
        borderRadius:10
    },
})

export default CustomButton
