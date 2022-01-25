import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "./Header";
import ListItem from "./ListItem";
import Chart from "./Chart";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { useNavigation } from "@react-navigation/native";
// const Stack = createNativeStackNavigator();

function DeleteItems({ currentAssets, deleteAssets }) {
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const navigation = useNavigation();
  const openModal = (item) => {
    setSelectedCoinData(item);
    deleteAssets(item);
    navigation.goBack();
  };
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.divider}></View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={currentAssets}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage1D={
                item.price_change_percentage_7d_in_currency
              }
              logoSrc={item.image}
              // we set the item with the data ( in openmModal we have a use state that set the item)
              // so, when we open the chart we have the info about a specific token
              onPress={() => openModal(item)}
            />
          )}
        />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "purple",
    marginHorizontal: 15,
    marginTop: 15,
  },
});
export default DeleteItems;
