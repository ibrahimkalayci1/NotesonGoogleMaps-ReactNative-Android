import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { screenHeight } from '../../utils/constants';


const CustomInput: React.FC = props => {
  const { label, error } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} />
{  error  &&   <Text style={styles.error} >{error}</Text>
}    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },

error:{
    fontSize:16,
    fontWeight:"500",
    marginVertical:5,
    color:"#f47373"
},



    input: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 10,
    paddingVertical: screenHeight * 0.02,
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
});

export default CustomInput;
