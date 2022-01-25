import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

export const { width: SIZE } = Dimensions.get("window");

const Chart = ({
  currentPrice,
  logoSrc,
  name,
  symbol,
  priceChangePercentage1D,
  sparkline,
}) => {
  // facem niste variabile ca sa ne asiguram ca datele vin la timp...
  //  datele vin async in program si trebuie sa ne asiguram ca le asteptam
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);

  const priceChangeColor = priceChangePercentage1D > 0 ? "green" : "red";

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    // asteptam sa vina datele pentru chart ( asa e libraria)
    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [currentPrice]);

  const formatUSD = (value) => {
    // run on ui thread not js thread
    "worklet";
    if (value === "") {
      return `$${latestCurrentPrice.value}`;
    }
    const formattedValue = `$${parseFloat(value).toFixed(2)}`;
    return formattedValue;
  };

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartWrapper}>
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoSrc }} style={styles.image} />
              <Text style={styles.subtitle}>
                {name} ({symbol.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>

          <View style={styles.lowerTitles}>
            <ChartYLabel format={formatUSD} style={styles.boldTitle} />
            {/* <Text style={styles.boldTitle}>${currentPrice}</Text> */}
            <Text style={[styles.title, { color: priceChangeColor }]}>
              {parseFloat(priceChangePercentage1D).toFixed(2)}%
            </Text>
          </View>
        </View>

        {/* verificam daca chartul a primit datele, daca da atunci afisam chartul, daca nu, nu*/}
        {chartReady ? (
          <View style={styles.chartLineWrapper}>
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
            <ChartDot style={{ backgroundColor: "blue" }} />
          </View>
        ) : null}
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "grey",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 25,
    color: "black",
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 45,
  },
});

export default Chart;
