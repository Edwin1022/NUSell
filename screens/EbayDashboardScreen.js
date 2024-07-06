// Dashboard.js
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

const EbayDashboardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemName, brand, accessToken } = route.params;
  const [ebayItems, setEbayItems] = useState([]);
  const [noOfProducts, setNoOfProducts] = useState(0);
  const [lowestListedPrice, setLowestListedPrice] = useState(0);
  const [highestListedPrice, setHighestListedPrice] = useState(0);
  const [medianListedPrice, setMedianListedPrice] = useState(0);
  const [noOfPricesInEachPriceRange, setNoOfPricesInEachPriceRange] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text style={styles.headerLeft}>
          Overview on <Text style={{ color: "#E53238" }}>e</Text>
          <Text style={{ color: "#0D64D2" }}>b</Text>
          <Text style={{ color: "#F5AF02" }}>a</Text>
          <Text style={{ color: "#66B817" }}>y</Text>
        </Text>
      ),
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.goBack()}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  const data =
    noOfPricesInEachPriceRange.length > 0
      ? [
          {
            name: "Cheapest",
            population: parseFloat(
              ((noOfPricesInEachPriceRange[0] / noOfProducts) * 100).toFixed(1)
            ),
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Cheaper",
            population: parseFloat(
              ((noOfPricesInEachPriceRange[1] / noOfProducts) * 100).toFixed(1)
            ),
            color: "#E53238",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Average",
            population: parseFloat(
              ((noOfPricesInEachPriceRange[2] / noOfProducts) * 100).toFixed(1)
            ),
            color: "#0D64D2",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Higher",
            population: parseFloat(
              ((noOfPricesInEachPriceRange[3] / noOfProducts) * 100).toFixed(1)
            ),
            color: "#F5AF02",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Highest",
            population: parseFloat(
              ((noOfPricesInEachPriceRange[4] / noOfProducts) * 100).toFixed(1)
            ),
            color: "#66B817",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
        ]
      : [];

  const distributePriceRange = (minPrice, maxPrice, n) => {
    let range = maxPrice - minPrice;
    let interval = range / n;
    let ranges = [];

    for (let i = 0; i < n; i++) {
      let start = minPrice + i * interval;
      let end = start + interval;
      ranges.push({ start: start, end: end });
    }

    // Adjust the last range end to match the maxPrice exactly
    ranges[n - 1].end = maxPrice;

    return ranges;
  };

  const countElementsInRanges = (prices, ranges) => {
    let counts = new Array(ranges.length).fill(0);

    prices.forEach((price) => {
      for (let i = 0; i < ranges.length; i++) {
        if (price >= ranges[i].start && price < ranges[i].end) {
          counts[i]++;
          break;
        }
      }
    });

    // Include the max price in the last range
    let maxPrice = Math.max(...prices);
    if (maxPrice === ranges[ranges.length - 1].end) {
      counts[ranges.length - 1]++;
    }

    return counts;
  };

  const API_BASE_URL = "https://api.ebay.com";

  const searchItems = async (query, aspectFilter) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/buy/browse/v1/item_summary/search`,
        {
          params: {
            q: query,
            aspect_filter: aspectFilter,
            limit: 50,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_SG",
            "X-EBAY-C-ENDUSERCTX":
              "affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>",
          },
        }
      );
      const items = response.data.itemSummaries;

      setLoading(false);

      setEbayItems(items);

      setNoOfProducts(items.length);

      const rawPrices = items
        .map((item) => parseFloat(item.price.value))
        .sort((a, b) => a - b);

      const q1 = (rawPrices[14] + rawPrices[15]) / 2;
      const q3 = (rawPrices[44] + rawPrices[45]) / 2;
      const iqr = q3 - q1;

      const lowOutlier = q1 - 1.5 * iqr;
      const highOulier = q3 + 1.5 * iqr;

      const prices = rawPrices.filter(
        (price) => price >= lowOutlier && price <= highOulier
      );
      
      const lowestPrice = Math.min(...prices);
      setLowestListedPrice(lowestPrice);
      const highestPrice = Math.max(...prices);
      setHighestListedPrice(highestPrice);
      const medianPrice = (prices[29] + prices[30]) / 2;
      setMedianListedPrice(medianPrice);

      const ranges = distributePriceRange(lowestPrice, highestPrice, 5);

      const elementsInEachRange = countElementsInRanges(prices, ranges);
      setNoOfPricesInEachPriceRange(elementsInEachRange);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    searchItems(itemName, {
      aspect_filter: `Brand:${brand}`,
    });
  }, []);

  const idealListingPrice = (medianListedPrice * (1 - 0.05)).toFixed(2);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={{ marginLeft: 5 }}>
          <View style={styles.section}>
            <Text style={styles.subHeader}>Tracking Summary</Text>
            <Text>Item name: {itemName}</Text>
            <Text>Item brand: {brand}</Text>
            <Text>No. of similar item(s) listed: {noOfProducts}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.subHeader}>Price Summary</Text>
            <Text>
              Lowest Listed Price:{" "}
              {lowestListedPrice === Infinity ? "-" : lowestListedPrice}
            </Text>
            <Text>
              Highest Listed Price:{" "}
              {highestListedPrice === -Infinity ? "-" : highestListedPrice}
            </Text>
          </View>

          {noOfProducts <= 0 ? (
            <View style={{ alignItems: "center", marginVertical: 175 }}>
              <Text>You are the first one to list this item</Text>
            </View>
          ) : (
            <View>
              <View style={styles.section}>
                <Text style={styles.subHeader}>Price Position</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate("EbaySimilarProducts", {
                      similarProducts: ebayItems,
                    })
                  }
                >
                  <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    absolute
                  />
                  <Text style={styles.viewSimilarProducts}>
                    {" "}
                    View Similar Products{" "}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={styles.subHeader}>
                  Recommended Listing Price: {idealListingPrice}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  viewSimilarProducts: {
    marginLeft: 40,
    color: "blue",
    textDecorationLine: "underline",
  },
  headerLeft: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
});

export default EbayDashboardScreen;
