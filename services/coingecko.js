import axios from "axios";

// to calulcate data
import moment from "moment";

const formatSparkline = (numbers) => {
  //   console.log(numbers);
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formattedSparkline = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
  return formattedSparkline;
};

const formatMarketData = (data) => {
  let formatData = [];

  data.forEach((item) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);
    const formatItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };

    formatData.push(formatItem);
  });

  return formatData;
};

export const getMarketData = async () => {
  try {
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d"
    );
    const data = response.data;
    const formattedResponse = formatMarketData(data);

    return formattedResponse;
  } catch (err) {
    console.log(err.message);
  }
};
