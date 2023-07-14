import { Stack, Box, Text } from "@chakra-ui/react";
import React, { SetStateAction, Dispatch, FC } from "react";
import { TokenSelector } from "./tokenSelector";
import { OrderBookResponse } from "@/data/model";

interface Props {
  baseToken: string;
  setBaseToken: Dispatch<SetStateAction<string>>;
  quoteToken: string;
  setQuoteToken: Dispatch<SetStateAction<string>>;
  setOrderBook: Dispatch<SetStateAction<OrderBookResponse | null>>;
}
export const HeroSection: FC<Props> = ({
  baseToken,
  setBaseToken,
  quoteToken,
  setQuoteToken,
  setOrderBook,
}) => {
  return (
    <Stack px={["4", "6", "6", "10"]}>
      <Stack
        direction={["row"]}
        alignItems="center"
        display={["column", "column", "flex"]}
        py="4"
        gap={["8", "8", "12", "24"]}
      >
        <Box flexBasis={["60%", "60%", "60%", "60%"]}>
          <Stack direction={"row"} alignItems="center">
            <Text
              fontSize={["4xl", "5xl", "80px"]}
              fontWeight="600"
              lineHeight={"normal"}
              pb="4"
            >
              Order Book
            </Text>
          </Stack>
          <p className="font-semibold text-lg">
            This order book is updated in real time with the token pairs
            selected. This app allows you add a selector of the trading token
            pairs, which in turn gets the order book of the selected pair. Also
            websocket is triggered that returns a real time update of the order
            book.
            <br /> <br />
            Please for testing, use only{" "}
            <span className="text-xl font-bold">WETH against USDC.</span> P.S
            (0x Webhook was not functioning at the time of implementation. But
            it has been implemented regardless)
          </p>
        </Box>
        <Box flexBasis={["40%", "40%", "40%", "40%"]} flexShrink="0">
          <TokenSelector
            baseToken={baseToken}
            setBaseToken={setBaseToken}
            quoteToken={quoteToken}
            setQuoteToken={setQuoteToken}
            setOrderBook={setOrderBook}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
