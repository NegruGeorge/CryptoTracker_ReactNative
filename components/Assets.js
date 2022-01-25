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

// const Stack = createNativeStackNavigator();

function Assets({ currentAssets, navigation }) {
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);

    bottomSheetModalRef.current.present();
  };
  //   console.log(SAMPLE_DATA[0].id);
  //   console.log(SAMPLE_DATA[0].image);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logoSrc={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage1D={
              selectedCoinData.price_change_percentage_24h
            }
            sparkline={selectedCoinData.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
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
export default Assets;
