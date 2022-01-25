import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View styles={styles.container}>
      <View style={styles.buttonText}>
        <TouchableOpacity
          style={[styles.button, styles.buttonAdd]}
          onPress={() => navigation.navigate("AddItems")}
        >
          <Text style={styles.textButton}>ADD</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ASSETS</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonDell]}
          onPress={() => navigation.navigate("DeleteItems")}
        >
          <Text style={styles.textButton} backgroundColor="red">
            DELL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 35,
    color: "black",
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonAdd: {
    backgroundColor: "green",
  },
  buttonDell: {
    backgroundColor: "red",
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
  },
});

export default Header;
