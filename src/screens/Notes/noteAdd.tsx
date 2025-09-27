import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import CustomInput from '../../components/ui/customInput';
import CustomButton from '../../components/ui/customButton';
import { Formik } from 'formik';
import { NoteTypes } from '../../utils/constants';
import { NoteSchema } from '../../utils/schemas';
import firestore from '@react-native-firebase/firestore';
import { Collections } from '../../utils/collections';

const NoteAdd: React.FC = ({ navigation, route }) => {
  const address = route.params.address;
  const coordinate = route?.params?.coordinate;
  const addNewNote=  async  (values)=> {
    try {
     await firestore()
  .collection(Collections.NOTES)
  .add(values)
  .then(() => {
    Alert.alert("İşlem Başarılı", "Not başarılı bir şekilde eklendi",[
      {
        text:"Kapat",
        onPress:() => console.log("Cancel Pressed"),
        style:"cancel",
      },
      {text:"Tamam", onPress:() => console.log("OK Pressed") },
    ]);
  })
  .catch(() => {
    Alert.alert("Ekleme işlemi başarısız");
  } );
    } catch (error) {
      Alert.alert("Ekleme işlemi Başarısız");

    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <Formik
      validationSchema={NoteSchema}
        initialValues={{
          address: address,
          coordinate: coordinate,
          title: '',
          description: '',
          type: NoteTypes.discount,
        }}
        onSubmit={values => addNewNote(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values,errors }) => (
          <View>
            <CustomInput
              editable={false}
              multiline
              label="Adres"
              value={values.address}
            />

            <CustomInput
              placeholder="Başlık Ekleyiniz"
              label="Başlık"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={errors.title}
            />

            <CustomInput
              placeholder="Açıklama Ekleyiniz"
              label="Açıklama"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={errors.description}

            />

            <CustomInput
              placeholder="Tip Ekleyiniz"
              label="Tip Ekleyiniz"
              value={values.type}
            />
            <CustomButton onPress={handleSubmit}  title="Kaydet" />
            
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NoteAdd;
