import React, { useState } from 'react';
import {View, Text, TextInput, Button, FlatList, ScrollView, StyleSheet,Image,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker'; // Import Picker

type Dish = {
  name: string;
  description: string;
  course: string;
  price: string;
  image?: string; // Optional field for dish image
};

const Stack = createStackNavigator(); // Create a Stack Navigator

// Sample predefined dishes array
const predefinedDishes: Dish[] = [
  {
    name: 'Maccaroni',
    description: 'Classic Italian pasta with beef ragu.',
    course: 'Main',
    price: '55.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732187947/penne-569072_1280_uk9yfs.jpg',
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp lettuce with Caesar dressing and croutons.',
    course: 'Starter',
    price: '30.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732188074/download_1_ryn6ij.jpg',
  },
  { name: 'Lemon juice',
    description: 'Cold and refreshing lemon juice.',
    course: 'Starter',
    price: '25.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732204113/sparkling-lemonade-mocktail-5_aibdoa.webp',
  },
  { name: 'Sparkling Water',
    description: 'Cold and refreshing water.',
    course: 'Starter',
    price: '15.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732203907/Is-Flavored-Sparkling-Water-Killing-Your-Weight-Loss-Goals_-1_ttfpsy.jpg',
  },
  {
    name: 'Waffle mix',
    description: 'Very Demure,Very Mindful.',
    course: 'Dessert',
    price: '45.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732187840/cld-sample-4.jpg',
  },
  {
    name: 'Seafood Prawns',
    description: 'Spicy and juicy prawns with Oyster.',
    course: 'Main',
    price: '55.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732202125/Step_3_-_Seafood_Boil_a1d45dbd-33dd-464c-a493-d6e436765e6c_setvok.webp',
  },
  {
    name: 'Spicy Noodles',
    description: 'Korean spicy garlic seafood noodles.',
    course: 'Main',
    price: '65.00',
    image: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732202439/Korean_Spicy_Garlic_Seafood_Noodles_11-X3_hroq0e.webp',
  },
];

// Login Screen
const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const credentials = [
    { username: 'John', password: '2020' },
    { username: 'Jane', password: '1234' },
  ];

  const handleLogin = () => {
    const isValid = credentials.some(
      (cred) => cred.username === username && cred.password === password
    );
    if (isValid) {
      navigation.replace('MenuManagement'); 
    } else {
      alert('Incorrect. Try again!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.loginContainer}>
      <Text style={styles.title}>Welcome to Christoffel's Restaurant</Text>
                  <Image
        source={{ uri: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732190039/Chef-icon-illustration-on-transparent-background-PNG_uw783h.png' }} // Static Image URL
        style={styles.Image}
      />
      <Text style={styles.title}>Please Login first</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="darkgray" />
    </ScrollView>
  );
};

// Menu Management Screen
const MenuManagementScreen = ({ navigation }: { navigation: any }) => {
  const [selectedDish, setSelectedDish] = useState<string>(''); // To hold selected dish
  const [dishes, setDishes] = useState<Dish[]>([]);

  const addDish = () => {
    const dish = predefinedDishes.find((dish) => dish.name === selectedDish);
    if (dish) {
      setDishes([...dishes, dish]);
    }
  };

  const removeDish = (dishName: string) => {
    setDishes(dishes.filter((dish) => dish.name !== dishName));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Menu Management</Text>
            <Image
        source={{ uri: 'https://res.cloudinary.com/dodjqutue/image/upload/v1732189097/download_1_fiszdv.jpg' }}
        style={styles.Image}
      />
      

            {/* Log Out Button */}
            <Button
        title="Log Out"
        onPress={() => navigation.replace('Login')} // Log out and navigate back to Login
        color="red"
      />


      <Button
        title="Go to Christoffel's Menu"
        onPress={() => navigation.navigate('ChristoffelsMenu', { dishes })}
        color="darkgray"
      />

      {/* Dropdown to select a dish */}
      <Picker
        selectedValue={selectedDish}
        onValueChange={(itemValue) => setSelectedDish(itemValue)}
      >
        <Picker.Item label="Select a dish" value="" />
        {predefinedDishes.map((dish, index) => (
          <Picker.Item key={index} label={dish.name} value={dish.name} />
        ))}
      </Picker>

      <Button title="Add Dish" onPress={addDish} color="darkgray" />

      {/* List of Dishes with Remove Option */}
      <FlatList
        data={dishes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            {/* Text Content on the Left, stacked vertically */}
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.course}</Text>
              <Text>Price: R{item.price}</Text>
            <Button
              title="Remove Dish"
              onPress={() => removeDish(item.name)}
              color="red"
            />
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

// Christoffel's Menu Screen
const ChristoffelsMenuScreen = ({ route }: { route: any }) => {
  const { dishes } = route.params; // Get dishes from navigation params
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
   // Calculate average price function
   const calculateAveragePrice = () => {
    if (dishes.length === 0) return 0;
        // Sum the prices of all dishes and calculate the average
    const totalPrice = dishes.reduce((acc:number, dish: Dish) => acc + parseFloat(dish.price), 0);
    return totalPrice / dishes.length;
  };
  // Calculate average price
  const averagePrice = calculateAveragePrice();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>

 {/* Display the average price */}
      <Text style={styles.averagePrice}>Average Price: R{averagePrice.toFixed(2)}</Text>
      {/* Filter Section */}

      <View
        style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}
      >
        <Button title="All" onPress={() => setSelectedCourse(null)} />
        <Button title="Starter" onPress={() => setSelectedCourse('Starter')} />
        <Button title="Main" onPress={() => setSelectedCourse('Main')} />
        <Button title="Dessert" onPress={() => setSelectedCourse('Dessert')} />
      </View>

      {/* Filtered Dishes */}
      <FlatList
        data={selectedCourse ? dishes.filter((dish: Dish) => dish.course === selectedCourse) : dishes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            {/* Text Content on the Left, stacked vertically */}
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.course}</Text>
              <Text>Price: R{item.price}</Text>
            </View>

            {/* Image on the Right */}
            <Image source={{ uri: item.image }} style={styles.dishImage} />
          </View>
        )}
      />
    </ScrollView>
  );
};

// App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MenuManagement" component={MenuManagementScreen} />
        <Stack.Screen name="ChristoffelsMenu" component={ChristoffelsMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'orange',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  averagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', // Color for average price
    textAlign: 'center',
  },

  dishItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    
  },
  textContainer: {
    flex: 1, 
    marginRight: 10,
    borderRadius: 46,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 46,
  },
  dishImage: {
    width: 100,
    height: 100, 
    borderRadius: 6, 
    
  },
  loginContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 0,
  },
  Image:{
    width: 350, 
    height: 270, 
    marginLeft: 50,
    borderRadius: 46,
    
  
  },
  input:{
    borderWidth: 1,
    width: 359,
    borderColor: '#ccc', 
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16, 
  },
});

