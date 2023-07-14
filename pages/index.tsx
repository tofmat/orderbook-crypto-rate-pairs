import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import instance from "@/data/axios-setup";
import { HeroSection } from "@/sections/hero";
import { OrderBook } from "@/sections/orderBook";
import { OrderBookResponse } from "@/data/model";
import useWebSocket from "react-use-websocket";

export default function Home() {
  // state to store token pairs selected
  const [quoteToken, setQuoteToken] = useState("");
  const [baseToken, setBaseToken] = useState("");

  // loading state when geting prices
  const [loading, setLoading] = useState(false);

  const [orderBook, setOrderBook] = useState<OrderBookResponse | null>(null);

  // use websocket url
  const socketUrl = "wss://api.0x.org/orderbook/v1";

  // use function from useWebSocket
  const { sendJsonMessage } = useWebSocket(socketUrl);

  // subscribe to websocket
  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        type: "subscribe",
        channel: "orders",
        requestId: "123e4567-e89b-12d3-a456-426655440000",
        payload: {
          markerToken: quoteToken,
          takerToken: baseToken,
        },
      }),
    []
  );

  // function to make an axios request to get prices
  const getOrderBook = () => {
    setLoading(true);
    instance
      .get(`/orderbook/v1?quoteToken=${quoteToken}&baseToken=${baseToken}`)
      .then((response) => {
        // Process the response data
        setOrderBook(response.data);
        // subscribe to websocket
        handleClickSendMessage();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  // get feature configuration from browser local storage and update state
  useEffect(() => {
    if (quoteToken && baseToken) {
      getOrderBook();
    }
  }, [quoteToken, baseToken]);

  return (
    <main>
      <Image
        src="/png/spiral.png"
        position={"absolute"}
        left="0"
        top="0"
        zIndex={"-99"}
        alt="spiral"
      />
      <Box
        px={["2", "4", "8", "10"]}
        w="full"
        zIndex={"99"}
        position={"relative"}
      >
        <HeroSection
          baseToken={baseToken}
          setBaseToken={setBaseToken}
          quoteToken={quoteToken}
          setQuoteToken={setQuoteToken}
          setOrderBook={setOrderBook}
        />
        <Image
          src="png/world.png"
          position={"absolute"}
          zIndex={"-99"}
          alt="world"
        />
        <OrderBook
          loading={loading}
          baseToken={baseToken}
          quoteToken={quoteToken}
          orderBook={orderBook}
          setOrderBook={setOrderBook}
        />
      </Box>
    </main>
  );
}
