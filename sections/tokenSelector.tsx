import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { tokens } from "@/data/tokens";
import { ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  Image,
} from "@chakra-ui/react";
import { OrderBookResponse } from "@/data/model";

interface Props {
  baseToken: string;
  setBaseToken: Dispatch<SetStateAction<string>>;
  quoteToken: string;
  setQuoteToken: Dispatch<SetStateAction<string>>;
  setOrderBook: Dispatch<SetStateAction<OrderBookResponse | null>>;
}
export const TokenSelector: FC<Props> = ({
  baseToken,
  setBaseToken,
  quoteToken,
  setQuoteToken,
  setOrderBook,
}) => {
  // get token name from address
  const getTokenName = (address: string) => {
    const selectedToken = tokens.find((token) => {
      return token.address === address;
    });
    return selectedToken ? selectedToken : null;
  };
  return (
    <Box
      borderRadius={"16px"}
      mt="10"
      bgColor={"white"}
      filter={"drop-shadow(0px 12px 16px rgba(58, 67, 61, 0.06))"}
      py="6"
    >
      <p className="text-[#110d22] text-xl font-semibold px-6">
        Choose Token Pairs
      </p>
      <p className="text-[#150f2e] text-base px-6">
        For testing purpose, select WETH against USDC.
      </p>
      <hr className="my-4" />

      <div className="px-6 ">
        <p className="text-gray-700 text-base font-semibold">You Pay</p>
        <div className="flex justify-between mt-2">
          <Menu>
            <MenuButton>
              <Box
                color="#110d22"
                px="3"
                py="2"
                borderRadius={"full"}
                bg="rgba(89,50,243,.08)"
                gap="1"
                className="flex items-center border-1 border-gray-200 text-base font-semibold py-1 "
              >
                {getTokenName(quoteToken) ? (
                  <>
                    {" "}
                    <div className="flex items-center gap-3">
                      <Image
                        src={getTokenName(quoteToken)?.icon}
                        w="20px"
                        h="20px"
                      />
                      <p>{getTokenName(quoteToken)?.name} </p>
                    </div>
                  </>
                ) : (
                  <p>Choose Token</p>
                )}

                <ChevronDownIcon />
              </Box>
            </MenuButton>
            <MenuList fontSize={"16px"} color="#110d22" fontWeight={"600"}>
              {tokens.map((token) => (
                <MenuItem
                  key={token.address}
                  onClick={() => {
                    setQuoteToken(token.address);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image src={token.icon} h="20px" w="20px" />
                    {token.name}
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button
            borderRadius={"full"}
            px="4"
            bg="rgba(89,50,243,.08)"
            color="gray.700"
            isDisabled={!baseToken && !quoteToken}
            onClick={() => {
              setBaseToken("");
              setQuoteToken("");
              setOrderBook(null);
            }}
          >
            Clear
          </Button>
        </div>
        <Input
          my="3"
          color="#110d22"
          fontWeight={"700"}
          placeholder="0.0"
          border={"none"}
          py="4"
          fontSize={"30px"}
          outline={"none"}
          _placeholder={{ opacity: 0.5, color: "#110d22" }}
          focusBorderColor="none"
        />

        <div className="my-2 flex justify-center">
          <Box
            p="3"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bg="#110d22"
            borderRadius={"8px"}
          >
            <RepeatIcon color="white" fontSize={"xl"} />
          </Box>
        </div>
        <p className="text-gray-700 text-base font-semibold">You Receive</p>
        <div className="flex justify-between mt-2">
          <Menu>
            <MenuButton>
              <Box
                color="#110d22"
                px="3"
                py="2"
                borderRadius={"full"}
                bg="rgba(89,50,243,.08)"
                gap="1"
                className="flex items-center border-1 border-gray-200 text-base font-semibold py-1 "
              >
                {getTokenName(baseToken) ? (
                  <>
                    {" "}
                    <div className="flex items-center gap-3">
                      <Image
                        src={getTokenName(baseToken)?.icon}
                        w="20px"
                        h="20px"
                      />
                      <p>{getTokenName(baseToken)?.name} </p>
                    </div>
                  </>
                ) : (
                  <p>Choose Token</p>
                )}
                <ChevronDownIcon />
              </Box>
            </MenuButton>
            <MenuList fontSize={"16px"} color="#110d22" fontWeight={"600"}>
              {tokens.map((token) => (
                <MenuItem
                  key={token.address}
                  onClick={() => {
                    setBaseToken(token.address);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image src={token.icon} h="20px" w="20px" />
                    {token.name}
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <Input
          my="3"
          color="#110d22"
          fontWeight={"700"}
          placeholder="0.0"
          border={"none"}
          py="4"
          fontSize={"30px"}
          outline={"none"}
          _placeholder={{ opacity: 0.5, color: "#110d22" }}
          focusBorderColor="none"
        />
      </div>
    </Box>
  );
};
