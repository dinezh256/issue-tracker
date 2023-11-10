'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: Number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return (
    <Flex gap="3" align="center">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={isFirstPage}
        onClick={() => changePage(1)}
        className={isFirstPage ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={isFirstPage}
        onClick={() => changePage(currentPage - 1)}
        className={isFirstPage ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={isLastPage}
        onClick={() => changePage(currentPage + 1)}
        className={isLastPage ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={isLastPage}
        onClick={() => changePage(pageCount)}
        className={isLastPage ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
