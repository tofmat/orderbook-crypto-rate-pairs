import {
  calculateBidPrice,
  calculateBidTotal,
  calculatePrice,
  calculateTotal,
} from "@/data/helper";
import { Order, OrderBookResponse } from "@/data/model";
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
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Props {
  loading: boolean;
  baseToken: string;
  quoteToken: string;
  orderBook: OrderBookResponse | null;
  setOrderBook: Dispatch<SetStateAction<OrderBookResponse | null>>;
}

export const OrderBook: FC<Props> = ({
  loading,
  quoteToken,
  baseToken,
  orderBook,
  setOrderBook,
}) => {
  const getTokenName = (address: string) => {
    const selectedToken = tokens.find((token) => {
      return token.address === address;
    });
    return selectedToken ? selectedToken : null;
  };

  // a state to keep store the ask and bid orders
  const [askOrders, setAskOrders] = useState<Order[]>([]);
  const [bidOrders, setBidOrders] = useState<Order[]>([]);

  // group to calculate the values from response
  const [group, setGroup] = useState(10000);

  // set orders if response gotten from request
  useEffect(() => {
    if (orderBook) {
      setAskOrders(orderBook.asks.records);
      setBidOrders(orderBook.bids.records);
    }
  }, [orderBook]);

  const socketUrl = "wss://api.0x.org/orderbook/v1";

  // use websocket
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => {
      setAskOrders(event.data.payload);
      console.log(event);
    },
  });

  // update the array of orders whenever a new event occurs from the websocket
  useEffect(() => {
    if (lastMessage !== null) {
      setAskOrders(lastMessage?.data.payload);
    }
  }, [lastMessage, setAskOrders]);

  // get value of websocket
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

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
          {orderBook ? (
            <>
              {" "}
              <div className="flex justify-between items-center py-3">
                <p className="text-base font-semibold">Spread: 6.5 (0.01%)</p>
                <Select
                  placeholder="Select group"
                  bg="white"
                  size="sm"
                  color="gray.700"
                  borderRadius={"8px"}
                  value={group}
                  isRequired
                  w="fit-content"
                  focusBorderColor="none"
                  _placeholder={{ opacity: 1, color: "#667085" }}
                  onChange={(e) => {
                    setGroup(+e.target.value);
                  }}
                >
                  <option value={1000}>Group 0.01</option>
                  <option value={10000}>Group 0.001</option>
                  <option value={5000}>Group 0.05</option>
                  <option value={50000}>Group 0.005</option>
                </Select>
              </div>
              <div className="lg:flex-row flex flex-col gap-4 font-semibold">
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
                      {askOrders.map((order, index) => (
                        <Tr key={index}>
                          <Td color="red.600">
                            {calculatePrice(order, group)}
                          </Td>
                          <Td>{+order.order.makerAmount / group}</Td>
                          <Td color="red.600">
                            {calculateTotal(order, group)}
                          </Td>
                        </Tr>
                      ))}
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
                      {bidOrders.map((order, index) => (
                        <Tr key={index}>
                          <Td color="green.600">
                            {calculateBidPrice(order, group)}
                          </Td>
                          <Td>{+order.order.makerAmount / group}</Td>
                          <Td color="green.600">
                            {calculateBidTotal(order, group)}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </>
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
    </Box>
  );
};
