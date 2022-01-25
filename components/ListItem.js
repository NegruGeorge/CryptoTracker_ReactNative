import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage1D,
  logoSrc,
  onPress,
}) => {
  const priceChangeColor = priceChangePercentage1D > 0 ? "green" : "red";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image style={styles.image} source={{ uri: logoSrc }} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.title}>${currentPrice}</Text>
          <Text style={[styles.subtitle, { color: priceChangeColor }]}>
            {parseFloat(priceChangePercentage1D).toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },
  image: {
    height: 50,
    width: 50,
  },
  rightWrapper: {
    alignItems: "flex-end",
  },
});

export default ListItem;
