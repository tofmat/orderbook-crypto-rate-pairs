import { tokens } from "@/data/tokens";
import {
  Box,
  Text,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
} from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Props {
  loading: boolean;
  baseToken: string;
  quoteToken: string;
  orderBook: [];
}
export const OrderBook: FC<Props> = ({
  loading,
  quoteToken,
  baseToken,
  orderBook,
}) => {
  const socketUrl = "wss://echo.websocket.org";

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);
  const messageHistory = useRef<MessageEvent[] | any>([]);
  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastJsonMessage ?? []),
    [lastJsonMessage]
  );
  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "SUBSCRIBE",
        params: ["dogeaud@ticker"],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: ["dogeaud@ticker"],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
  //   onOpen: () => console.log("WebSocket connection opened."),
  //   onClose: () => console.log("WebSocket connection closed."),
  //   shouldReconnect: (closeEvent) => true,
  //   onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  // });

  // const processMessages = (event: { data: string }) => {
  //   const response = JSON.parse(event.data);
  //   console.log(response);
  // };

  // function connect() {
  //   // const unSubscribeMessage = {
  //   //   event: "unsubscribe",
  //   //   feed: "book_ui_1",
  //   //   product_ids: "123e4567-e89b-12d3-a456-426655440000",
  //   // };
  //   // sendJsonMessage(unSubscribeMessage);

  //   const subscribeMessage = {
  //     event: "subscribe",
  //     feed: "orders",
  //     product_ids: "123e4567-e89b-12d3-a456-426655440000",
  //   };
  //   sendJsonMessage(subscribeMessage);
  // }

  // useEffect(() => {
  //   function connect(product: string) {
  //     const unSubscribeMessage = {
  //       event: "unsubscribe",
  //       feed: "book_ui_1",
  //       product_ids: "jk",
  //     };
  //     sendJsonMessage(unSubscribeMessage);

  //     const subscribeMessage = {
  //       event: "subscribe",
  //       feed: "book_ui_1",
  //       product_ids: [product],
  //     };
  //     sendJsonMessage(subscribeMessage);
  //   }

  //   if (isFeedKilled) {
  //     getWebSocket()?.close();
  //   } else {
  //     connect(productId);
  //   }
  // }, [isFeedKilled, productId, sendJsonMessage, getWebSocket]);

  const getTokenName = (address: string) => {
    const selectedToken = tokens.find((token) => {
      return token.address === address;
    });
    return selectedToken ? selectedToken : null;
  };

  return (
    <Box px={["6", "10", "20", "40"]} py={["6", "6", "8"]}>
      <Text
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="extrabold"
        textAlign={"center"}
      >
        Order Book{" "}
        {quoteToken && baseToken && (
          <span>
            for{" "}
            {getTokenName(baseToken) && (
              <span className="uppercase">
                {getTokenName(baseToken)?.name}{" "}
              </span>
            )}
            /{" "}
            {getTokenName(quoteToken) && (
              <span className="uppercase">
                {getTokenName(quoteToken)?.name}{" "}
              </span>
            )}{" "}
          </span>
        )}
      </Text>

      {loading ? (
        <div className="flex justify-center mt-4">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {orderBook.length > 0 ? (
            <></>
          ) : (
            <>
              <Box className="flex mt-12 justify-center items-center">
                <Image src="/svg/empty.svg" />
              </Box>
              <Text
                fontSize={["xl", "3xl", "4xl"]}
                fontWeight="extrabold"
                textAlign={"center"}
              >
                Whoops! No order book. 🥺
              </Text>
              <p className="text-center text-lg py-4">
                Please select a token pair to get the order book!
              </p>
            </>
          )}
        </>
      )}

      <div className="flex justify-between items-center ">
        <p className="text-base font-semibold">Spread: 6.5 (0.01%)</p>
        <Select
          placeholder="Select group"
          bg="white"
          size="sm"
          color="gray.700"
          borderRadius={"8px"}
          isRequired
          w="fit-content"
          focusBorderColor="none"
          _placeholder={{ opacity: 1, color: "#667085" }}
        >
          <option value="">Group 0.5</option>
        </Select>
      </div>
      <div className="flex gap-4">
        <TableContainer
          my={4}
          border="1px solid #F0F1F3"
          borderRadius="8px"
          w="full"
          background={"white"}
          color={"gray.700"}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Price</Th>
                <Th>Size (qty)</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>asds</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer
          my={4}
          border="1px solid #F0F1F3"
          borderRadius="8px"
          w="full"
          background={"white"}
          color={"gray.700"}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Price</Th>
                <Th>Size (qty)</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>asds</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Subscribe
        </button>
        <button
          onClick={handleClickUnSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Unsubscribe
        </button>
        <span>The WebSocket is currently {connectionStatus}</span>
        {lastJsonMessage ? (
          <span>Last message: {JSON.stringify(lastJsonMessage, null, 4)}</span>
        ) : null}
        <ul>
          {messageHistory.current.map((message: any, idx: any) => (
            <span key={idx}>{JSON.stringify(message.data, null, 4)}</span>
          ))}
        </ul>
      </div>
    </Box>
  );
};
