/* 
* Code Attribution:
 * - ByteGrad (2024) Try Catch Error Handling With TypeScript [Online]. Available at: https://youtu.be/Q1euMQFI35I?si=atpoDwrnBK0Boekp (Accessed: 3 October 2024).
 *
 * - Varsity College Durban North (2024) [Module Name] Module Manual. Durban: Varsity College.
 *
 * This code has been developed using the concepts and practices discussed in class and from youtube videos.
 */
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TextInput, TouchableHighlight, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './types'
// Define the type for a menu item

export default function MenuScreen() {
  // Define the types for each state variable
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coursetype, setCourse] = useState<string>('');
  const [price, setPrice] = useState<string>(''); // Price can be entered as a string, then converted
  const [errorMessage, setErrorMessage] = useState<string>('');

  const course = ['Salad', 'Main', 'Desert'];

  // Function to handle form submission
  const handleSubmit = () => {
    if (!name || !description || !price) {
      setErrorMessage('All fields are required');
      return;
    }

    // Removed the price validation to allow any string to be entered
    const priceNumber = parseFloat(price);

    const newItem: MenuItem = {
      name,
      description,
      coursetype,
      price: priceNumber, // The price can be any string that can be converted to a number
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setCourse('Salad');
    setPrice('');
    setErrorMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.trackerName}>Yaya Cooks</Text>
        <Text style={styles.menuHeader}> Chef Menu</Text>
        <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
        <Image 
        source={require('./assets/feast.jpg')} // Use the correct path to your image
        style={styles.image} 
      />
      </View>

      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>{item.coursetype}</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listView}
      />

      <View style={styles.userInputView}>
        <Text style={styles.inputLabel}>Add a New Dish</Text>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Picker
          selectedValue={coursetype}
          onValueChange={(itemValue) => setCourse(itemValue)}
          style={styles.input}
        >
          {course.map((coursetype) => (
            <Picker.Item label={coursetype} value={coursetype} key={coursetype} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Display error message if it exists */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <TouchableHighlight onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

// Define styles as a TypeScript object with specific properties
// Define color constants
const colors = {
  blushPink: '#ffcccb', // Blush pink background
  black: '#000000', // Black text
  white: '#ffffff', // White borders
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d3d3d3', // Light grey background
  },
  headingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  trackerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000000', // Black text
  },
  totalItems: {
    fontSize: 16,
    marginVertical: 10,
    color: '#000000', // Black text
  },
  listView: {
    flex: 1,
    marginVertical: 20,
  },
  menuItem: {
    backgroundColor: '#d3d3d3', // Light grey background for menu items
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#e75480', // Darker blush pink border
    borderWidth: 3, // Thicker border
    shadowColor: '#000000', // Black shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  description: {
    fontSize: 16,
    color: '#000000', // Black text
  },
  price: {
    fontSize: 16,
    color: '#27ae60', // Keep the original green price color
    marginTop: 5,
  },
  userInputView: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  input: {
    height: 50,
    borderColor: '#e75480', // Darker blush pink border for input
    borderWidth: 3, // Thicker border for input fields
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff', // White input background
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // White text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 90, // Adjust width based on your requirement
    height: 90, // Adjust height based on your requirement
    resizeMode: 'stretch', // You can choose 'contain', 'stretch', etc.
    borderRadius: 15, // Increased border radius for rounded corners
    marginVertical: 20, // Vertical margin for spacing
  },
});


