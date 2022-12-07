import React from "react";
import { Blocks } from "react-loader-spinner";

export const FullScreenLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh_-_200px)]">
      <h1 className="text-3xl font-semibold sm:text-5xl">Loading</h1>
      <Blocks
        visible={true}
        height={80}
        width={80}
        ariaLabel="blocks-loading"
      />
    </div>
  );
};
