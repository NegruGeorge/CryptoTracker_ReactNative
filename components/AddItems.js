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
import { useNavigation } from "@react-navigation/native";
import ListItem from "./ListItem";

import { SAMPLE_DATA } from "../data/sampleData";

const currentArray = [];

function AddItems({ data, addAsset }) {
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const navigation = useNavigation();
  const openModal = (item) => {
    setSelectedCoinData(item);
    addAsset(item);
    navigation.goBack();
  };
  //   console.log(SAMPLE_DATA[0].id);
  //   console.log(SAMPLE_DATA[0].image);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.divider}></View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "purple",
    marginHorizontal: 15,
    marginTop: 15,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default AddItems;
