import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useState, useEffect } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Chart from "./components/Chart";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { SAMPLE_DATA } from "./data/sampleData";
import AddItems from "./components/AddItems";
import Assets from "./components/Assets";
import DeleteItems from "./components/DeleteItems";

import { getMarketData } from "./services/coingecko";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

const Stack = createNativeStackNavigator();

function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [currentAssets, setCurrentAssets] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
      console.log(db);
      createTable();
      update_assets();
      console.log("ss");
    };
    // we want it to run one time at the render time  ( de aia am pus [])
    fetchMarketData();
  }, []);

  const createTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table CRYPTO" +
            "(id integer primary key not null, name text,symbol text,current_price text, price_change_percentage_7d_in_currency text,image text)"
        );
      },
      (err) => {
        console.log(err.message);
      }
    );

    console.log("db created");
  };

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const update_assets = () => {
    let newArr = [];
    db.transaction((tx) => {
      tx.executeSql("select * from crypto", [], (_, { rows: { _array } }) => {
        _array.forEach((el) => {
          newArr = [...newArr, el];
        });

        console.log(newArr);
        setCurrentAssets(newArr);
      });
    });
  };

  const addAsset = (item) => {
    let ok = 0;
    currentAssets.forEach((el) => {
      console.log(el.name);
      console.log(item.name);
      if (el.name === item.name) {
        // console.log(el);
        console.log("ss");
        ok++;
      }
    });
    if (ok === 0) {
      console.log("fin");
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO CRYPTO (name,symbol,current_price,price_change_percentage_7d_in_currency,image) VALUES 
            ('${item.name}','${item.symbol}','${item.current_price}','${item.price_change_percentage_7d_in_currency}','${item.image}')`
          );
        },
        (error) => {
          console.log(error);
        }
      );

      console.log("fin1");
      update_assets();

      // let newAr = [...currentAssets, item];
      // setCurrentAssets(newAr);
    }
  };

  const dellAssets = (item) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from CRYPTO where name='${item.name}'`);
      },
      (error) => {
        console.log(error);
      }
    );

    update_assets();
    // let newArr = [];
    // currentAssets.forEach((el) => {
    //   if (el.name !== item.name) {
    //     newArr.push(el);
    //   }
    // });
    // setCurrentAssets(newArr);
  };

  const openModal = (item) => {
    setSelectedCoinData(item);

    bottomSheetModalRef.current.present();
  };
  // console.log(SAMPLE_DATA[0].id);
  // console.log(SAMPLE_DATA[0].image);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <Assets currentAssets={currentAssets} />}
        </Stack.Screen>
        <Stack.Screen name="AddItems">
          {(props) => <AddItems addAsset={addAsset} data={data} />}
        </Stack.Screen>
        <Stack.Screen name="DeleteItems">
          {(props) => (
            <DeleteItems
              currentAssets={currentAssets}
              deleteAssets={dellAssets}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
export default App;
